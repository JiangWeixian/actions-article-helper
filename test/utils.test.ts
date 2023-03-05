import fs from 'fs/promises'
import path from 'path'
import { expect, it } from 'vitest'

import { formatComment, getTokenCount } from '../src/utils'

it('tokens count', async () => {
  const content = (await fs.readFile(path.resolve(__dirname, './prompts.txt'))).toString('utf-8')
  const count = await getTokenCount(content)
  console.log(count)
})

it('format', async () => {
  const comment = formatComment({ article: 'content', summary: 'content' })
  expect(comment.split('\n').slice(2).join('\n')).toMatchSnapshot()
})
