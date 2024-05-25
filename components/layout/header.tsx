'use client'
import { Bad_Script, Chau_Philomene_One } from "next/font/google"
import SearchBar from "./search"


const title = Chau_Philomene_One({ weight: "400", subsets: ["latin"] })
const badScript = Bad_Script({ weight: "400", subsets: ["cyrillic", "latin"] })



export default function Header() {


    return <div className="bg-white flex flex-col px-10 py-3 ">
        <div className="flex flex-row justify-between items-center my-4">
            <p className={badScript.className + " text-xl"}>Мен жастарға сенемін</p>
            <a href="/"><h1 className={title.className + " text-4xl"}>Magzhan.kz</h1></a>
            <p className={badScript.className + " text-xl"}>Мағжан Жұмабаев</p>
        </div>
        <SearchBar />

    </div>
}

