import { categories } from '@/components/models/categories';
import { News, mapToNewsType } from '@/components/models/news';

const LIMIT: number = 3;
const LANG: string = "en";

export async function fetchNewsData(category: string | null) {
    const token = process.env.NEXT_PUBLIC_NEWSAPI_TOKEN || process.env.NEWSAPI_TOKEN;

    if (!token) {
        throw new Error('API token is not defined');
    }
    let url: string = `https://api.thenewsapi.com/v1/news/all?api_token=${token}&language=${LANG}&limit=${LIMIT}`;

    console.log(category);
    if (category && categories.some((c) => c.tag == category)) {
        let apiTag: string | undefined = (categories.find((c) => c.tag == category)?.apiTag);
        if (apiTag) {
            url += (`&categories=${apiTag}`);
            console.log(url);
        }
    }

    let results: News[] = [];
    for (let i = 1; i <= 6; i++) {
        const res = await fetch(url.concat(`&page=${i}`));
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        for (let j = 0; j < data["data"].length; j++) {
            results.push(mapToNewsType(data["data"][j]));
        }
    }



    return results;
}


