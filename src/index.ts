import * as core from '@actions/core'
import * as github from '@actions/github'
import Debug from 'debug'
import matter from 'gray-matter'

import { createChatGPTAPI } from './api'
import { COMMENT_AUTHOR, DEBUG_KEY, prefix, prompts } from './constants'

const debug = Debug(DEBUG_KEY)

export interface Comment {
  id: number
  body?: string
  user: {
    login: string
  } | null
  created_at: string
}

const findComment = (comments: Comment[]) => {
  return comments.find(comment => comment.user?.login && COMMENT_AUTHOR.has(comment.user?.login) && comment.body?.includes(prefix))
}

const withLeadPrefix = (body: string) => {
  return `${prefix}\n${body}`
}

const parseArticle = (body: string) => {
  const meta = matter(body, { delimiters: core.getInput('delimiters') ? JSON.parse(core.getInput('delimiters')) : undefined })
  return {
    ...meta,
    data: meta.data,
  }
}

async function main() {
  try {
    debug('start actions')
    const token = process.env.GITHUB_TOKEN
    const apiKey = process.env.OPENAI_API_KEY
    if (!token || !apiKey) {
      throw new Error('Github token and open api key <https://platform.openai.com/account/api-keys> is required.')
    }
    const octokit = github.getOctokit(token)
    const { owner, repo } = github.context.repo
    const { number } = github.context.issue
    debug('issue context %O', github.context.issue)
    const issue = await octokit.rest.issues.get({
      issue_number: number,
      owner,
      repo,
    })
    if (!issue.data.body) {
      core.info('issue body is empty, skip.')
      return
    }
    const issueBody = parseArticle(issue.data.body!)
    const article = prompts({ content: issueBody.content })
    const chatgptApi = createChatGPTAPI(apiKey)
    const result = await chatgptApi.sendMessage(article, {
      stream: true,
      // response original format
      promptPrefix: 'Respond markdown format.<|im_end|>\n',
    })
    debug('issue body with prompts %s', article)
    // list all <number> comments to find specific comments
    const comments = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: number,
    })
    debug('all comments %o from issue %s', comments.data, number)
    // find comments by bot<github_actioins> start with `<!--article-helper-->`
    const comment = findComment(comments.data)
    debug('find comment %o', comment)
    if (comment) {
      debug('ChatGPT check result is %s', result.text)
      await octokit.rest.issues.updateComment({
        owner,
        repo,
        comment_id: comment?.id,
        body: withLeadPrefix(`${result.text} ${Date.now()}`),
      })
    } else {
      debug('ChatGPT check result is %s', result.text)
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: number,
        body: withLeadPrefix(result.text),
      })
    }
  } catch (error) {
    core.setFailed((error as any).message)
  }
}

main()
