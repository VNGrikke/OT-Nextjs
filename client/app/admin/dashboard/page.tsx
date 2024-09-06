"use client"
import React from 'react'
import Management from '@/components/managementPart/page'
import ManagementPanel from '@/components/managementPanel/page'
import { Provider } from 'react-redux'

import { useRouter } from 'next/navigation';

export default function page() {
    const route = useRouter();
    const user:any = localStorage.getItem("user")
    
    if (!user || user.role === 0) {
        route.push('/pages/sign-in');
        return null;
    }
    
    return (
        // <Provider store={store}>
            <div className='flex'>
                <Management />
                <div>
                    <h2>Panel Management</h2>
                    <ManagementPanel />
                </div>
            </div>
        // </Provider>
    )
}
