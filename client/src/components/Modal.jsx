import React, { useState, useEffect } from 'react';

function Modal({ show, onClose, onSave, userData }) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '' });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                website: userData.website,
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <>
            {show && (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-content rounded-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="top flex justify-between border-b-[1px] border-gray-400 px-4 py-2 bg-gray-100 rounded-t-sm">
                            <h2>Basic Modal</h2>
                            <button className="close-btn" onClick={onClose}>X</button>
                        </div>
                        <form className="py-2" onSubmit={handleSubmit}>
                            <table className='w-full text-gray-500 text-[12px]'>
                                <tbody>
                                    <tr>
                                        <td className='p-4  flex justify-end'><label><span className='text-red-500 font-bold pr-1'>*</span>Name:</label></td>
                                        <td><input type="text" name="name" className='border p-[4px] rounded-sm hover:border-blue-400 focus:outline-none focus:border-blue-500' value={formData.name} onChange={handleChange} required /></td>
                                    </tr>
                                    <tr>
                                        <td className='p-4 flex justify-end'><label><span className='text-red-500 font-bold pr-1'>*</span>Email:</label></td>
                                        <td><input type="email" name="email" className='border p-[4px] rounded-sm hover:border-blue-400 focus:outline-none focus:border-blue-500' value={formData.email} onChange={handleChange} required /></td>
                                    </tr>
                                    <tr>
                                        <td className='p-4 flex justify-end'><label><span className='text-red-500 font-bold pr-1'>*</span>Phone:</label></td>
                                        <td><input type="text" name="phone" className='border p-[4px] rounded-sm hover:border-blue-400 focus:outline-none focus:border-blue-500' value={formData.phone} onChange={handleChange} required /></td>
                                    </tr>
                                    <tr>
                                        <td className='p-4 flex justify-end'><label><span className='text-red-500 font-bold pr-1'>*</span>Website:</label></td>
                                        <td><input type="text" name="website" className='border p-[4px] rounded-sm hover:border-blue-400 focus:outline-none focus:border-blue-500' value={formData.website} onChange={handleChange} required /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="buttons mt-5 flex justify-end border-t-[1px] border-gray-400 px-4 py-2 text-[12px]">
                                <button type="button" className="border border-gray-400 w-[70px] mr-2 rounded-md p-[4px] hover:text-blue-400 hover:border-blue-500" onClick={onClose}>cancel</button>
                                <button type="submit" className='border bg-blue-500 text-white w-[50px] rounded-md hover:bg-blue-400 p-[4px]'>ok</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
