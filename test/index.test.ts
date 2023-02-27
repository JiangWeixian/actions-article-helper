import { expect, it } from 'vitest'
import { createChatGPTAPI } from '../src/api'
import fs from 'fs/promises'
import path from 'path'

it('chatgpt: native grammar checker', async () => {
  // disable on github ci workflows
  if (process.env.CI) {
    return
  }
  const article = (await fs.readFile(path.resolve(__dirname, './context.txt'))).toString('utf-8')
  const client = await createChatGPTAPI(process.env.OPENAI_API_KEY!, { article })
  let result = await client.sendMessage(article, {
    stream: true,
  })
  const prompt2 = (await fs.readFile(path.resolve(__dirname, './summarize-prompts.txt'))).toString('utf-8')
  console.log(result.parentMessageId, result.conversationId)
  result = await client.sendMessage(prompt2, {
    stream: true,
    conversationId: result.conversationId,
    parentMessageId: result.id,
  })
  console.log(result.text)
}, 1000000)
