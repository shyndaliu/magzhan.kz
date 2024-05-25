import Masonry from "react-masonry-css";
import { News } from "../models/news";
import { NewsCardDefault, NewsCardPhoto, NewsCardPlain } from "./news_card";
import { useEffect, useState } from "react";
import './style.css'
import Link from "next/link";

const breakpoints = {
    default: 3, 1100: 2, 700: 1
}
const PAGE_SIZE: number = 12;

export default function NewsList(props: { news: News[], headlines: News[] }) {
    let news: News[] = props.news;
    const [displayedNews, setDisplayedNews] = useState(news.length >= 12 ? news.slice(0, PAGE_SIZE + 1) : news);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(news.length / PAGE_SIZE));


    useEffect(() => {
        let startIndex = PAGE_SIZE * (page - 1);
        setDisplayedNews(news.slice(startIndex, startIndex + PAGE_SIZE + 1));
        setTotalPages(Math.ceil(news.length / PAGE_SIZE))
    }, [page, news]);

    const handlePagination = (pageNumber: number) => {
        setPage(pageNumber);
    };
    return <>
        {news.length > 0 && <div className="flex flex-col items-center mb-10 justify-between">
            {props.headlines.length > 0 &&
                <div className="flex flex-row mb-10 mx-8 gap-5">

                    <NewsCardPhoto newsItem={props.headlines[0]} />
                    <NewsCardPlain newsItem={props.headlines[1]} />
                </div>}
            <Masonry
                breakpointCols={breakpoints}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {displayedNews.map((item: News, i: number) => (


                    <div key={i}>
                        {(i % 3 + Math.ceil(i / 3)) % 3 == 0 && <NewsCardDefault newsItem={item} />}
                        {(i % 3 + Math.ceil(i / 3)) % 3 == 1 && <NewsCardPhoto newsItem={item} />}
                        {(i % 3 + Math.ceil(i / 3)) % 3 == 2 && <NewsCardPlain newsItem={item} />}
                    </div>
                ))}
            </Masonry>

            <div className="pagination m-10">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button className={`transition-colors text-xl p-2 rounded-xl mx-3 hover:bg-slate-300/40 ${index + 1 == page ? "font-bold text-2xl" : ""}`} key={index} onClick={() => handlePagination(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>}
        {(news.length == 0 || !news) && <div className="h-screen flex flex-col items-center m-10">
            <h1 className="text-2xl">Өкінішке орай ешқандай жаңалық табылмады</h1>
        </div>}
    </>
}