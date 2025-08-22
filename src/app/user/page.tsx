'use client'

import { useEffect, useState } from 'react';
import UserTable from '../ui/UserTable';

export default function User() {
    const [users, setUsers] = useState([])
    const fetchUsers = async (uid: string | null) => {
        if (!uid) return console.log("uid Not Found");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/getusers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid }),
            });
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching recent transactions:', error);
        }
    };



    useEffect(() => {
        const uid = localStorage.getItem("uid")
        fetchUsers(uid);
    }, []);
    return (
        <>
            <UserTable
                users={users}
            />
        </>
    )
}