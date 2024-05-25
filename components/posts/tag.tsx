import { Category, categories } from "../models/categories"
export default function Tag(props: { category: Category }) {
    let category: Category = props.category;
    return <>
        <button className="rounded-full text-sm ml-1 w-fit px-3 py-1.5 my-1  text-white"
            style={{ backgroundColor: category.color }}
        >{category.caption}</button>
    </>

}