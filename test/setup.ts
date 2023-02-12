/* eslint-disable import/no-extraneous-dependencies */
import { fetch } from 'cross-fetch'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.development.local') })
global.fetch = fetch
