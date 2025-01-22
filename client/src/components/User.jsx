'use client'
import Image from 'next/image';
import { Email, Phone, FavoriteBorder, Favorite, Edit, Delete } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import Modal from './Modal';
import { useState } from 'react';

function User({ user, onToggleLike, onDelete, updateUser }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSave = (updatedData) => {
      updateUser({...updatedData, id: user.id});
      closeModal();
    };

    return (
        <div className="card bg-white rounded-sm border-gray-300 border">
            <div className="card-cover bg-gray-100 rounded-t-sm flex justify-center">
                <Image src={`https://robohash.org/${user.id}`} alt="robot" width={200} height={200} loading="eager" priority />
            </div>
            <div className="ant-card-body p-5 flex flex-col gap-2">
                <h3>{user.name}</h3>
                <div className='flex flex-row text-gray-600'>
                    <Email />
                    <p className='ml-[10px]'>{user.email}</p>
                </div>
                <div className='flex flex-row text-gray-600'>
                    <Phone />
                    <p className='ml-[10px]'>{user.phone}</p>
                </div>
                <div className='flex flex-row text-gray-600'>
                    <LanguageIcon />
                    <p className='ml-[10px]'>http://{user.website}</p>
                </div>
            </div>
            <ul className="ant-card-actions flex justify-around p-4 border-t-2">
                <li className='w-full text-center border-r-2 border-gray-300'>
                    <span>
                        <button className='bg-none border-none cursor-pointer outline-none' onClick={() => onToggleLike(user.id)}>
                            {user.like ? <Favorite className='text-red-600'/> : <FavoriteBorder className='text-red-600'/>}
                        </button>
                    </span>
                </li >
                <li className='border-r-2 border-gray-300 w-full text-center'>
                    <span>
                        <button className='bg-none border-none cursor-pointer outline-none'><Edit className='text-gray-600' onClick={openModal}/></button>
                    </span>
                </li>
                <li className='w-full text-center'>
                    <span>
                        <button className='bg-none border-none cursor-pointer outline-none' onClick={() => onDelete(user.id)}><Delete className='text-gray-600' /></button>
                    </span>
                </li>
            </ul>

            <Modal show={isModalOpen} onClose={closeModal} onSave={handleSave} userData={user} />
        </div>
    )
}

export default User
