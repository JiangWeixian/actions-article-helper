import { it } from 'vitest'
import { createChatGPTAPI } from '../src/api'

it('chatgpt', async () => {
  // disable on github ci workflows
  if (process.env.CI) {
    return
  }
  const client = createChatGPTAPI(process.env.OPENAI_API_KEY!)
  const result = await client.sendMessage('ping')
  console.log(result)
})
