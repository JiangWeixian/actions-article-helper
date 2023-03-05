import { ChatGPTAPI } from 'chatgpt';
export declare const createChatGPTAPI: (apiKey: string, options: {
    article: string;
}) => Promise<ChatGPTAPI>;
