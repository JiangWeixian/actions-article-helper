import * as core from '@actions/core'
import * as github from '@actions/github'
import Debug from 'debug'
import { template } from 'lodash-es'

const debug = Debug('neo:article-helper')

const COMMENT_AUTHOR = new Set(['github-actions[bot]'])
const prefix = '<!--article-helper-->'
// refs: https://github.com/f/awesome-chatgpt-prompts#act-as-an-english-translator-and-improver
const prompts = template('I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is "<%= content %>"')

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

async function main() {
  try {
    debug('start actions')
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      throw new Error('Github token is required.')
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
    const article = prompts({ content: issue.data.body })
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
      await octokit.rest.issues.updateComment({
        owner,
        repo,
        comment_id: comment?.id,
        body: withLeadPrefix(`Hello world ${Date.now()}`),
      })
    } else {
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: number,
        body: withLeadPrefix('hello world'),
      })
    }

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed((error as any).message)
  }
}

main()
