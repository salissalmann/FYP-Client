'use client'
import { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode
}
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])
    return

    if (!hasMounted) {
        return null
    }
    return (
        <>
            {children}
        </>
    )
}

//Avoids hyderation error
//Wrap around you components in layout.tsx