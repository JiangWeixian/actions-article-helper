import { ChatGPTAPI } from 'chatgpt'
import Keyv from 'keyv'

import { DEBUG_KEY } from './constants'
import { fetch } from 'cross-fetch'
import { getTokenCount } from './utils'

export const createChatGPTAPI = async (apiKey: string, options: { article: string }) => {
  // make sure max_tokens >= tokens(options.article), get full response
  const tokens = await getTokenCount(options.article)
  const messageStore = new Keyv()
  return new ChatGPTAPI({
    fetch,
    apiKey,
    debug: process.env.DEBUG?.includes(DEBUG_KEY),
    maxResponseTokens: (tokens ?? 1024) + 100,
    getMessageById: async (id) => {
      console.log('get messageStore', id, messageStore.get(id))
      return messageStore.get(id)
    },
    upsertMessage: async (message) => {
      console.log('save messageStore', message.id, message)
      await messageStore.set(message.id, message)
    },
  })
}
