import { ChatGPTAPI } from 'chatgpt'
import { fetch } from 'cross-fetch'

globalThis.fetch = fetch

export const createChatGPTAPI = (apiKey: string) => {
  return new ChatGPTAPI({
    apiKey,
  })
}
