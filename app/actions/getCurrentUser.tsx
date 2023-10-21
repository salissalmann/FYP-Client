import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import prismaClient from "@/app/libs/prismadb";

export async function getSession() {
    const session = await getServerSession(authOptions);
    return session;
}

export async function getCurrentUser() {
    const session = await getSession();
    if (!session) {
        return null
    }
    const user = await prismaClient.user.findUnique({
        where: {
            email: session?.user?.email as string,
        },
    });

    if (!user) {
        return null;
    }
    return {
        ...user,
        createdAt: user.createdAt?.toISOString(),
        updatedAt: user.updatedAt?.toISOString(),
        emailVerified: user.emailVerified?.toISOString()
    };
}
