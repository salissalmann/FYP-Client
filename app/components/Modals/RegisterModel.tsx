'use client'
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import axios from 'axios'
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"
import {
    FieldValues,
    useForm,
    SubmitHandler,
    UseFormRegister,
    FieldErrors
}
    from "react-hook-form";

import useRegisterModel from "@/app/hooks/useRegister";
import Modal from "./Modal";
import { notification } from "antd";
import { signIn } from "next-auth/react";
import { useNavigate } from "react-router-dom";

interface RegisterModalProps { }
const RegisterModal: React.FC<RegisterModalProps> = ({ }) => {

    const RegisterModal = useRegisterModel()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const OnSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        console.log(data)
        axios.post('/api/register', data)
            .then(res => {
                setIsLoading(false)
                RegisterModal.onClose()
                notification.success({
                    message: 'Success',
                    description: 'Account created successfully'
                })
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
                notification.error({
                    message: 'Error',
                    description: 'Something went wrong'
                })
            })
    }

    const Body = (
        <>
            <div className="flex flex-col gap-4">
                <Heading
                    title="Sign up"
                    subtitle="Already have an account?"
                />
                <Input
                    id="name"
                    label="Name"
                    type="text"
                    register={register}
                    errors={errors}
                    required
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

    const GITHUB_CLIENT_ID = "b55016a7680d8e89d8ba"
    const [accessToken, setAccessToken] = useState('')
    const [reRender, setReRender] = useState(false)


    const GetAccessToken = async (code: any) => {
        const Response = await fetch("http://127.0.0.1:5000/users/getGithubAccessToken?code=" + code, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const Data = await Response.json();
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
    })


    function ContinueWithGithub() {
        const githubUrl = 'https://github.com/login/oauth/authorize?client_id=' + GITHUB_CLIENT_ID;
        window.location.assign(githubUrl);
    }



    const GetGithubUserData = async () => {
        const Response = await fetch("http://127.0.0.1:5000/users/getUserRepos", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        const Data = await Response.json()
        console.log(Data)
        return Data
    }


    const FooterContent = (
        <div className="flex flex-col gap-4 mt-3">
            <Button
                outline
                label="Continue with Github"
                onClick={() => {
                    ContinueWithGithub()
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
                            GetGithubUserData()
                            RegisterModal.onClose()
                        }}>Login </div>
                </div>
            </div>
        </div>

    )


    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={RegisterModal.isOpen}
                onClose={RegisterModal.onClose}
                title="Register"
                actionLabel="Continue"
                onSubmit={handleSubmit(OnSubmit)}
                body={Body}
                footer={FooterContent}
            />
        </>
    )
}

export default RegisterModal;

interface HeadingProps {
    title?: string;
    subtitle?: string;
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
                    bg-transparent
                    border-2
                    border-gray-700
                    rounded-md
                    outline-none
                    transition
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

