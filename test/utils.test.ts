import fs from 'fs/promises'
import path from 'path'
import { it } from 'vitest'

import { getTokenCount } from '../src/utils'

it('tokens', async () => {
  const content = (await fs.readFile(path.resolve(__dirname, './prompts.txt'))).toString('utf-8')
  const count = await getTokenCount(content)
  console.log(count)
})
