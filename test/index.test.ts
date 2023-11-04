import fs from 'node:fs/promises'
import path from 'node:path'

import { it } from 'vitest'

import { createChatGPTAPI } from '../src/api'

it('chatgpt: native grammar checker & summarize', async () => {
  // disable on github ci workflows
  if (process.env.CI) {
    return
  }
  const article = (await fs.readFile(path.resolve(__dirname, './prompts.txt'))).toString('utf-8')
  const client = await createChatGPTAPI(process.env.OPENAI_API_KEY!, { article })
  let result = await client.sendMessage(article, {
    stream: true,
  })
  fs.writeFile(path.resolve(__dirname, './prompts.snapshot.txt'), result.text)
  const prompt2 = (await fs.readFile(path.resolve(__dirname, './summarize-prompts.txt'))).toString('utf-8')
  result = await client.sendMessage(prompt2, {
    stream: true,
    parentMessageId: result.id,
  })
  console.log(result.text)
}, 1000000)
