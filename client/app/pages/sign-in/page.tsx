"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Vui lòng nhập email và mật khẩu');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Email không hợp lệ');
            return;
        }

        try {
            const response = await axios.get("http://localhost:8888/users")
            const user = response.data.find((u: any) => u.email === email);
            if (!user || !bcrypt.compareSync(password, user.password)) {
                setError('Tài khoản hoặc mật khẩu không đúng');
                return;
            }

            // Lưu thông tin user vào local storage
            localStorage.setItem('user', JSON.stringify(user));

            setTimeout(() => {
                if (user.role === 1) {
                    router.push('/admin/dashboard');
                } else{
                    router.push('/pages/home');
                }
            }, 2000);

        } catch (error) {
            console.error('Lỗi:', error);
            setError('Có lỗi xảy ra, vui lòng thử lại.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Đăng nhập</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mật khẩu của bạn"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-600">Nhớ lần đăng nhập này</label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Đăng nhập
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Không có tài khoản? <a
                        onClick={() => router.push('/pages/sign-up')}
                        className="text-blue-600 hover:underline cursor-pointer">Đăng ký</a>
                </p>
            </div>
        </div>
    );
}
