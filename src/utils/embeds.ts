import request from '@/utils/request'

type TSoundCloudResponse = {
    author_name: string
    author_url: string
    description: string
    height: number
    html: string
    provider_name: string
    thumbnail_url: string
    title: string
    width: string
}

export function createYoutubeURL(id: string) {
    return `https://www.youtube.com/embed/${id}`
}

export function createSoundcloudEmbed(url: string) {
    return request<TSoundCloudResponse>(
        `https://soundcloud.com/oembed?format=json&maxheight=80&url=${decodeURI(url)}`,
        {
            headers: { 'Content-Type': 'text/plain' },
            credentials: 'omit'
        }
    ).then((resp) => resp.data!.html)
}
