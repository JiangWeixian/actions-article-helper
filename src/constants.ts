import { template } from 'lodash-es'

export const DEBUG_KEY = 'neo:article-helper'
export const COMMENT_AUTHOR = new Set(['github-actions[bot]'])
export const prefix = '<!--article-helper-->'
export const prompts = {
  // refs: https://github.com/f/awesome-chatgpt-prompts#act-as-an-english-translator-and-improver
  check: template('I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My markdown format article is "<%= content %>"'),
  // refs: https://wfhbrian.com/the-best-way-to-summarize-a-paragraph-using-gpt-3/
  summarize: template('Write short introduction with high source compression, removes stop words and summarizes the article whilst retaining meaning. The result is the shortest possible summary that retains all of the original meaning and context of the article.'),
}
export const codeBlockRE = /`{3}[\s\S]*?`{3}/g
