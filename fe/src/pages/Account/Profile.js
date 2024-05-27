import React, { useEffect, useState } from 'react';
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
    username: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: {
      day: '1',
      month: '1',
      year: '1990',
    },
    avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
    address: ""
  });

  const [adminInfo, setAdminInfo] = useState({
    username: localStorage.getItem('username') || '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admins/admin_detail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ admin_username: adminInfo.username }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const data = await response.json();
        setUserInfo({
          username: data.username,
          name: data.name,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
          birthDate: {
            day: '1',
            month: '1',
            year: '1990',
          },
          avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
          address: data.address,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [adminInfo.username]);

  // Admin profile
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminGender, setAdminGender] = useState('');
  const [adminAddress, setAdminAddress] = useState('');

  useEffect(() => {
    setAdminName(userInfo.name);
    setAdminEmail(userInfo.email);
    setAdminPhone(userInfo.phone);
    setAdminGender(userInfo.gender);
    setAdminAddress(userInfo.address);
  }, [userInfo]);

  const handleAdminNameChange = (e) => {
    setAdminName(e.target.value);
  };

  const handleAdminEmailChange = (e) => {
    setAdminEmail(e.target.value);
  };

  const handleAdminPhoneChange = (e) => {
    setAdminPhone(e.target.value);
  };

  const handleAdminGenderChange = (e) => {
    setAdminGender(e.target.value);
  };

  const handleAdminAddressChange = (e) => {
    setAdminAddress(e.target.value);
  };

  // Admin update profile
  const changeUserInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admins/admin_update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: adminInfo.username,
          name: adminName,
          email: adminEmail,
          address: adminAddress,
          phone: adminPhone,
          gender: adminGender,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user info');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedTab, setSelectedTab] = useState('profile');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Validate the current password, new password, and confirmation
    if (currentPassword !== '11111') {
      alert('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('New password and confirmation do not match');
      return;
    }

    // If everything is valid, update the password
    updateUserPassword(newPassword);
  };

  // Define state variables for the form inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Define a function to update the user's password
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
                        value={adminName}
                        onChange={handleAdminNameChange}
                      />
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                      <label htmlFor="email">Email</label>
                    </Col>
                    <Col span={12} className='form-field-value'>
                      <input
                        type="text"
                        id="name"
                        name="email"
                        value={adminEmail}
                        onChange={handleAdminEmailChange}
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
                        value={adminPhone}
                        onChange={handleAdminPhoneChange}
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
                          checked={adminGender === 'male'}
                          onChange={handleAdminGenderChange}
                          style={{ marginRight: '5px' }}
                        />
                        Nam
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={adminGender === 'female'}
                          onChange={handleAdminGenderChange}
                          style={{ marginRight: '5px' }}
                        />
                        Nữ
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          checked={adminGender === 'other'}
                          onChange={handleAdminGenderChange}
                          style={{ marginRight: '5px' }}
                        />
                        Khác
                      </label>
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                      <label htmlFor='address'>Địa chỉ</label>
                    </Col>
                    <Col span={12} className='form-field-value'>  
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={adminAddress}
                        onChange={handleAdminAddressChange}
                      />
                    </Col>
                  </Row>
                  <Row className='form-field'>
                    <Col span={12} className='form-field-label'>
                    </Col>
                    <Col span={12}>
                      <button type="submit" onClick={() => changeUserInfo()} className='form-submit-btn'>Lưu</button>
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
