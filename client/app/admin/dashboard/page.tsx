"use client"
import Management from '@/components/managementPart/page';
import ManagementUser from '@/components/managementUser/page';
import ManagementCourses from '@/components/managementCourses/page';
import ManagementExamSubject from '@/components/managementExamSubject/page';
import ManagementExam from '@/components/managementExam/page';
import ManagementQuestionBank from '@/components/managementQuestionBank/page';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const selected = localStorage.getItem('selectedItem');


        if (!userId) {
            router.push('/pages/sign-in');
            return;
        }

        setSelectedItem(selected);

        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:8888/users/${userId}`);
                setUserData(response.data);
                if (response.data.role == 0) {
                    router.push('/pages/home');
                    return
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    });


    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex'>
            <Management /> {/* Sidebar quản lý */}

            <div>
                {selectedItem === 'users' && <ManagementUser />}
                {selectedItem === 'courses' && <ManagementCourses />}
                {selectedItem === 'exams-subject' && <ManagementExamSubject />}
                {selectedItem === 'exams' && <ManagementExam />}
                {selectedItem === 'questionBank' && <ManagementQuestionBank/>}

            </div>
        </div>
    );
}
