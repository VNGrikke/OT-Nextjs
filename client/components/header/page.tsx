"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Header() {
    const [user, setUser] = useState<any>();
    const route = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    console.log(user);

    return (
        <header className='flex justify-around'>
            <div>
                <h1 className='cursor-pointer'>E-Exam</h1>


            </div>
            <nav className='flex'>
                <ul className='flex gap-[40px]'>
                    <li className='cursor-pointer'><div>Trang chu</div></li>
                    <li className='cursor-pointer'><div>Mon</div></li>
                    <li className='cursor-pointer'><div>Lop</div></li>
                </ul>
            </nav>
            <div>
                {user ? (
                    <div className='cursor-pointer'>
                        <p>{user.fullName}</p>
                        <button onClick={() => localStorage.removeItem('user')}>Logout</button>
                    </div>
                ) : (
                    <div className='cursor-pointer' onClick={()=>{ route.push("/pages/sign-in")}}>Dang nhap</div>
                )}

            </div>
        </header>
    )
}
