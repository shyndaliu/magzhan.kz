import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories, Category } from "../models/categories";



export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(new URLSearchParams(searchParams.toString()).get('category'));

    const updateURL = (params: URLSearchParams) => {
        if (pathname === '/') {
            window.history.pushState({}, '', `${pathname}?${params.toString()}`);
        } else {
            window.location.href = `/?${params.toString()}`;
        }
    };

    const filterSearch = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category) params.set('category', category);
        if (category === "all") params.delete('category');
        updateURL(params);
    };

    const categoryHandler = (e: any) => {
        setActiveCategory(e.target.value);
        filterSearch(e.target.value);
    };

    const searchQueryHandler = (e: any) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        if (query !== '') {
            params.set('search', query);
        } else {
            params.delete('search');
        }
        updateURL(params);
    };

    return <div className="bg-main-gray rounded-full p-2 flex flex-row justify-between items-center my-4">
        <div className="flex mx-3">
            {categories.map((c: Category, i: number) => {
                const isActive = (activeCategory == c.tag)
                return <button value={c.tag} key={i}
                    className={`transition-colors duration-100 ease-in rounded-full mx-1 px-3 py-2 hover:bg-theme-blue/70 hover:text-white ${isActive ? 'bg-theme-blue text-white' : ''}`}
                    onClick={categoryHandler}>{c.caption}</button>
            })}
        </div>

        <form action="" onSubmit={searchQueryHandler} className="focus:transition-transform duration-500  relative w-max bg-white rounded-full">
            <input type="text" onChange={(e: any) => setQuery(e.target.value)}
                className="peer transition-all duration-250  cursor-pointer relative z-10 h-12 w-12 rounded-full border-transparent bg-transparent pr-12 outline-none focus:w-full focus:cursor-text focus:pr-16 focus:pl-4" />
            <MagnifyingGlassIcon className="transition-color duration-75 ease-in-out outline-2  h-12 w-12  absolute inset-y-0 right-0 my-auto border-l border-l-transparent px-3.5 peer-focus:border-l-black/5 " />
        </form>

    </div>
};