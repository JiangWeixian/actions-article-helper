import { expect, it } from 'vitest'
import { createChatGPTAPI } from '../src/api'
import fs from 'fs/promises'
import path from 'path'

it('chatgpt', async () => {
  // disable on github ci workflows
  if (process.env.CI) {
    return
  }
  const content = (await fs.readFile(path.resolve(__dirname, './prompts.txt'))).toString('utf-8')
  const client = createChatGPTAPI(process.env.OPENAI_API_KEY!)
  const result = await client.sendMessage(content, {
    stream: true,
    promptPrefix: 'Respond markdown format.<|im_end|>\n',
  })
  console.log(result.text)
}, 1000000)
