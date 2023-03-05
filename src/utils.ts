import { get_encoding } from '@dqbd/tiktoken'
const tokenizer = get_encoding('cl100k_base')

function encode(input: string) {
  return tokenizer.encode(input)
}

// refs: https://github.com/transitive-bullshit/chatgpt-api/blob/0ed1ad003568eba776da2dbd78a4edc73f8acad3/src/chatgpt-api.ts#L410
export const getTokenCount = async (text: string) => {
  text = text.replace(/<\|endoftext\|>/g, '')
  return encode(text).length
}
