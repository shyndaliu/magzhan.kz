import Link from "next/link";
import { Category, categories } from "../models/categories"
import { News } from "../models/news";
import Tag from "./tag"
import { format } from "date-fns";


export function NewsCardDefault(props: { newsItem: News }) {
    let newsItem: News = props.newsItem;
    return <Link href={`/news/${newsItem.uuid}`} passHref> <div className="bg-white w-full rounded-[30px] flex flex-col items-center my-10 py-8 hover:scale-[1.02] transition-transform">
        <div className="w-[85%] h-[45%] rounded-3xl flex justify-center overflow-hidden">
            <img src={newsItem.image_url} className="object-cover w-[500px]" />
        </div>
        <div className="w-[85%] mt-5">
            <CategoryList newsCategories={newsItem.categories} />
            <p className="my-5 text-xl font-semibold">{newsItem.title}</p>
            <p>{formatDate(newsItem.published_at)}</p>
        </div>
    </div></Link>
}
export function NewsCardPhoto(props: { newsItem: News }) {
    let newsItem: News = props.newsItem;
    return <Link href={`/news/${newsItem.uuid}`} passHref> <div style={{ backgroundImage: `url(${newsItem.image_url})`, backgroundSize: "cover", backgroundPosition: "center" }}
        className="relative h-full text-white w-full rounded-[30px] flex flex-col items-center my-10 py-8 hover:scale-[1.02] transition-transform">
        <br></br><br></br><br></br>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black to-transparent opacity-50 rounded-[30px]"></div>
        <div className="w-[85%] z-20 mt-5">
            <CategoryList newsCategories={newsItem.categories} />
            <p className="my-5 text-2xl font-semibold">{newsItem.title}</p>
            <p>{formatDate(newsItem.published_at)}</p>
        </div>
    </div></Link>
}
export function NewsCardPlain(props: { newsItem: News }) {
    let newsItem: News = props.newsItem;
    return <Link href={`/news/${newsItem.uuid}`} passHref><div className="bg-white w-full rounded-[30px] flex flex-col items-center justify-between my-10 py-8 hover:scale-[1.02] transition-transform h-full min-h-[450px]">
        <div className="w-[85%] mt-5">
            <CategoryList newsCategories={newsItem.categories} />
            <p className="my-5 text-3xl font-semibold">{newsItem.title}</p>
        </div>
        <div className="w-[85%]">
            <p>{formatDate(newsItem.published_at)}</p>

        </div>
    </div></Link>
}

export function formatDate(date: Date): string {
    return format(date, 'dd MMMM yyyy')
}
export function CategoryList(props: { newsCategories: string[] }) {
    let newsCategories: string[] = props.newsCategories;
    return <>{newsCategories.map((c: string, i: number) => {
        let category: Category = categories.find((category) => category.apiTag == c) || categories[0];
        return <Tag key={i} category={category} />
    })}</>
}