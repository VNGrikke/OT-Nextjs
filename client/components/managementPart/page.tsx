import React from 'react'
import { useRouter } from 'next/navigation'

export default function ManagementPart() {

    const router = useRouter();
    
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/pages/sign-in');
    }
    
    return (
        <div className='w-[300px] bg-green-600 h-screen font-mono'>
            <div>
                <div className='h-[200px] w-auto bg-pink-600 text-center leading-[200px]'>Logo</div>
            </div>
            <div>
                <ul className='w-auto h-auto text-2xl '>
                    <li className='px-[20px] py-[15px] mt-[100px] hover:bg-lime-500 cursor-pointer' >Người Dùng</li>
                    <li className='px-[20px] py-[15px] hover:bg-lime-500 cursor-pointer'>Khóa Học</li>
                    <li className='px-[20px] py-[15px] hover:bg-lime-500 cursor-pointer'>Môn Thi</li>
                    <li className='px-[20px] py-[15px] hover:bg-lime-500 cursor-pointer'>Đề Thi</li>
                    <li className='px-[20px] py-[15px] hover:bg-lime-500 cursor-pointer'>Ngân Hàng Câu Hỏi</li>
                    <li className='px-[20px] py-[15px] hover:bg-lime-500 cursor-pointer'>Hình Ảnh</li>
                    <li onClick={handleLogout} className='px-[20px] py-[15px] hover:bg-lime-500 cursor-pointer'>Đăng Xuất</li>
                </ul>
            </div>
        </div>
    )
}
