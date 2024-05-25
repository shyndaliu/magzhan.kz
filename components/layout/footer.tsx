import { categories, Category } from "../models/categories"

export default function Footer() {
    return <div className="bg-theme-blue text-white/60 flex flex-col items-center">
        <div className="flex items-center justify-center w-full p-10 border-b border-gray-200/20">
            {categories.map((c: Category, i: number) => {
                return <a key={i} className="text-white hover:text-white/80 px-4" href={"?category=" + c.tag}>{c.caption}</a>
            })}
        </div>
        <div className="flex items-center justify-center w-full p-8 border-b border-gray-200/20">
            <p>Байлыныс үшін: magzhankz@gmail.com</p>
        </div>
        <div className="flex items-center justify-center w-full p-8 border-b border-gray-200/20">
            <p>Барлық құқықтар сақталған @2024</p>
        </div>
    </div>
}