'use client'
import React, { useEffect } from 'react'
import Container from '../components/Container'
import Logo from '../components/Navigation/Logo'
import Search from '../components/Navigation/Search'
import UserMenu from '../components/Navigation/UserMenu'


export default function Navbar() {


    const [user, setUser] = React.useState({ username: '', avatar_url: '', name: '' } as any);
    const [resps, setRepos] = React.useState([]);


    const GetGithubUserData = async () => {
        const Response = await fetch("http://127.0.0.1:5000/users/getGithubUserData", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        const Data = await Response.json()
        setUser(Data.data)
        console.log(Data.data)
    }

    const GetGithubRepositories = async () => {
        const Response = await fetch("http://127.0.0.1:5000/users/getUserRepos", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        const Data = await Response.json()
        setRepos(Data.data)
    }

    useEffect(() => {
        GetGithubUserData()
        GetGithubRepositories()
    }, [])


    const [selectedRadio, setSelectedRadio] = React.useState(0);

    const handleRadioChange = (index: number) => {
        setSelectedRadio(index);
    };


    return (

        <div className='w-full bg-black z-10 shadow-inner'>
            <Container>
                <div className='
                  flex
                  flex-row
                  items-center
                  justify-between
                  gap-3
                  md:gap-0
                '>
                    <Logo />
                    <Search />
                    {user &&
                        <UserMenu
                            avatar={user.avatar_url}
                            name={user.name} />}
                </div>
            </Container>


            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Select your Repository</h1>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                            Select the repository you want to deploy to CloudFusion
                        </p>
                    </div>
                    <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {resps && resps.map((repos, index) => {
                            const inputId = `DeliveryMethod${index}`;
                            return (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        name="DeliveryMethod"
                                        id={inputId}
                                        className="peer hidden"
                                        onChange={() => handleRadioChange(index)}
                                    />
                                    <label
                                        htmlFor={inputId}
                                        className={`block cursor-pointer rounded-lg border border-white b-1 bg-black p-4 text-sm font-medium shadow-sm hover:border-gray-200 ${selectedRadio === index
                                            ? 'border-rose-500 bg-rose-500'
                                            : ''
                                            }`}
                                    >
                                        <p className="text-white">{repos.name}</p>
                                        <p className="mt-1 text-gray-400 flex flex-row justify-between">
                                            <span>{repos.default_branch}</span>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium capitalize ${repos.private ? (
                                                    'bg-green-100 text-green-800'
                                                ) : (
                                                    'bg-rose-500 text-white'
                                                )}`}
                                            >
                                                {repos.private ? (
                                                    <span>Private</span>
                                                ) : (
                                                    <span>Public</span>
                                                )}
                                            </span>

                                        </p>
                                    </label>
                                </div>
                            );
                        })}
                    </fieldset>
                </div>
            </section>




            <footer className="text-gray-600 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-100">
                        <img width="80" height="80" src="/images/CloudFusionLogo.png" alt="CloudFusionLogo" />
                        <span className="ml-3 text-xl">Cloud Fusion</span>
                    </a>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 Cloud Fusion —
                        <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">
                            @CloudFusion
                        </a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="text-gray-500">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </footer>
        </div>

    )
}
