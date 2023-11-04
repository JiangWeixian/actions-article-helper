import fs from 'node:fs/promises'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { formatComment, getTokenCount, preprocess } from '../src/utils'

it('tokens count', async () => {
  const content = (await fs.readFile(path.resolve(__dirname, './prompts.txt'))).toString('utf-8')
  const count = await getTokenCount(content)
  expect(typeof count).toBe('number')
})

describe('preprocess', () => {
  it('remove code blocks', async () => {
    const content = (await fs.readFile(path.resolve(__dirname, './prompts.txt'))).toString('utf-8')
    const count = await getTokenCount(content)
    const contentWithOutCodeblocks = preprocess(content, { removeCodeblocks: true })
    const countWithoutCodeblocks = await getTokenCount(contentWithOutCodeblocks)
    expect(contentWithOutCodeblocks).toMatchSnapshot()
    expect(countWithoutCodeblocks).toBeLessThan(count)
  })
})

it('format', async () => {
  const comment = formatComment({ article: 'content', summary: 'content' })
  expect(comment.split('\n').slice(2).join('\n')).toMatchSnapshot()
})
