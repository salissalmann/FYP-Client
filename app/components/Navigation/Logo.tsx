'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()
    return (
        <Image
            src='/images/CloudFusionLogo.png'
            className='hidden md:block cursor-pointer'
            width={120}
            height={120}
            alt="Logo" />
    )
}

export default Logo;