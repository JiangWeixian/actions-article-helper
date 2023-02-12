import * as core from '@actions/core'
import * as github from '@actions/github'
import Debug from 'debug'
import wait from './wait'

const debug = Debug('neo:article-helper')
const COMMENT_AUTHOR = new Set(['github-actions[bot]'])
const PREFIX = '<!--article-helper-->'

export interface Comment {
  id: number
  body?: string
  user: {
    login: string
  } | null
  created_at: string
}

const findComment = (comments: Comment[]) => {
  return comments.find(comment => comment.user?.login && COMMENT_AUTHOR.has(comment.user?.login) && comment.body?.includes(PREFIX))
}

const withLeadPrefix = (body: string) => {
  return `${PREFIX}\n${body}`
}

async function main() {
  try {
    const ms = core.getInput('milliseconds')
    core.info(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString()) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms))
    core.info(new Date().toTimeString())

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      throw new Error('Github token is required.')
    }
    const octokit = github.getOctokit(token)
    const { owner, repo } = github.context.repo
    const { number } = github.context.issue
    debug('issue context %o', github.context.issue)
    // list all <number> comments to find specific comments
    const comments = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: number,
    })
    console.log(JSON.stringify(comments.data, null, 2))
    // find comments by bot<github_actioins> start with `<!--article-helper-->`
    const comment = findComment(comments.data)
    console.log(JSON.stringify(comment, null, 2))
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
