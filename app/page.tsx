'use client'
import { News, otirikNews } from "@/components/models/news";
import NewsList from "@/components/posts/news_list";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";





export default function Home() {
  const searchParams = useSearchParams();
  const [headlines, setHeadlines] = useState<News[]>([]);
  const [news, setNews] = useState<News[]>(otirikNews);
  const [filteredNews, setFilteredNews] = useState<News[]>(otirikNews);

  useEffect(() => {
    console.log("change!");
    setNews(otirikNews);
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
  return (

    <NewsList news={filteredNews} headlines={headlines} />

  );
}
