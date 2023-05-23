import axios from 'axios'

import https from 'node:https'
import * as path from 'node:path'

import { writeFileSync } from 'node:fs'

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

axiosInstance.get('http://localhost:3000/api-schema')
    .then((resp) => {
        if (resp.status === 200) {
            writeFileSync(path.resolve(__dirname, '../src/types/api-types.ts'), resp.data)
        }
    }, (err) => {
        console.log('Can\'t update types\n', err.message)
    })
