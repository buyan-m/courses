const SERVER_ORIGIN = ''
export type TResponse<T> = {
    data: T | null,
    errors: string[]
}

export default function request<T>(path: string, params?: RequestInit) {
    return fetch(`${SERVER_ORIGIN}${path}`, {
        headers: {
            'Content-type': 'application/json'
        },
        mode: 'cors',
        ...params
    }).then(async (resp):Promise<TResponse<T>> => {
        try {
            const body = await resp.json()
            if (resp.ok) {
                return {
                    data: body,
                    errors: []
                }
            }
            return {
                data: null,
                errors: [body.message]
            }
        } catch (error) {
            const message = (error as Error).toString()
            return {
                data: null,
                errors: [message]
            }
        }
    })
}
