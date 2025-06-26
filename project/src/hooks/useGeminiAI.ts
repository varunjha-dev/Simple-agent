import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, ToolCall, ToolResult } from '../types';
import { availableTools, toolDeclarations } from '../utils/tools';

export const useGeminiAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash-exp',
        systemInstruction: {
          parts: [{
            text: `You are an AI assistant with access to powerful tools for financial analysis, calculations, and data retrieval.

Available tools:
- sum: Calculate the sum of two numbers
- primeNumber: Check if a number is prime
- cryptoPrice: Get cryptocurrency market data from CoinGecko
- news: Get latest news articles by category or search query
- dcfValuation: Perform DCF valuation analysis for stocks using Warren Buffett and Peter Lynch strategies
- currencyConversion: Convert between different currencies

Use these tools when appropriate based on user requests. For general questions, provide direct answers. Be helpful, informative, and professional.`
          }]
        },
        tools: [{ functionDeclarations: toolDeclarations }]
      });

      // Build conversation history for Gemini
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      // Start chat with history
      const chat = model.startChat({
        history
      });

      const result = await chat.sendMessage(userInput);
      const response = result.response;

      // Check if there are function calls
      const functionCalls = response.functionCalls();
      
      if (functionCalls && functionCalls.length > 0) {
        // Execute tool calls
        const toolResults: ToolResult[] = [];
        
        for (const call of functionCalls) {
          try {
            const toolFunction = availableTools[call.name as keyof typeof availableTools];
            if (toolFunction) {
              const result = await toolFunction(call.args);
              toolResults.push({
                name: call.name,
                result
              });
            } else {
              toolResults.push({
                name: call.name,
                result: null,
                error: `Tool ${call.name} not found`
              });
            }
          } catch (error) {
            toolResults.push({
              name: call.name,
              result: null,
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }

        // Send function results back to the model
        const functionResponseParts = toolResults.map(result => ({
          functionResponse: {
            name: result.name,
            response: result.error ? { error: result.error } : { result: result.result }
          }
        }));

        const followUpResult = await chat.sendMessage(functionResponseParts);
        const finalResponse = followUpResult.response.text();

        // Add AI response with tool results
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: finalResponse,
          timestamp: new Date(),
          toolCalls: functionCalls.map(call => ({
            name: call.name,
            args: call.args
          })),
          toolResults
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Regular text response
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: response.text(),
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [messages, genAI]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
};