'use client'
import React, { useEffect } from 'react'
import Container from '../components/Container'
import Logo from '../components/Navigation/Logo'
import Search from '../components/Navigation/Search'
import UserMenu from '../components/Navigation/UserMenu'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'


export default function Navbar() {


    const [user, setUser] = React.useState({ username: '', avatar_url: '', name: '' } as any);
    const [resps, setRepos] = React.useState([]);


    const GetGithubUserData = async () => {
        const Response = await fetch("http://127.0.0.1:3001/users/getGithubUserData", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        const Data = await Response.json()
        setUser(Data.data)
    }

    const GetGithubRepositories = async () => {
        const Response = await fetch("http://127.0.0.1:3001/users/getUserRepos", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        const Data = await Response.json()
        console.log(Data.data)
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

    const [PageIndex, setPageIndex] = React.useState(0);
    const Pages = [
        "Select Repository",
        "Select Cloud",
    ]

    const handlePageChange = (index: number) => {
        setPageIndex(index);
    };


    return (

        <div className='w-full bg-black z-10 shadow-inner'>
            <Navigation
                avatar={user?.avatar_url}
                name={user?.name}
            />

            {PageIndex === 0 && (
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-20 mx-auto">
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
            )}

            {PageIndex === 1 && (
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-12 mx-auto">
                        <div className="flex flex-wrap w-full mb-2 flex-col items-center text-center">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Select your Infrastructure</h1>
                            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                                Select the cloud you want to deploy your application
                            </p>
                        </div>
                    </div>
                    <div className='w-4/5 
            mx-auto
            flex flex-row
            gap-4
            justify-between
            items-center
            '>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-4 px-4 bg-orange-500 rounded-lg">
                                <div className="inline-flex items-center justify-center rounded-full text-white flex-shrink-0 w-14 h-14">
                                    <img src="/images/aws-svgrepo-com.svg"
                                        width={45}
                                        height={45}
                                        alt="aws-logo"
                                    />
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">AWS</h2>
                                <p className="leading-relaxed text-white text-base">Amazon Web Services</p>
                                <button className="flex items-center mt-3 text-orange-500 bg-white border-0 py-1 px-2 focus:outline-none hover:bg-rose-600 rounded text-sm">
                                    Select
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-4 px-4 bg-blue-500 rounded-lg">
                                <div className="inline-flex items-center justify-center rounded-full text-white flex-shrink-0 w-14 h-14">
                                    <img src="/images/digitalocean.svg"
                                        width={50}
                                        height={50}
                                        alt="doc-logo"
                                    />
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">DOC</h2>
                                <p className="leading-relaxed text-white text-base">Digital Ocean</p>
                                <button className="flex items-center mt-3 text-blue-500 bg-white border-0 py-1 px-2 focus:outline-none hover:bg-rose-600 rounded text-sm">
                                    Select
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-4 px-4 bg-blue-800 rounded-lg">
                                <div className="inline-flex items-center justify-center rounded-full text-white flex-shrink-0 w-14 h-14">
                                    <img src="/images/azure.svg"
                                        width={50}
                                        height={50}
                                        alt="gcp-logo"
                                    />
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">Azure</h2>
                                <p className="leading-relaxed text-white text-base">Microsoft Azure</p>
                                <button className="flex items-center mt-3 text-blue-800 bg-white border-0 py-1 px-2 focus:outline-none hover:bg-rose-600 rounded text-sm">
                                    Select
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-4 px-4 bg-red-400 rounded-lg">
                                <div className="inline-flex items-center justify-center rounded-full text-white flex-shrink-0 w-14 h-14">
                                    <img src="/images/openstack.svg"
                                        width={50}
                                        height={50}
                                        alt="gcp-logo"
                                    />
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">FusionCloud</h2>
                                <p className="leading-relaxed text-white text-base">Private Cloud</p>
                                <button className="flex items-center mt-3 text-red-500 bg-white border-0 py-1 px-2 focus:outline-none hover:bg-rose-600 rounded text-sm">
                                    Select
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>


                </section>

            )}
            <h1 className='text-white'>Selected Repo:
                {/*
                {resps && resps[selectedRadio].clone_url}
            */}
            </h1>

            <div className='w-4/5 
            mx-auto
            flex flex-row
            gap-4
            justify-between
            items-center
            '>
                <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                    onClick={() => handlePageChange(PageIndex - 1)}
                >Back</button>
                <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                    onClick={() => handlePageChange(PageIndex + 1)}
                >Next</button>
            </div>


            <Footer />



        </div>

    )
}
