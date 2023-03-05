import { expect, it } from 'vitest'
import { createChatGPTAPI } from '../src/api'
import fs from 'fs/promises'
import path from 'path'

it('chatgpt: native grammar checker', async () => {
  // disable on github ci workflows
  if (process.env.CI) {
    return
  }
  const article = (await fs.readFile(path.resolve(__dirname, './prompts.txt'))).toString('utf-8')
  const client = await createChatGPTAPI(process.env.OPENAI_API_KEY!, { article })
  const result = await client.sendMessage(article, {
    stream: true,
  })
  fs.writeFile(path.resolve(__dirname, './prompts.snapshot.txt'), result.text)
}, 1000000)
