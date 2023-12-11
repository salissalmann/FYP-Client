import React from 'react'

interface NavigationProps {
    avatar?: string;
    name?: string;
}


export default function Navigation({ avatar, name }: NavigationProps) {
    return (
        <div>
            <header className="text-white body-font">
                <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center justify-between">
                    <a className="flex title-font font-medium items-center text-gray-300 mb-4 md:mb-0">
                        <img src='/images/CloudFusionLogo.png' className='hidden md:block cursor-pointer' width={140} height={140} alt="Logo" />
                    </a>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base font-nunito justify-center">
                        <a className="mr-5 hover:text-gray-300 cursor-pointer">Home</a>
                        <a className="mr-5 hover:text-gray-300 cursor-pointer">Documentation</a>
                        <a className="mr-5 hover:text-gray-300 cursor-pointer">Pricing</a>
                        <a className="mr-5 hover:text-gray-300 cursor-pointer">About Us</a>
                    </nav>
                    {avatar && name ?
                    <div className='flex flex-row gap-4 items-center bg-rose-500 rounded px-4 
                    py-1 font-nunito text-white font-light text-sm md:text-base cursor-pointer
                    transition duration-150 ease-in-out hover:bg-rose-600
                    '>
                            <img
                                className="rounded-full"
                                width="35" height="35" src={avatar} alt="CloudFusionLogo" />
                            {name}
                    </div>
                    :
                    <div className='flex flex-row gap-2'>
                    <button className="inline-flex items-center border b-1 border-rose-500  py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0">Login</button>
                    <button className="inline-flex items-center border b-1 border-rose-500  py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0">Create Account</button>
                    </div>
}

                </div>
            </header>
        </div>
    )
}
