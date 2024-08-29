"use client"
import {authenticateUser} from '@/services/authService';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'

const Page = () => {

    const router = useRouter();

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            username: email,
            password: password
        }
        try {
            const success = await authenticateUser(payload);
            if (success) {
                router.push('/dashboard');

                setLoading(false);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Failed to login');
            setLoading(false);
        }
    }

    return (
        <>
            <form className="space-y-6 border mx-auto flex flex-col justify-center items-center h-[400px] w-[300px]" onSubmit={handleSubmit}>
                <div className=' flex flex-col '>
                    <label htmlFor="email">Email</label>
                    <input type="text" className='border w-[200px] p-2 rounded-lg ' name='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className=' flex flex-col '>
                    <label htmlFor="password">Password</label>
                    <input type="password" className='border w-[200px] p-2 rounded-lg ' name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className=' border bg-blue-500 p-2 w-[150px] rounded-md text-white'>{loading ? "loading..." : "Login"}</button>
            </form>
        </>

    );
}


export default Page



