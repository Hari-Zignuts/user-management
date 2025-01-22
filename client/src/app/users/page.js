'use client';
import { useEffect, useState } from 'react';
import { getUsers, addUser, deleteUserApi, updateUserApi } from '@/services/api'
import User from '@/components/User';
import Loading from '../loading';
import { Add } from '@mui/icons-material';
import AddUser from '@/components/AddUser';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave =  (newUser) => {
        const response = addUser(newUser);
        const id = response.id;
        setUsers((prev) => [...prev, { ...newUser, id}]);
        closeModal();
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getUsers();
                const users = data.map((item) => ({
                    ...item,
                    like: false,
                }));
                setUsers(users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleLike = (id) => {
        setUsers(prev => (
            prev.map((user) => (
                user.id === id ?
                    {
                        ...user,
                        like: !user.like
                    } : user
            ))
        ))
    }

    const deleteUser = (id) => {
        setUsers(prev => (
            prev.filter((user) => user.id !== id)
        ))
        const response = deleteUserApi(id);

    }

    const updateUser = (user) => {
        const response = updateUserApi(user);
        setUsers(prev => (
            prev.map((item) => (
                item.id === user.id ? user : item
            ))
        ))
    }

    if (loading) {
        return <Loading />
    }

    const data = users.map((user) => (
        <User key={user.id} user={user} onToggleLike={toggleLike} onDelete={deleteUser} updateUser={updateUser} />
    ))

    return (
        <>

            <main className='p-4 grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {data}
                <div className='card bg-white rounded-sm border-gray-300 border text-gray-600 flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center text-[25px] cursor-pointer' onClick={openModal}>
                        <Add style={{ fontSize: '30px' }} /> <span>Add User</span>
                    </div>
                </div>
                <AddUser show={isModalOpen} onClose={closeModal} onSave={handleSave} />
            </main>
        </>
    );
}
