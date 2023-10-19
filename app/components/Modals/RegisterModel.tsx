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
        axios.post('/api/auth/register', data)
            .then(res => {
                setIsLoading(false)
                RegisterModal.onClose()
            })
            .catch(err => {
                setIsLoading(false)
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

    const FooterContent = (
        <div className="flex flex-col gap-4 mt-3">
            <Button
                outline
                label="Continue with Github"
                onClick={() => { }}
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
                <div className="text-sm text-gray-500">{subtitle}</div>
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
                <div className="text-sm text-gray-500">{label}</div>
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

