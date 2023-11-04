/* eslint-disable import/no-extraneous-dependencies */
import path from 'node:path'

import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env.development.local') })
