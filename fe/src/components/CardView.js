import React, { useState, useRef, useEffect } from 'react';

function highlightMatches(text, query) {
    if (!text || !query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: yellow;">$1</mark>');
}

const CardView = ({ image, name, id, phone, email, address, membership: initialMembership, username, searchQuery, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState(initialMembership);
    const popupRef = useRef(null);

    const deleteAdmin = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admins/admin_delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "admin_username": username }),
            });
            const data = await res.json(); // Sửa từ res.data() thành res.json()
            console.log('Admin deleted:', data);
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    const handleDeleteClick = () => {
        onDelete(id);
        deleteAdmin();
    };

    const handleEditClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleMembershipChange = (selectedMembership) => {
        setSelectedMembership(selectedMembership);
    };

    const handleClickOutsidePopup = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            handleClosePopup();
        }
    };

    useEffect(() => {
        // Thêm một event listener để kiểm tra khi click ra ngoài popup
        document.addEventListener("mousedown", handleClickOutsidePopup);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsidePopup);
        };
    }, []);

    const handleSaveClick = async () => {
        console.log('Saving admin:', id, name, phone, email, address);
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admins/admin_update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "admin_id": id,
                    "admin_name": name,
                    "admin_phonenumber": phone,
                    "admin_email": email,
                    "admin_address": address,
                }),
            });
            window.location.reload();
            if (!res.ok) {
                throw new Error("Update failed");
            }
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="border rounded-lg p-4">
            <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
            <h2 className="text-xl font-semibold text-center mb-2 truncate" dangerouslySetInnerHTML={{ __html: highlightMatches(name, searchQuery) }}></h2>
            <button className={`block mx-auto font-bold text-xs text-center items-center rounded-full px-4 py-2 text-center mb-4 ${selectedMembership === 'Gold' ? 'bg-yellow-500' : selectedMembership === 'Silver' ? 'bg-gray-300' : 'bg-blue-200'}`}>{selectedMembership}</button>
            <div className="mt-4 text-xs">
                <p className="truncate"><strong>ID:</strong> {id}</p>
                <p className="truncate"><strong>Phone:</strong> {phone}</p>
                <p className="truncate"><strong>Email:</strong> {email}</p>
                <p className="truncate"><strong>Address:</strong> {address}</p>
            </div>
            <div className="mt-4 flex justify-between">
                <button onClick={handleEditClick} className="bg-yellow-500 text-xs hover:bg-yellow-700 text-white py-2 px-4 rounded">Edit</button>
                <button onClick={handleDeleteClick} className="bg-red-700 text-xs hover:bg-red-900 text-white py-2 px-4 rounded">Delete</button>
            </div>
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-1/5 bg-white p-4 rounded" ref={popupRef}>
                        <h2 className='text-2xl font-bold text-center'>Editing Admin</h2>

                        <label>
                            ID:
                            <input type="text" defaultValue={id} disabled />
                        </label>
                        <label>
                            Name:
                            <input type="text" defaultValue={name} />
                        </label>
                        <label>
                            Phone:
                            <input type="text" defaultValue={phone} />
                        </label>
                        <label>
                            Email:
                            <input type="text" defaultValue={email} />
                        </label>
                        <label>
                            Address:
                            <input type="text" defaultValue={address} />
                        </label>
                        <label>
                            Gender:
                        </label>
                        <div className='gap-4'>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Nam"
                                checked={selectedMembership === 'Nam'}
                                onChange={() => handleMembershipChange('Nam')}
                                className='mr-2'
                            />
                            <label htmlFor="male" className='mr-6'>Nam</label>

                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Nữ"
                                checked={selectedMembership === 'Nữ'}
                                onChange={() => handleMembershipChange('Nữ')}
                                className='mr-2'
                            />
                            <label htmlFor="female" className='mr-6'>Nữ</label>

                            <input
                                type="radio"
                                id="normal"
                                name="gender"
                                value="Normal"
                                checked={selectedMembership === 'Normal'}
                                onChange={() => handleMembershipChange('Normal')}
                                className='mr-2'
                            />
                            <label htmlFor="normal">Khác</label>
                        </div>
                        <button onClick={handleSaveClick} className="bg-yellow-500 text-xs hover:bg-yellow-700 text-white py-2 px-4 rounded">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardView;
