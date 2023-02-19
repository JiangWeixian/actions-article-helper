import { template } from 'lodash-es'

export const DEBUG_KEY = 'neo:article-helper'
export const COMMENT_AUTHOR = new Set(['github-actions[bot]'])
export const prefix = '<!--article-helper-->'
// refs: https://github.com/f/awesome-chatgpt-prompts#act-as-an-english-translator-and-improver
export const prompts = template('I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My markdown format article is "<%= content %>"')