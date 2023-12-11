'use client'
import React, { useState, useEffect } from "react";
import {
    FieldErrors,
    FieldValues,
    SubmitHandler,
    UseFormRegister,
    useForm
} from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import Button from "../Button";

import useLoginModel from "@/app/hooks/useLogin";
import useRegisterModel from "@/app/hooks/useRegister";
import { notification } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";


interface LoginModalProps { }
const LoginModalCom: React.FC<LoginModalProps> = ({ }) => {

    const router = useRouter()
    const LoginModal = useLoginModel()
    const RegisterModal = useRegisterModel()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const OnSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        }).then((callback) => {
            if (callback?.ok) {
                notification.success(
                    {
                        message: 'Login Success',
                        description: 'You have successfully logged in',
                        type: 'success'
                    }
                )
                router.refresh()
                LoginModal.onClose()
            }

            if (callback?.error) {
                notification.error(
                    {
                        message: 'Login Failed',
                        description: 'Invalid Credentials',
                        type: 'error'
                    }
                )
            }
        })
    }

    const GITHUB_CLIENT_ID = "b55016a7680d8e89d8ba"
    const [reRender, setReRender] = useState(false)


    const GetAccessToken = async (code: any) => {
        const Response = await fetch("http://127.0.0.1:3001/users/getGithubAccessToken?code=" + code, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const Data = await Response.json();
        console.log(Data)
        console.log(Data.data)
        if (Data.data) {
            localStorage.setItem('accessToken', Data.data);
            setReRender(!reRender)
            window.location.href = "http://127.0.0.1:3000/dashboard"
        }
    }




    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const code = urlParams.get('code')
        if (code && (localStorage.getItem("accessToken") === null)) {
            GetAccessToken(code)
            //redirect to dashboard
        }
    }, [])

    function ContinueWithGithub() {
        const githubUrl = 'https://github.com/login/oauth/authorize?client_id=' + GITHUB_CLIENT_ID;
        window.location.assign(githubUrl);
    }



    const Body = (
        <>
            <div className="flex flex-col gap-4">
                <Heading
                    title="Welcome Back"
                    subtitle="Login to your account"
                />
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        </>
    )

    const FooterContent = (
        <div className="flex flex-col gap-4 mt-3">
            <Button
                outline
                label="Continue with Github"
                onClick={() => {
                    if (localStorage.getItem("accessToken") === null)
                        ContinueWithGithub()
                    else {
                        window.location.href = "http://127.0.0.1:3000/dashboard"
                    }
                }}
                icon={AiFillGithub}
            />
            <div
                className="
                text-neutral-500
                text-center
                mt-4
                font-light">
                <div className="justify-center flex flex-row items-center gap-1">
                    <div >Already have an account?</div>
                    <div className=" border-neutral-800
                    cursor-pointer hover:underline"
                        onClick={() => {
                            LoginModal.onClose()
                        }}>Login </div>
                </div>
            </div>
        </div>

    )

    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={LoginModal.isOpen}
                onClose={LoginModal.onClose}
                title="Login"
                actionLabel="Continue"
                onSubmit={handleSubmit(OnSubmit)}
                body={Body}
                footer={FooterContent}
            />
        </>
    )
}

export default LoginModalCom;

interface HeadingProps {
    title: string;
    subtitle: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
    return (
        <>
            <div className={`flex flex-col gap-2 ${center ? 'items-center' : ''}`}>
                <div className="text-2xl font-semibold">{title}</div>
                <div className="text-sm text-gray-100">{subtitle}</div>
            </div>
        </>
    )
}

interface InputProps {
    id: string,
    label?: string;
    type?: string,
    disabled?: boolean,
    formatPrice?: boolean,
    required?: boolean,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors
}) => {
    return (
        <>
            <div className="flex flex-col gap-1">
                <div className="text-sm text-gray-100">{label}</div>
                <input
                    id={id}
                    disabled={disabled}
                    type={type}
                    className={`
                    peer
                    w-full
                    p-2
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    focus:border-rose-300
                    focus:ring-rose-300
                    focus:ring-opacity-50
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice} ? 'pl-9': 'pl-4'}` + (errors[id] ? "border-red-500" : "")}
                    placeholder=""
                    aria-invalid={!!errors[id]}
                    {...register(id, { required })}
                />
            </div >
        </>
    )
}

