import { Bad_Script, Chau_Philomene_One } from "next/font/google"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const title = Chau_Philomene_One({ weight: "400", subsets: ["latin"] })
const badScript = Bad_Script({ weight: "400", subsets: ["cyrillic", "latin"] })

export default function Header() {
    return <div className="bg-white flex flex-col px-10 py-3 ">
        <div className="flex flex-row justify-between items-center my-4">
            <p className={badScript.className + " text-xl"}>Мен жастарға сенемін</p>
            <a href="/"><h1 className={title.className + " text-4xl"}>Magzhan.kz</h1></a>
            <p className={badScript.className + " text-xl"}>Мағжан Жұмабаев</p>
        </div>
        <div className="bg-main-gray rounded-full p-2 flex flex-row justify-between items-center my-4">
            <p>smth</p>

            <form action="" className="focus:transition-transform duration-500  relative w-max bg-white rounded-full">
                <input type="search"
                    className="peer transition-all duration-250  cursor-pointer relative z-10 h-12 w-12 rounded-full border-transparent bg-transparent pr-12 outline-none focus:w-full focus:cursor-text focus:pr-16 focus:pl-4" />
                <MagnifyingGlassIcon className="transition-color duration-75 ease-in-out outline-2  h-12 w-12  absolute inset-y-0 right-0 my-auto border-l border-l-transparent px-3.5 peer-focus:border-l-black/5 " />
            </form>

        </div>

    </div>
}

