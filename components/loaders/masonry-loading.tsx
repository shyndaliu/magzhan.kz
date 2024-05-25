import Masonry from "react-masonry-css";
import "./style.css";


export default function MasonryLoading() {
    return <>
        <div className="h-fit w-full animate-pulse flex flex-col items-center my-10">
            <div className="flex flex-row justify-between items-center h-96 w-[85%] gap-6">
                <div className="bg-gray-300 rounded-3xl w-3/5 h-full"></div>
                <div className="bg-gray-300 rounded-3xl w-2/5 h-full"></div>

            </div>
            <Masonry breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                className="masonry-grid"
                columnClassName="masonry-grid_column">
                {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className={` my-5 bg-gray-300 rounded-3xl  ${index % 3 == 0 ? "h-[450px]" : (index % 3 == 1 ? "h-[300px]" : "h-[500px]")}`}></div>
                ))}

            </Masonry>

        </div>
    </>
}