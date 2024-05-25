import { News } from '@/components/models/news';

export async function fetchArticleData(uuid: string) {
    const token = process.env.NEXT_PUBLIC_NEWSAPI_TOKEN || process.env.NEWSAPI_TOKEN;

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

function mapToNewsType(data: any): News {
    return {
        uuid: data.uuid,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        snippet: data.snippet,
        url: data.url,
        image_url: data.image_url,
        language: data.language,
        published_at: new Date(data.published_at),
        source: data.source,
        categories: data.categories,
        relevance_score: data.relevance_score || null,
    };
}
