"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import registerUser from "@/redux/reducers/usersSlice"

export default function SignUp() {
    const router = useRouter();

    const [formData, setFormData] = useState<any>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 0,
        profilePicture: '',
        status: 0,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.fullName) {
            setErrorMessage('Vui lòng nhập họ và tên đầy đủ');
            return;
        }
        if (!validateEmail(formData.email)) {
            setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ');
            return;
        }
        if (formData.password.length < 6) {
            setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Mật khẩu không khớp');
            return;
        }

        try {
            console.log(formData);
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(formData.password, salt);
            const response = await axios.post('http://localhost:8888/users', {
                profilePicture: '',
                fullName: formData.fullName,
                name: formData.name,
                email: formData.email,
                password: hashedPassword,
                role: formData.role,
                status: formData.status,
            });
            setSuccessMessage('Tài khoản đã được tạo thành công!');
            setErrorMessage('');
            setTimeout(() => {
                router.push('/pages/sign-in');
            }, 2000);
        } catch (error: any) {
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Tạo tài khoản của bạn</h2>

                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Họ và tên đầy đủ</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tên đầy đủ của bạn"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mật khẩu của bạn"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Xác nhận mật khẩu của bạn"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Đăng ký
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Đã có tài khoản?{' '}
                    <a
                        onClick={() => router.push('/sign-in')}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    );
}
