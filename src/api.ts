import { ChatGPTAPI } from 'chatgpt'
import { DEBUG_KEY } from './constants'

export const createChatGPTAPI = (apiKey: string) => {
  return new ChatGPTAPI({
    apiKey,
    debug: process.env.DEBUG?.includes(DEBUG_KEY),
    // tricky part
    maxResponseTokens: 100_000_000,
  })
}
