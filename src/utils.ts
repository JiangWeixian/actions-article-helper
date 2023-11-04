import { get_encoding } from '@dqbd/tiktoken'
import { title } from 'functional-md'

import { codeBlockRE, prefix } from './constants'

const tokenizer = get_encoding('cl100k_base')

function encode(input: string) {
  return tokenizer.encode(input)
}

// refs: https://github.com/transitive-bullshit/chatgpt-api/blob/0ed1ad003568eba776da2dbd78a4edc73f8acad3/src/chatgpt-api.ts#L410
export const getTokenCount = async (text: string) => {
  text = text.replace(/<\|endoftext\|>/g, '')
  return encode(text).length
}

/**
 * @description Preprocess markdown content, e.g.
 * - remove code blocks
 */
export const preprocess = (content: string, { removeCodeblocks = false }: { removeCodeblocks: boolean } = { removeCodeblocks: false }) => {
  let resolvedContent = content
  if (removeCodeblocks) {
    resolvedContent = resolvedContent.replace(codeBlockRE, '```\n```')
  }
  return resolvedContent
}

const withLeadPrefix = (body: string) => {
  return `${prefix}\n${new Date()}\n${body}`
}

export const formatComment = ({ article, summary }: { article: string; summary: string }) => {
  const comment = `
  ${title({ heading: 1, children: 'Summary' })}
  ${summary}
  ${title({ heading: 1, children: 'Article' })}
  ${article}
  `
  return withLeadPrefix(comment)
}
