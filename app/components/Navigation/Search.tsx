'use client'
import { BiSearch } from "react-icons/bi"

const Search = () => {
    return (
        <>
            <div
                className='
                w-full
                md:w-[auto]
                py-1
                rounded
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
               text-gray-400
                '>
                <div
                    className='
                    flex
                    flex-row
                    items-center
                    justify-between
                    '>
                    <div
                        className='
                        text-sm
                        px-6'
                    >
                        Home
                    </div>
                    <div
                        className='
                        hidden
                        sm:block
                        text-sm
                        px-6
                        flex-1
                        text-center
                        '
                    >
                        Docs
                    </div>
                    <div
                        className='
                        hidden
                        sm:block
                        text-sm
                        px-6
                        flex-1
                        text-center
                        '
                    >
                        Templates
                    </div>
                    <div
                        className='
                        hidden
                        sm:block
                        text-sm
                        px-6
                        flex-1
                        text-center
                        '
                    >
                        Blogs
                    </div>


                </div>


            </div >

        </>
    )
}

export default Search;