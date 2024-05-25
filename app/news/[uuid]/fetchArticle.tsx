import { News, mapToNewsType } from '@/components/models/news';

export async function fetchArticleData(uuid: string) {
    const token = process.env.NEXT_PUBLIC_NEWSAPI_TOKEN || process.env.NEWSAPI_TOKEN;
    console.log(process.env, "klfjdlskfjklsdjlkf");
    if (!token) {
        throw new Error('API token is not defined');
    }

    const res = await fetch(`https://api.thenewsapi.com/v1/news/uuid/${uuid}?api_token=${token}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return mapToNewsType(data);
}


