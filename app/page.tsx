'use client'
import { News, otirikNews } from "@/components/models/news";
import NewsList from "@/components/posts/news_list";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchNewsData } from "./fetchNews";
import MasonryLoading from "@/components/loaders/masonry-loading";





export default function Home() {
  const searchParams = useSearchParams();
  const [headlines, setHeadlines] = useState<News[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const data = await fetchNewsData(searchParams.get('category'));
        setNews(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setNews(otirikNews);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [searchParams.get('category')]);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      const filtered = news.filter(item =>
        new RegExp(search, 'i').test(item.title) || new RegExp(search, 'i').test(item.keywords)
      );
      setFilteredNews(filtered);
      setHeadlines([]);
    } else {
      setFilteredNews(news.slice(2, -1));
      setHeadlines(news.slice(0, 2));
    }

  }, [searchParams.get('search'), news]);

  if (loading) return <MasonryLoading />
  if (!news) return <p>Smth went wrong..</p>
  return (

    <NewsList news={filteredNews} headlines={headlines} />

  );
}
