'use client'

import { AiOutlineMenu } from "react-icons/ai"
import { AiOutlineDeploymentUnit } from "react-icons/ai"
import Avatar from "./Avatar"
import MenuItem from "./MenuItem"
import { useCallback, useState } from "react"
import useRegisterModel from "@/app/hooks/useRegister"
import { BiSearch } from "react-icons/bi"
import useLoginModel from "@/app/hooks/useLogin"

type UserMenuProps = {
    username?: string;
    avatar?: string;
    name?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, avatar, name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const RegisterModel = useRegisterModel()
    const LoginModel = useLoginModel()

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, []);


    return (
        <>
            <div className="relative z-10">
                <div
                    className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                ">
                    <div
                        onClick={toggleOpen}
                        className="
                        p-4
                        md:py-1
                        md:px-3
                        border-[1px]
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded
                        transition
                        cursor-pointer
                        text-white
                        border-gray-700
                        hover:bg-rose-500
                        hover:text-white
                        shadow-inner
                        ">
                        <AiOutlineDeploymentUnit />
                        <div
                            className="
                                hidden
                                md:block
                                ">
                            Deploy
                        </div>
                    </div>
                    {(name && avatar) ?
                        <div
                            className="
                        p-3
                        md:py-1
                        md:px-3
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded
                        transition
                        cursor-pointer
                        bg-rose-500
                        text-white
                        hover:bg-white
                        hover:text-black
                        shadow-inner
                        ">
                            {name}
                            <div
                                className="
                                hidden
                                md:block
                                ">
                                <img
                                    className="rounded-full"
                                    width="30" height="30" src={avatar} alt="CloudFusionLogo" />
                            </div>
                        </div> :
                        <div
                            className="
                        p-4
                        md:py-1
                        md:px-3
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded
                        transition
                        cursor-pointer
                        bg-rose-500
                        text-white
                        hover:bg-white
                        hover:text-black
                        shadow-inner
                        
                        ">
                            Learn
                        </div>
                    }


                </div>
            </div>
            {isOpen && (
                <div
                    className=" 
            absolute
            rounded-xl
            shadow-md
            w-[20vw]
            md:w-[10vw]
            bg-black
            overflow-hidden
            right-10
            text-sm
            z-10
            top-8
            text-gray-300
            font-light
            border
            border-gray-700
            ">
                    <div className="
                flex
                flex-col
                cursor-pointer">
                        <MenuItem
                            label="Login"
                            onClick={() => {
                                LoginModel.onOpen()
                                setIsOpen(false)
                            }}
                        />
                        <MenuItem
                            label="Signup"
                            onClick={() => {
                                RegisterModel.onOpen()
                                setIsOpen(false)
                            }}
                        />
                    </div>
                </div>
            )

            }
        </>
    )
}

export default UserMenu;