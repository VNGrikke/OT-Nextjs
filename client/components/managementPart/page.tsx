import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ManagementPart() {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<string | null>("users");

    // Khi component được mount, lấy trạng thái focus từ localStorage
    useEffect(() => {
        const storedItem = localStorage.getItem('selectedItem');
        if (storedItem) {
            setSelectedItem(storedItem);
        }
    }, []);

    // Xử lý khi nhấn vào một mục
    const handleItemClick = (item: string) => {
        setSelectedItem(item);  // Cập nhật trạng thái đã chọn
        localStorage.setItem('selectedItem', item);  // Lưu vào localStorage
    };

    // Xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('selectedItem');  // Xóa trạng thái focus khi đăng xuất
        router.push('/pages/sign-in');
    };

    return (
        <div className='w-[300px] bg-green-600 h-screen font-mono'>
            <div>
                <div className='h-[200px] w-auto bg-pink-600 text-center leading-[200px]'>Logo</div>
            </div>
            <div>
                <ul className='w-auto h-auto text-2xl '>
                    <li
                        className={`px-[20px] py-[15px] mt-[100px] cursor-pointer ${selectedItem === 'users' ? 'bg-lime-500' : 'hover:bg-lime-500'}`}
                        onClick={() => handleItemClick('users')}
                    >
                        Người Dùng
                    </li>
                    <li
                        className={`px-[20px] py-[15px] cursor-pointer ${selectedItem === 'courses' ? 'bg-lime-500' : 'hover:bg-lime-500'}`}
                        onClick={() => handleItemClick('courses')}
                    >
                        Khóa Học
                    </li>
                    <li
                        className={`px-[20px] py-[15px] cursor-pointer ${selectedItem === 'exams-subject' ? 'bg-lime-500' : 'hover:bg-lime-500'}`}
                        onClick={() => handleItemClick('exams-subject')}
                    >
                        Môn Thi
                    </li>
                    <li
                        className={`px-[20px] py-[15px] cursor-pointer ${selectedItem === 'exams' ? 'bg-lime-500' : 'hover:bg-lime-500'}`}
                        onClick={() => handleItemClick('exams')}
                    >
                        Đề Thi
                    </li>
                    <li
                        className={`px-[20px] py-[15px] cursor-pointer ${selectedItem === 'questionBank' ? 'bg-lime-500' : 'hover:bg-lime-500'}`}
                        onClick={() => handleItemClick('questionBank')}
                    >
                        Ngân Hàng Câu Hỏi
                    </li>
                    <li
                        onClick={handleLogout}
                        className='px-[20px] py-[15px] hover:bg-lime-500 cursor-pointer'
                    >
                        Đăng Xuất
                    </li>
                </ul>
            </div>
        </div>
    );
}
