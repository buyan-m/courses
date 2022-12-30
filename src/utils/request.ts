const SERVER_ORIGIN = ''
type TResponse<T> = {
    data: T | null,
    errors: Error[]
}

export default function request<T>(path: string, params?: RequestInit) {
    return fetch(`${SERVER_ORIGIN}${path}`, {
        headers: {
            'Content-type': 'application/json'
        },
        mode: 'cors',
        ...params
    }).then((resp):Promise<TResponse<T>> => {
        if (resp.ok) {
            return resp.json().then((data) => ({
                data,
                errors: []
            }))
            // maybe check errors inside
        }
        return Promise.resolve({
            data: null,
            errors: [new Error('yeap')]
        })
    })
}
