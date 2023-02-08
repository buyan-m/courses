import {
    readFileSync, writeFileSync
} from 'node:fs'
import axios from 'axios'
import * as path from 'node:path'
import * as https from 'node:https'
import authCredentials from './constants/auth-credentials'

let preservedData = {
    authToken: ''
}

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

try {
    preservedData = JSON.parse(readFileSync(path.resolve(__dirname, './data.json')) as unknown as string)
} catch (e) { /* */ }

function getNewToken() {
    axiosInstance.post('https://localhost:8080/api/auth', authCredentials.logIn)
        .then((resp) => {
            const cookie = resp.headers['set-cookie']
            if (cookie && cookie[0]) {
                const token = cookie[0].split(';')[0].replace('token=', '')
                preservedData.authToken = token
                writeFileSync(path.resolve(__dirname, './data.json'), JSON.stringify(preservedData))
            } else {
                throw new Error('There is no token in response')
            }
        }).catch((e) => {
            throw new Error(
                `Error while getting new token\n${e.message}`
            )
        })
}

if (preservedData.authToken) {
    axiosInstance.get(
        'https://localhost:8080/api/auth-check',
        { headers: { cookie: `token=${preservedData.authToken}` } }
    )
        .then((resp) => {
            if (resp.status !== 200) {
                getNewToken()
            }
        }, getNewToken)
} else {
    getNewToken()
}
