import { createChatGPTAPI } from '../src/api'
import fs from 'fs/promises'
import path from 'path'
import './setup'

const main = async () => {
  const client = createChatGPTAPI(process.env.OPENAI_API_KEY!)
  const prompt1 = (await fs.readFile(path.resolve(__dirname, './context.txt'))).toString('utf-8')
  let result = await client.sendMessage(prompt1, {
    stream: true,
    promptPrefix: 'Respond markdown format.<|im_end|>\n',
  })
  const prompt2 = (await fs.readFile(path.resolve(__dirname, './summarize-prompts.txt'))).toString('utf-8')
  console.log(result.parentMessageId, result.conversationId)
  result = await client.sendMessage(prompt2, {
    stream: true,
    promptPrefix: '<|im_end|>\n',
    conversationId: result.conversationId,
    parentMessageId: result.id,
  })
  console.log(result.text)
}

main()
