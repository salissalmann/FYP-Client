'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import MenuItem from "./MenuItem"
import { useCallback, useState } from "react"

const UserMenu = () =>{
    const [isOpen , setIsOpen] = useState(false);

    const toggleOpen = useCallback(()=>{
        setIsOpen((prev)=>!prev)
    },[]);


    return(
        <>
        <div className="relative">
            <div 
                className="
                flex
                flex-row
                items-center
                gap-3
                ">
                    <div 
                        className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-gray-100
                        transition
                        cursor-pointer
                        ">
                            Become a host
                        </div>
                    <div
                        onClick={toggleOpen}
                        className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-gray-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        hover:bg-gray-100
                        transition
                        cursor-pointer
                        ">
                            <AiOutlineMenu/>
                            <div
                                className="
                                hidden
                                md:block
                                ">
                                    <Avatar/>
                            </div>
                        </div>

                </div>
        </div>
        {isOpen && (
            <div
            className=" 
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-[30vw]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            ">
                <div className="
                flex
                flex-col
                cursor-pointer">
                    <MenuItem 
                        label="Login"
                        onClick={()=>{}}
                    />
                    <MenuItem 
                        label="Signup"
                        onClick={()=>{}}
                    />
                </div>
            </div>


        )

        } 
        </>
    )
}

export default UserMenu;