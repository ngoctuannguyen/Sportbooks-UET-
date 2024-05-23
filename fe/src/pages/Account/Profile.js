import React, { useState } from 'react';
import { FaRegUser, FaRegAddressCard } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Row, Col } from 'antd';
import HeaderBottom from '../../components/home/Header/Header';

import './Profile.css';
import { Header } from 'antd/es/layout/layout';
import Footer from '../../components/home/Footer/Footer';

function Profile({ isAdmin }) {
  const [userInfo, setUserInfo] = useState({
    username: 'huongluong2k3',
    name: 'Lương Thị Thu Hương',
    email: 'hu*********@gmail.com',
    phone: '*******62',
    gender: 'female',
    birthDate: {
      day: '1',
      month: '1',
      year: '1990',
    },
    avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg", // placeholder for avatar image
  });

  const [selectedTab, setSelectedTab] = useState('profile');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Define state variables for the form inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Define a function to update the user's password
  // This is just a placeholder. You'll need to implement this function based on how your application manages state and interacts with your backend.
  const updateUserPassword = (newPassword) => {
    console.log('Updating password to: ' + newPassword);
    // Here you would typically make a request to your backend to update the user's password
  };

  // Define the address state variable
  const [address, setAddress] = useState('');

  // Define the updateAddress function
  const updateAddress = (newAddress) => {
    console.log('Updating address to: ' + newAddress.address);
    // Here you would typically make a request to your backend to update the user's address
  };

  function handleAddressChange(event) {
    event.preventDefault();

    if (!address) {
      alert('Address is required');
      return;
    }
    updateAddress({ address });
  }

  function handlePasswordChange(event) {
    event.preventDefault();

    // Validate the current password, new password, and confirmation
    if (currentPassword !== 11111) {
      alert('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('New password and confirmation do not match');
      return;
    }

    // If everything is valid, update the password
    updateUserPassword(newPassword);
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      birthDate: {
        ...prevState.birthDate,
        [name]: value,
      },
    }));
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(userInfo);
  };

  return (
    <div>
      <HeaderBottom />
      <div className="profile-container">
        <div className="sidebar">
          <div className="user-info">
            <img src={userInfo.avatar} alt="avatar" className="avatar" />
            <h2>{userInfo.username}</h2>
          </div>
            <ul>
              {isAdmin ? (
                <>
                  <li className={selectedTab === 'profile' ? 'active' : ''} onClick={() => setSelectedTab('profile')}>
                    <FaRegUser size={20} />
                    Hồ Sơ
                  </li>
                  <li className={selectedTab === 'password' ? 'active' : ''} onClick={() => setSelectedTab('password')}>
                    <RiLockPasswordLine size={20} />
                    Đổi Mật Khẩu
                  </li>
                </>
              ) : (
                <>
                  <li className={selectedTab === 'profile' ? 'active' : ''} onClick={() => setSelectedTab('profile')}>
                    <FaRegUser size={20} />
                    Hồ Sơ
                  </li>
                  <li className={selectedTab === 'payment' ? 'active' : ''} onClick={() => setSelectedTab('payment')}>
                    <MdPayment size={20} />
                    Hình thức thanh toán
                  </li>
                  <li className={selectedTab === 'address' ? 'active' : ''} onClick={() => setSelectedTab('address')}>
                    <FaRegAddressCard size={20} />
                    Địa Chỉ
                  </li>
                  <li className={selectedTab === 'password' ? 'active' : ''} onClick={() => setSelectedTab('password')}>
                    <RiLockPasswordLine size={20} />
                    Đổi Mật Khẩu
                  </li>
                </>
              )}
            </ul>
        </div>

        <div className="profile-form-container">
          {selectedTab === 'profile' && (
            <div>
              <div className="form-header-container">
                <h1>Hồ Sơ Của Tôi</h1>
                <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
              </div>
              <div className="form-content-container">
                <form onSubmit={handleSubmit} className='w-3/5'>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                      <label htmlFor="username">Tên đăng nhập</label>
                    </Col>
                    <Col span={12} className='form-field-label'>
                      <div id="username">{userInfo.username}</div>
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                      <label htmlFor="name">Họ và Tên</label>
                    </Col>
                    <Col span={12} className='form-field-value'>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                      <label htmlFor="email">Email</label>
                    </Col>
                    <Col span={12} className='form-field-value'>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                      <label htmlFor="phone">Số điện thoại</label>
                    </Col>
                    <Col span={12} className='form-field-value'>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                      <label>Giới tính</label>
                    </Col>
                    <Col span={12} className='form-field-label'>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={userInfo.gender === 'male'}
                          onChange={handleGenderChange}
                          style={{ marginRight: '5px' }}
                        />
                        Nam
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={userInfo.gender === 'female'}
                          onChange={handleGenderChange}
                          style={{ marginRight: '5px' }}
                        />
                        Nữ
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          checked={userInfo.gender === 'other'}
                          onChange={handleGenderChange}
                          style={{ marginRight: '5px' }}
                        />
                        Khác
                      </label>
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                      <label htmlFor='birthday'>Ngày sinh</label>
                    </Col>
                    <Col span={4} className='form-field-label'>
                      <select
                        id="day"
                        name="day"
                        value={userInfo.birthDate.day}
                        onChange={handleDateChange}
                        style={{ width: '80%' }}
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </Col>
                    <Col span={4} className='form-field-label'>
                      <select
                        id="month"
                        name="month"
                        value={userInfo.birthDate.month}
                        onChange={handleDateChange}
                        style={{ width: '80%' }}
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </Col>
                    <Col span={4} className='form-field-label'>
                      <select
                        id="year"
                        name="year"
                        value={userInfo.birthDate.year}
                        onChange={handleDateChange}
                        style={{ width: '80%' }}
                      >
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                    </Col>
                    <Col span={12}>
                      <button type="submit" className='form-submit-btn'>Lưu</button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>)}
          {selectedTab === 'password' && (
            <div>
              <div className="form-header-container">
                <h1>Đổi Mật Khẩu</h1>
                <span>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>
              </div>
              <form onSubmit={handlePasswordChange} className='w-3/5'>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                    <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
                  </Col>
                  <Col span={12} className='form-field-value'>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      onChange={handleInputChange}
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Row>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                  </Col>
                  <Col span={12} className='form-field-value'>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      onChange={handleInputChange}
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Row>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                    <label htmlFor="confirmNewPassword">Xác nhận mật khẩu mới</label>
                  </Col>
                  <Col span={12} className='form-field-value'>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      onChange={handleInputChange}
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Row>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                  </Col>
                  <Col span={12}>
                    <button type="submit" className='form-submit-btn'>Lưu</button>
                  </Col>
                </Row>
              </form>
            </div>
          )}
          {selectedTab === 'payment' && (
            <div>
              <div className="form-header-container">
                <h1>Hình thức thanh toán</h1>
                <span>Quản lý hình thức thanh toán của bạn</span>
              </div>
              <form className='w-3/5'>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                    <label htmlFor="cardNumber">Số thẻ</label>
                  </Col>
                  <Col span={12} className='form-field-value'>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                    <label htmlFor="expiryDate">Ngày hết hạn</label>
                  </Col>
                  <Col span={12} className='form-field-value'>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                    <label htmlFor="cvv">CVV</label>
                  </Col>
                  <Col span={12} className='form-field-value'>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                  </Col>
                  <Col span={12}>
                    <button type="submit" className='form-submit-btn'>Lưu</button>
                  </Col>
                </Row>
              </form>
            </div>
          )}
          {selectedTab === 'address' && (
            <div>
              <div className="form-header-container">
                <h1>Địa chỉ</h1>
              </div>
              <form onSubmit={handleAddressChange} className='w-3/5'>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                    <label htmlFor="cardNumber">Địa chỉ</label>
                  </Col>
                  <Col span={12} className='form-field-value'>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className='form-field'>
                  <Col span={12} className='form-field-label'>
                  </Col>
                  <Col span={12}>
                    <button type="submit" className='form-submit-btn'>Lưu</button>
                  </Col>
                </Row>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
