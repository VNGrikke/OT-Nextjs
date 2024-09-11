"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '@/services/user.service';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';  

export default function Header() {
    const [user, setUser] = useState<any>(null);
    const route = useRouter();
    const dispatch: any = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const userData = await dispatch(getUserInfo(Number(userId))).unwrap();
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };

        fetchUserData();
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setUser(null);
        route.push("/pages/sign-in");
    };

    const handleProfile = () => {
        route.push("/pages/profile");
    };

    const getLastName = (fullName: string) => {
        const nameParts = fullName.split(' ');
        return nameParts[nameParts.length - 1];
    };

    return (
        <header className='flex justify-between items-center p-4 bg-gray-900 text-white relative shadow-md'>
            <div>
                <h1 className='cursor-pointer text-3xl font-bold'>E-Exam</h1>
            </div>
            <nav className='flex'>
                <ul className='flex gap-8'>
                    <li className='cursor-pointer hover:text-gray-400 transition'>Trang chủ</li>
                    <li className='cursor-pointer hover:text-gray-400 transition'>Môn</li>
                    <li className='cursor-pointer hover:text-gray-400 transition'>Lớp</li>
                </ul>
            </nav>
            <div className='relative group'>
                {user ? (
                    <div className='relative flex items-center gap-2'>
                        <div>
                            {user.profilePicture ? (
                                <Image
                                    src={user.profilePicture}
                                    alt={user.fullName}
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className='text-3xl'
                                />
                            )}
                        </div>
                        <p className='cursor-pointer text-lg font-medium hover:text-gray-400'>
                            {getLastName(user.fullName)}
                        </p>
                        <div className='absolute right-0 top-7 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity'>
                            <button
                                onClick={handleProfile}
                                className='block w-full text-left px-4 py-2 rounded-t-lg hover:bg-gray-400 focus:outline-none transition'
                            >
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className='block w-full text-left px-4 py-2 rounded-b-lg hover:bg-gray-400 focus:outline-none transition'
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className='cursor-pointer text-lg font-medium hover:text-gray-400 transition'
                        onClick={() => route.push("/pages/sign-in")}
                    >
                        Đăng nhập
                    </div>
                )}
            </div>
        </header>
    );
}
