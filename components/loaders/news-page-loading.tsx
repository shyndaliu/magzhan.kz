export default function NewsPageLoading() {
    return <>
        <div className="w-full flex flex-col items-center h-fit bg-white ">
            <div className="flex flex-col items-start animate-pulse w-[40%]">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-[640px] mb-2.5 "></div>
                <div className="h-2.5  bg-gray-300 rounded-full dark:bg-gray-700 w-[540px]"></div>
                <div className="flex items-center justify-center my-4">
                    <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="bg-gray-300 rounded-3xl w-full h-96">
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-[640px] mb-2.5 mt-5"></div>
                <div className="h-2.5  bg-gray-300 rounded-full dark:bg-gray-700 w-[540px]"></div>
                <div className="bg-gray-300 rounded-3xl w-full h-48 my-10">
                </div>
            </div>

        </div>
    </>
}