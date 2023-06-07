import {
    readFileSync, writeFileSync
} from 'node:fs'
import axios from 'axios'
import * as path from 'node:path'
import * as https from 'node:https'
import authCredentials from './constants/auth-credentials'

const { BASE_URL } = process.env

if (!BASE_URL) {
    throw new Error('Environmental variable BASE_URL is not specified')
}

let preservedData = {
    authTokens: {
        editor: '',
        student: '',
        teacher: ''
    }
}

type TLoginRole = keyof typeof preservedData.authTokens

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

try {
    preservedData = JSON.parse(readFileSync(path.resolve(__dirname, './data.json')) as unknown as string)
} catch (e) { /* */ }

function getNewToken(user: TLoginRole) {
    axiosInstance.post(`${BASE_URL}api/auth`, authCredentials.logIn[user])
        .then((resp) => {
            const cookie = resp.headers['set-cookie']
            if (cookie && cookie[0]) {
                const token = cookie[0].split(';')[0].replace('token=', '')
                preservedData.authTokens[user] = token
                writeFileSync(path.resolve(__dirname, './data.json'), JSON.stringify(preservedData))
            } else {
                throw new Error(`There is no token in response: getting token for ${user}`)
            }
        }).catch((e) => {
            throw new Error(
                `Error while getting new token for ${user}\n${e.message}`
            )
        })
}
function checkUserToken(user: TLoginRole) {
    if (preservedData.authTokens[user]) {
        axiosInstance.get(
            `${BASE_URL}api/auth-check`,
            { headers: { cookie: `token=${preservedData.authTokens[user]}` } }
        )
            .then((resp) => {
                if (resp.status !== 200) {
                    getNewToken(user)
                }
            }, () => getNewToken(user))
    } else {
        getNewToken(user)
    }
}

Object.keys(preservedData.authTokens)
    .forEach((key) => checkUserToken(key as TLoginRole))
