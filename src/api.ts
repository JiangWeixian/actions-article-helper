import { ChatGPTAPI } from 'chatgpt'

export const createChatGPTAPI = (apiKey: string) => {
  return new ChatGPTAPI({
    apiKey,
  })
}
