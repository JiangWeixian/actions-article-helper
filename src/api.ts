import { ChatGPTAPI } from 'chatgpt'
import { fetch } from 'cross-fetch'
import Keyv from 'keyv'

import { DEBUG_KEY } from './constants'
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
    messageStore,
  })
}
