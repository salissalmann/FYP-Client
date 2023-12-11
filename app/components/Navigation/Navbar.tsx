import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { User } from '@prisma/client'

interface NavbarProps { }

export default function Navbar() {
  return (
    <div className='w-full bg-black z-10 shadow-inner'>
      <div className='py-3 border-b-[1px] border-gray-800 mt-1'>
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
            <UserMenu />
          </div>
        </Container>
        <section className="relative">
          <div className="relative max-w-screen-xl mx-auto px-4 py-28 md:px-8">
            <div className="space-y-5 max-w-5xl mx-auto text-center">
              <h2 className="text-5xl text-white font-extrabold mx-auto md:text-5xl border border-gray-800 border-dashed
              max-w-max
              p-2
              ">
                "Empower Your App: One-Touch Deployment to Any Cloud, Effortlessly"
              </h2>
              <p className="max-w-6xl mx-auto text-gray-300 border border-gray-800 border-dashed p-2">
                Chosen by Leading Organizations for Efficient Deployment: A Single Click Transforms Your App to Any Cloud with Seamless DevOps Integration, Automated CI/CD, and Cloud Provisioning—Simplifying Developers' Lives.              </p>
              <form className="justify-center items-center sm:flex">
                <div className='border border-gray-800 border-dashed p-7 w-full'></div>
                <div className='flex flex-row justify-center gap-3 border border-gray-800 border-dashed p-2 w-full'>
                  <button className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium hover:bg-rose-500 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto border border-gray-800">
                    Learn More
                  </button>
                  <button className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-rose-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto">
                    Get started
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className='border border-gray-800 border-dashed p-7 w-full'></div>
              </form>
            </div>
          </div>
          <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[238px] sm:max-w-md md:max-w-lg" style={{ background: "black" }}></div>
        </section>
        <section className="text-gray-600 body-font">
          <div className="container px-1 py-24 mx-auto flex flex-wrap">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-white text-3xl font-semibold sm:text-4xl">
                <span>
                  Workflows of Cloud Fusion</span>
                <span className='block text-xl 
                text-gray-400 mt-3
                '>
                  Built on a foundation of fast, production-grade tooling                  </span>
              </h3>
              <p className="text-gray-600 mt-3">
                Cloud Fusion is a complete suite of tools for building a modern web app, from prototyping to deployment.
              </p>
            </div>
            <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-rose-500 text-white relative z-10 title-font font-medium text-sm">1</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-white text-rose-500 rounded-full inline-flex items-center justify-center">
                  <img width="80" height="80" src="/images/Githubicon.png" alt="github-2" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-100 mb-1 text-xl">
                    Login with GitHub
                  </h2>
                  <p className="leading-relaxed text-gray-400">Get authorized via  GITHUB  and select your application to be deployed</p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-rose-500 text-white relative z-10 title-font font-medium text-sm">2</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-white text-rose-500 rounded-full inline-flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-white mb-1 text-xl">Select your Cloud</h2>
                  <p className="leading-relaxed text-gray-400">
                    Select your cloud provider and the region you want to deploy your app to. We offer deployments to AWS , AZURE , Digital Ocean and Private Cloud.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-rose-500 text-white relative z-10 title-font font-medium text-sm">3</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-white text-rose-500 rounded-full inline-flex items-center justify-center">
                  <img width="60" height="60" src="https://img.icons8.com/color/144/000000/terraform.png" alt="terraform" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-white mb-1 text-xl">Generation and Excution of Terraform scripts</h2>
                  <p className="leading-relaxed text-gray-400">
                    Automated infrastructure setup with generated Terraform scripts via our platform
                  </p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-rose-500 text-white relative z-10 title-font font-medium text-sm">4</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-white text-rose-500 rounded-full inline-flex items-center justify-center">
                  <img width="50" height="50" src="https://img.icons8.com/ios/50/thin-client.png" alt="thin-client" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-white mb-1 text-xl">Automated Network Configurations</h2>
                  <p className="leading-relaxed text-gray-400">
                    Automated network configurations of inbounds and outbounds of Virtual Machines
                  </p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-rose-500 text-white relative z-10 title-font font-medium text-sm">5</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-white text-rose-500 rounded-full inline-flex items-center justify-center">
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/ansible.png" alt="ansible" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-white mb-1 text-xl">Generation and Excution of Ansible Playbooks</h2>
                  <p className="leading-relaxed text-gray-400">
                    Automated Virtual Machines setup with generated Ansible playbook via our platform.</p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-rose-500 text-white relative z-10 title-font font-medium text-sm">6</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-white text-rose-500 rounded-full inline-flex items-center justify-center">
                  <img width="60" height="60" src="https://img.icons8.com/ios-glyphs/90/ssh.png" alt="ssh" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-white mb-1 text-xl">SSH Key Generation for Virtual Machines</h2>
                  <p className="leading-relaxed text-gray-400">
                    Automated SSH key generation for Virtual Machines</p>
                </div>
              </div>
            </div>

            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-rose-500 text-white relative z-10 title-font font-medium text-sm">7</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-white text-rose-500 rounded-full inline-flex items-center justify-center">
                  <img width="60" height="60" src="https://img.icons8.com/color/144/000000/docker.png" alt="docker" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-white mb-1 text-xl">Application Deployment using Virtual Machines</h2>
                  <p className="leading-relaxed text-gray-400">
                    Automated application deployment using Virtual Machines
                  </p>
                </div>
              </div>
            </div>

            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-rose-500 text-white relative z-10 title-font font-medium text-sm">8</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-white text-rose-500 rounded-full inline-flex items-center justify-center">
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/git.png" alt="git" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-white mb-1 text-xl">Automated CICD Injection via GitHub Actions & Testing</h2>
                  <p className="leading-relaxed text-gray-400">
                    Automated CICD Injection via GitHub Actions & Testing
                  </p>
                </div>
              </div>
            </div>


          </div>
        </section>
        <img src="/images/Design.png"
          className="inset-0 m-auto h-auto" />

        <div className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-white text-3xl font-semibold sm:text-4xl">
                <span>What's in Cloud Fusion?</span>
                <span className='block text-xl 
                text-gray-400 mt-3
                '>All the tools we use to make the deployments faster.</span>
              </h3>
              <p className="text-gray-600 mt-3">
                Cloud Fusion is a complete suite of tools for building a modern web app, from prototyping to deployment.
              </p>
            </div>
            <div className="mt-12 flex justify-center">
              <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-6 md:gap-x-16 md:grid-cols-3 lg:grid-cols-6">
                {/* AWS Logo */}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-amazon-web-services-a-subsidiary-of-amazon-that-provides-on-demand-cloud-computing-logo-color-tal-revivo.png" alt="external-amazon-web-services-a-subsidiary-of-amazon-that-provides-on-demand-cloud-computing-logo-color-tal-revivo" />
                </li>

                {/*Azure Logo*/}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/azure-1.png" alt="azure-1" />
                </li>

                {/* LOGO 3 */}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/ansible.png" alt="ansible" />
                </li>

                {/* digital ocean */}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/terraform.png" alt="terraform" />
                </li>

                {/* LOGO 5 */}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/docker.png" alt="docker" />
                </li>

                {/* LOGO 6 */}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/git.png" alt="git" />
                </li>

                {/* OpenStack*/}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/openstack.png" alt="openstack" />
                </li>

                {/* Github Actions*/}
                <li>
                  <img width="80" height="80" src="/images/Github.png" alt="github-2" />
                </li>

                {/* Digital Ocean*/}
                <li>
                  <img width="80" height="80" src="/images/Githubicon.png" alt="github-2" />
                </li>

                {/* Node.js */}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/nodejs.png" alt="nodejs" />
                </li>

                {/* Next.js */}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/000000/nextjs.png" alt="nextjs" />
                </li>

                {/* Prisma */}
                <li>
                  <img width="80" height="80" src="https://img.icons8.com/color/144/prisma-orm.png" alt="prisma-orm" />
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>

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
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
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
