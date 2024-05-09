import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Popup from 'reactjs-popup';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tabs as AntTabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { FaShippingFast, FaCheck } from 'react-icons/fa';

function StatusButton() {
  const [status, setStatus] = useState('');

  return (
    status === '' ? (
      <>
        <div className="text-[#00A66C] hover:text-green-800 font-bold mr-2 cursor-pointer" onClick={() => {
          if (window.confirm('Chấp nhận?')) {
            setStatus('Accepted');
          }
        }}>
          <FaCheck className="inline-block" size={12} />
        </div>
        <div className="text-red-500 hover:text-red-800 font-bold mr-2 cursor-pointer" onClick={() => {
          if (window.confirm('Từ chối?')) {
            setStatus('Rejected');
          }
        }}>
          X
        </div>
      </>
    ) : (
      <div>{status}</div>
    )
  );
}

const Journal = ({ isAdmin }) => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  const navigate = useNavigate();

  const [openReviewBill, setOpenReviewBill] = useState(false);
  const closeModalReviewBill = () => {
    setOpenReviewBill(false);
  };
  const { TabPane } = Tabs;

  const [searchTerm, setSearchTerm] = useState("");

  const [status, setStatus] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const [weight, setWeight] = useState(0);

  const [shipmentsCreateData, setShipmentsCreateData] = useState({
    sender_name: '',
    sender_phone: '',
    sender_address: '',
    sender_city_id: 0,
    receiver_name: '',
    receiver_phone: '',
    receiver_address: '',
    receiver_city_id: 0,
    type: '',
    description: '',
    price_item: 0,
    extra_letter: '',
    special_service: '',
    guide: '',
    weight: 0,
    weight_convert: 0,
    extra_cost: 0,
    total_cost: 0,
    cod: 0,
    extra_receive: 0,
  });

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      weight_convert: event.target.value
    });
  };

  const [surcharges, setSurcharges] = useState('');
  const [calculatedValue, setCalculatedValue] = useState('');

  const [warehousesGet, setWarehousesGet] = useState(null);
  const [shipments, setShipments] = useState(null);


  let warehousesGetData = [];
  if (warehousesGet) {
    warehousesGetData = warehousesGet;
  };

  let data = [];
  if (shipments) {
    data = shipments;
  };

  const handleSurchargesChange = (event) => {
    let value = event.target.value;
    value = value.replace(/,/g, ''); // remove existing commas
    value = Number(value);
    setCalculatedValue(value);
    if (!isNaN(value)) { // check if the input is a number
      value = value.toLocaleString(); // format with thousands separators
      setSurcharges(value);
    }
    setShipmentsCreateData({
      ...shipmentsCreateData,
      extra_cost: event.target.value
    });
  };

  const handleCalculatedValueChange = (event) => {
    let value = event.target.value;
    value = Number(value) + weight * 2;
    setCalculatedValue(value.toLocaleString());
  };

  const [cod, setCod] = useState('');
  const [surcharges2, setSurcharges2] = useState('');
  const handleInputChange = (event, setInput) => {
    let value = event.target.value;
    value = value.replace(/,/g, ''); // remove existing commas
    value = Number(value); // convert to number
    if (!isNaN(value)) { // check if the input is a number
      value = value.toLocaleString(); // format with thousands separators
      setInput(value);
    }
    const tCod = cod;
    const tSurcharges2 = surcharges2;
    setShipmentsCreateData({
      ...shipmentsCreateData,
      cod: tCod !== '' ? tCod : shipmentsCreateData.cod,
      extra_receive: tSurcharges2 !== '' ? tSurcharges2 : shipmentsCreateData.extra_receive
    });
  };

  const codNumber = Number(cod.replace(/,/g, ''));
  const surchargesNumber = Number(surcharges2.replace(/,/g, ''));

  const total = isNaN(codNumber + surchargesNumber) ? 0 : codNumber + surchargesNumber;


  const [searchOption, setSearchOption] = useState('senderPhone');

  const [activeTab, setActiveTab] = useState("1");

  const [openDetail, setOpenDetail] = useState({});

  const togglePopup = (id) => {
    setOpenDetail(prevOpen => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };



  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = React.useMemo(() => {
    let result = sortedData;
    switch (activeTab) {
      case "2":
        result = result.filter(item => item.status === "Pending");
        break;
      case "3":
        result = result.filter(item => item.status === "In Progress");
        break;
      case "4":
        result = result.filter(item => item.status_text === "In warehouse");
        break;
      case "5":
        result = result.filter(item => item.status === "Completed");
        break;
      case "6":
        result = result.filter(item => item.status === "Cancelled");
        break;
      case "7":
        result = result.filter(item => item.status === "Returned");
        break;
      default:
        break;
    }
    if (searchTerm) {
      if (searchTerm && searchOption === 'id') {
        result = result.filter(item => item.tracking_number.toString().includes(searchTerm));
      } else if (searchTerm && searchOption === 'senderPhone') {
        result = result.filter(item => item.sender_phone.toString().includes(searchTerm));
      }
    } else {
      result = result.filter(item => item.sender_phone.toString() === phoneNumber);
    }
    return result;
  }, [sortedData, activeTab, searchTerm, phoneNumber]);

  const handleSearch = () => {
    const results = data.filter(item => item.property && item.property.includes(searchTerm));
    if (results.length > 0) {
      setSearchTerm("");
      navigate('/admin/order');
    }
  };

  const handleSearchPhoneNumber = () => {
    const results = data.filter(item => item.sender_phone && item.sender_phone.includes(phoneNumber));
    if (results.length > 0) {
      setPhoneNumber("");
      navigate('/admin/order');
    }
  };

  const handInputShipmentsCreateChange = (event) => {
    setShipmentsCreateData({
      ...shipmentsCreateData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitShipmentsCreate = async (event) => {
    event.preventDefault();
    let updatedType = "";
    if (isDocumentChecked && isGoodsChecked) {
      updatedType = "Tài liệu, Hàng hóa";
    } else if (isDocumentChecked) {
      updatedType = "Tài liệu";
    } else if (isGoodsChecked) {
      updatedType = "Hàng hóa";
    }
    setShipmentsCreateData({
      ...shipmentsCreateData,
      type: updatedType
    });
  };

  const [senderName, setSenderName] = useState('');
  const [senderDetailAddress, setSenderDetailAddress] = useState('');
  const [senderPhoneCreated, setSenderPhoneCreated] = useState('');
  const [senderProvince, setSenderProvince] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverDetailAddress, setReceiverDetailAddress] = useState('');
  const [receiverPhoneCreated, setReceiverPhoneCreated] = useState('');
  const [receiverProvince, setReceiverProvince] = useState('');

  const handleSenderNameChange = (event) => {
    setSenderName(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      sender_name: event.target.value
    });
  }
  const handleSenderDetailAddressChange = (event) => {
    setSenderDetailAddress(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      sender_address: event.target.value
    });
  }
  const handleSenderPhoneCreatedChange = (event) => {
    setSenderPhoneCreated(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      sender_phone: event.target.value
    });
  }
  const handleSenderProvinceChange = (event) => {
    setSenderProvince(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      sender_city_id: event.target.value
    });
  }
  const handleReceiverNameChange = (event) => {
    setReceiverName(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      receiver_name: event.target.value
    });
  }
  const handleReceiverDetailAddressChange = (event) => {
    setReceiverDetailAddress(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      receiver_address: event.target.value
    });
  }
  const handleReceiverPhoneCreatedChange = (event) => {
    setReceiverPhoneCreated(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      receiver_phone: event.target.value
    });
  }
  const handleReceiverProvinceChange = (event) => {
    setReceiverProvince(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      receiver_city_id: event.target.value
    });
  }


  const resetState = () => {
    setPhoneNumber('');
    setWeight(0);
    setSurcharges('');
    setCalculatedValue('');
    setCod('');
    setSurcharges2('');
    setSenderName('');
  };

  const closeModalDetail = (id) => {
    setOpenDetail(prevOpen => ({ ...prevOpen, [id]: false }));
  };
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
    // resetState();
  };

  const [isDocumentChecked, setDocumentChecked] = useState(false);
  const [isGoodsChecked, setGoodsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [dateTime, setDateTime] = useState('');

  const handleClick = () => {
    setDateTime(new Date().toLocaleString());
    setOpenReviewBill((o) => !o);
  };

  const [click, setClick] = useState('');
  return (<>
    {isAdmin ? (
      <>
        <div className="w-4/5" style={{ margin: '0 auto' }}>
          <div className='h-screen pt-32 w-full' >
            <div className="border rounded border-box  text-brand text-lg  p-8" style={{ backgroundColor: 'rgba(242, 245, 247, 0.7)' }}>
              <div className="flex justify-between items-center" style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '30px', marginRight: '20px' }}>
                <h1 >Theo dõi đơn hàng</h1>
                <button className=" bg-[#00A66C] hover:bg-green-800 text-white font-bold py-2 px-4 rounded" onClick={() => setOpen(o => !o)}>
                  +
                </button>
                <Popup open={open} closeOnDocumentClick onClose={closeModal} position="center center">
                  <div className="cardview rounded-3xl border-box p-8" style={{ height: '100%', width: '50vw', backgroundColor: 'white', color: 'grey' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '26px', fontWeight: 'bold', color: '#035a30' }}>
                      Tạo đơn hàng mới
                    </div>
                    <div className="flex justify-between mt-8 mb-2">
                      <div className="flex justify-between w-full">
                        <div >
                          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#164176' }}>
                            | Người gửi
                          </div>
                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="full-name">Họ tên</label>
                          </div>
                          <div>
                            <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg  focus:border-gray-500" id="full-name" type="text" placeholder="Nhập họ tên" value={senderName} onChange={handleSenderNameChange} />
                          </div>
                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="province">Tỉnh / Thành phố</label>
                          </div>
                          <select className="w-full border border-gray-400 bg-white p-2  rounded-lg focus:border-gray-500" id="sender_province" value={senderProvince} onChange={handleSenderProvinceChange}>
                            <option value="">Chọn tỉnh / thành phố</option>
                            {warehousesGetData.map((item) => (
                              <option key={item.id} value={item.id}>{item.location}</option>
                            ))}
                          </select>
                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="phone-number">Số điện thoại</label>
                          </div>
                          <div>
                            <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg focus:border-gray-500" id="phone-number" type="text" value={senderPhoneCreated} onChange={handleSenderPhoneCreatedChange} placeholder="Nhập số điện thoại" />
                          </div>

                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="phone-number">Địa chỉ chi tiết</label>
                          </div>
                          <div>
                            <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg focus:border-gray-500" id="phone-number" type="text" placeholder="Nhập địa chỉ chi tiết" value={senderDetailAddress} onChange={handleSenderDetailAddressChange} />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between w-full">
                        <div >
                          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#164176' }}>
                            | Người nhận
                          </div>
                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="full-name">Họ tên</label>
                          </div>
                          <div>
                            <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg  focus:border-gray-500" id="full-name" type="text" placeholder="Nhập họ tên" value={receiverName} onChange={handleReceiverNameChange} />
                          </div>
                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="province">Tỉnh / Thành phố</label>
                          </div>
                          <select className="w-full border border-gray-400 bg-white p-2  rounded-lg focus:border-gray-500" id="receiver_province" value={receiverProvince} onChange={handleReceiverProvinceChange}>
                            <option value="">Chọn tỉnh / thành phố</option>
                            {warehousesGetData.map((item) => (
                              <option key={item.id} value={item.id}>{item.location}</option>
                            ))}
                          </select>
                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="phone-number">Số điện thoại</label>
                          </div>
                          <div>
                            <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg focus:border-gray-500" id="phone-number" type="text" placeholder="Nhập số điện thoại" value={receiverPhoneCreated} onChange={handleReceiverPhoneCreatedChange} />
                          </div>


                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="phone-number">Địa chỉ chi tiết</label>
                          </div>
                          <div>
                            <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg focus:border-gray-500" id="phone-number" type="text" placeholder="Nhập địa chỉ chi tiết" value={receiverDetailAddress} onChange={handleReceiverDetailAddressChange} />
                          </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#164176' }}>
                          | Thông tin đơn hàng
                        </div>

                        <div className="font-bold text-gray-600 text-xs uppercase mt-2 ">Loại hàng gửi</div>
                        <div className="flex justify-between w-full mb-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" checked={isDocumentChecked}
                              onChange={() => setDocumentChecked(!isDocumentChecked)} />
                            <span className="ml-2">Tài liệu</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" checked={isGoodsChecked}
                              onChange={() => setGoodsChecked(!isGoodsChecked)} />
                            <span className="ml-2">Hàng hóa</span>
                          </label>
                        </div>
                        <div>
                          <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="phone-number">Nội dung bưu gửi</label>
                        </div>
                        <div>
                          <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg focus:border-gray-500" id='description' name='description' value={shipmentsCreateData.description} onChange={handInputShipmentsCreateChange} type="text" placeholder="Nội dung trị giá bưu gửi" />
                        </div>
                        <div>
                          <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="phone-number">Trị giá</label>
                        </div>
                        <div>
                          <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg focus:border-gray-500" id='price_item' name='price_item' value={shipmentsCreateData.price_item} onChange={handInputShipmentsCreateChange} type="text" placeholder="Nhập trị giá bưu gửi" />
                        </div>
                        <div>
                          <label className="font-bold text-gray-600 text-xs uppercase" htmlFor="phone-number">Giấy tờ đính kèm</label>
                        </div>
                        <div>
                          <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg focus:border-gray-500" id='extra_letter' name='extra_letter' value={shipmentsCreateData.extra_letter} onChange={handInputShipmentsCreateChange} type="text" placeholder="Giấy tờ đính kèm" />
                        </div>


                      </div>
                    </div>
                    <div className="border-b border-gray-400 mt-auto  mt-2"></div>
                    <div className="flex justify-between space-x-12">
                      <div>
                        <div className="font-bold text-gray-600 text-xs uppercase mt-2 ">Dịch vụ đặc biệt</div>

                        <div>
                          <input className="w-full border border-gray-400 p-2 appearance-none rounded-lg focus:border-gray-500" id='special_service' name='special_service' value={shipmentsCreateData.special_service} onChange={handInputShipmentsCreateChange} type="text" placeholder="Dịch vụ đặc biệt/Cộng thêm" />
                        </div>
                        <div className="font-bold text-gray-600 text-xs uppercase mt-2 mb-2">Chỉ dẫn của người gửi khi không phát được bưu gửi</div>
                        <div className="grid grid-cols-1 gap-2">
                          <label className="flex items-center">
                            <input type="radio" name="options" className="form-radio" value='1' onChange={handleChange} />
                            <span className="ml-2">Chuyển hoàn ngay</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="options" className="form-radio" value='2' onChange={handleChange} />
                            <span className="ml-2">Gọi điện cho người gửi/BC gửi</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="options" className="form-radio" value='3' onChange={handleChange} />
                            <span className="ml-2">Chuyển hoàn trước ngày</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="options" className="form-radio" value='4' onChange={handleChange} />
                            <span className="ml-2">Chuyển hoàn khi hết thời gian lưu trữ</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="options" className="form-radio" value='5' onChange={handleChange} />
                            <span className="ml-2">Hủy</span>
                          </label>
                        </div>
                        <div className="font-bold text-gray-600 text-xs uppercase ">Khối lượng</div>
                        <div className="flex  w-full items-end">
                          <div>Khối lượng thực tế:</div>
                          <input className="text-right w-1/3 h-full border border-gray-400 p-1 appearance-none rounded-lg focus:border-gray-500 ml-auto mr-2" id='weight' name='weight' value={shipmentsCreateData.weight} onChange={handInputShipmentsCreateChange} />
                          kg
                        </div>
                        <div className="flex  w-full items-end mt-1">
                          <div>Khối lượng quy đổi:</div>
                          <input className="text-right w-1/3 h-full border border-gray-400 p-1 appearance-none rounded-lg focus:border-gray-500 ml-auto mr-2"
                            type="number" onChange={handleWeightChange} />
                          kg
                        </div>
                      </div>
                      <div style={{ width: '40%' }}>

                        <div className="font-bold text-gray-600 text-xs uppercase mt-2 ">Cước</div>
                        <div className="flex  justify-between">
                          Cước chính:
                          <div className="flex"><div className="mr-5">{(3150 * weight).toLocaleString()}</div>
                            <div>đ</div></div>
                        </div>
                        <div className="flex  justify-between">
                          Phụ phí:
                          <input
                            type="text"
                            value={surcharges}
                            className="mr-4 text-right w-1/3 h-full border border-gray-400 p-1 appearance-none rounded-lg focus:border-gray-500 ml-auto"
                            onChange={handleSurchargesChange} placeholder="0" />
                          đ
                        </div>
                        <div className="border-t border-gray-400 mt-3 "></div>
                        <div className="flex  justify-between items-center text-blue-800 font-bold">
                          <div className="uppercase mt-2 ">Tổng cước (Gồm Vat):</div>
                          <div className="flex"><div className="mr-5" >{((3150 * weight + calculatedValue) * 1.08).toLocaleString()}</div>
                            <div>đ</div></div>
                        </div>
                        <div>
                          <div>
                            <label className="font-bold text-gray-600 text-xs uppercase mt-16" htmlFor="phone-number">Thu của người nhận</label>
                          </div>
                          <div className="flex justify-between">
                            COD:
                            <input
                              type="text"
                              value={cod}
                              className="mr-4 text-right w-1/3 h-full border border-gray-400 p-1 appearance-none rounded-lg focus:border-gray-500 ml-auto"
                              onChange={(event) => handleInputChange(event, setCod)}
                              placeholder="0" />
                            đ
                          </div>
                          <div className="flex justify-between mt-1">
                            Phụ thu
                            <input
                              value={surcharges2}
                              type="text"
                              className="mr-4 text-right w-1/3 h-full border border-gray-400 p-1 appearance-none rounded-lg focus:border-gray-500 ml-auto"
                              onChange={(event) => handleInputChange(event, setSurcharges2)} placeholder="0"
                            />
                            đ
                          </div>
                          <div className="border-t border-gray-400 mt-3"></div>
                          <div className="flex  justify-between font-bold text-blue-800">
                            <div className=" uppercase font-bold mt-2 ">Tổng Thu:</div>
                            <div className="flex"><div className="mr-5" >{total.toLocaleString()}</div>
                              <div>đ</div></div>
                          </div>
                        </div>

                      </div>


                    </div>

                    <div className="flex justify-between  mt-8">
                      <button className=" bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" onClick={() => { closeModal(); resetState() }}>
                        Hủy
                      </button>
                      <button className=" bg-[#00A66C] hover:bg-green-800 text-white font-bold py-2 px-4 rounded" onClick={() => {
                        if (window.confirm('Xác nhận tạo đơn?')) {
                          setOpenReviewBill(o => !o);
                        }
                        handleSubmitShipmentsCreate();
                      }}>
                        Tạo đơn
                      </button>
                    </div>

                  </div>
                </Popup>
              </div>
              <div className="flex items-center mb-8 w-full" style={{ fontSize: '16px' }}>
                <div className="h-full">
                  <select className=" bg-gray-300 p-1 border rounded-tl rounded-bl border-black" onChange={e => setSearchOption(e.target.value)}>
                    <option value="senderPhone" >SĐT người gửi</option>
                    <option value="id">Mã vận đơn</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    className="border border-black h-full p-1 rounded-tr rounded-br"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && searchTerm) {
                        handleSearch();
                      }
                    }}
                  />
                </div>
              </div>
              <AntTabs defaultActiveKey="1" className="fullWidthTabs w-full flex justify-between items-center " onChange={setActiveTab}>
                <TabPane tab="Tất cả" key="1" className="flex-1 text-center w-full">
                </TabPane>
                <TabPane tab="Chờ xử lý" key="2" className="flex-1 text-center w-full">
                </TabPane>
                <TabPane tab="Đang vận chuyển" key="3" className="flex-1 text-center w-full">
                </TabPane>
                <TabPane tab="Lưu kho" key="4" className="flex-1 text-center w-full" />
                <TabPane tab="Đã giao" key="5" className="flex-1 text-center w-full" />
                <TabPane tab="Đã hủy" key="6" className="flex-1 text-center w-full" />
                <TabPane tab="Hoàn hàng" key="7" className="flex-1 text-center w-full" />
              </AntTabs>

              <table className="w-full border-collapse" style={{ fontSize: '15px' }}>
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('tracking_number')}>
                      {sortConfig && sortConfig.key === 'tracking_number' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Mã vận đơn
                    </th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('created_at')}>
                      {sortConfig && sortConfig.key === 'created_at' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Ngày gửi</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('status')}>
                      {sortConfig && sortConfig.key === 'status' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Status</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('warehouse')}>
                      {sortConfig && sortConfig.key === 'warehouse' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Kho hiện tại</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('updated_at')}>
                      {sortConfig && sortConfig.key === 'updated_at' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Kho chuyển đến</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('sender_phone')}>
                      {sortConfig && sortConfig.key === 'sender_phone' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      SĐT người gửi</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('receiverPhone')}>
                      {sortConfig && sortConfig.key === 'receiverPhone' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      SĐT người nhận</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('receiverPhone')}>
                      {sortConfig && sortConfig.key === 'receiverPhone' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Action</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" >

                      Detail</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.tracking_number}</td>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.created_at}</td>
                        <td className="border border-gray-800 p-2 text-center">{item.status_text}</td>
                        <td className="border border-gray-800 p-2">{item.current_warehouse}</td>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.next_delivery}</td>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.sender_phone}</td>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.receiver_phone}</td>
                        <td className="border border-gray-800 p-2 text-center">
                          <div className="flex justify-center items-center">
                            <StatusButton item={filteredData.find(item => item.tracking_number)} />
                          </div>
                        </td>
                        <td className="border border-gray-800 p-2 text-center cursor-pointer">
                          <AiOutlineEye className="inline-block" onClick={() => togglePopup(item.id)} />
                          <Popup open={openDetail[item.id]} closeOnDocumentClick onClose={() => closeModalDetail(item.id)} position="center center">
                            <button className="absolute top-0 right-0 m-4 font-bold text-gray-600 text-3xl" onClick={() => closeModalDetail(item.id)}>X</button>
                            <div className="cardview rounded-xl border-box p-8" style={{ height: '100%', width: '40vw', backgroundColor: 'white', color: 'grey' }}>
                              <div style={{ display: 'flex', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: '#035a30', marginBottom: '30px' }}>
                                Thông tin chi tiết đơn hàng
                              </div>
                              <div className="text-sm">
                                <div className="flex items-end space-x-2">
                                  <div className="font-bold text-gray-600 uppercase">Mã vận đơn: </div>
                                  <div className="">{item.tracking_number}</div>
                                </div>
                                <div className="mt-4">
                                  <div className="mt-4">
                                    <table className="w-full border-0">
                                      <thead>
                                        <tr>
                                          <th className="font-bold text-blue-900 uppercase text-base border-2 p-2 border-gray-200 bg-gray-300">Bên gửi</th>
                                          <th className="font-bold text-blue-900 uppercase text-base border-2 p-2 border-gray-200 bg-gray-300">Bên nhận</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="bg-yellow-50 border-2 p-2 border-gray-200">
                                          <td className="py-2 border-2 p-2">Người gửi: {item.sender_name}</td>
                                          <td className="py-2 border-2 p-2">Người nhận: {item.receiver_name}</td>
                                        </tr>
                                        <tr className="bg-white border-2 p-2 border-gray-200">
                                          <td className="py-2 border-2 p-2">Số điện thoại: {item.sender_phone}</td>
                                          <td className="py-2 border-2 p-2">Số điện thoại: {item.receiver_phone}</td>
                                        </tr>
                                        <tr className="bg-yellow-50 border-2 p-2 border-gray-200">
                                          <td className="py-2 border-2 p-2">Địa chỉ: {item.sender_address}</td>
                                          <td className="py-2 border-2 p-2">Địa chỉ: {item.receiver_address}</td>
                                        </tr>
                                        <tr className="bg-white border-2 p-2 border-gray-200">
                                          <td className="py-2 border-2 p-2">Ngày gửi: {item.created_at}</td>
                                          <td className="py-2 border-2 p-2">Thời gian cập nhật: {item.updated_at}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className="flex items-end space-x-2 mt-4">
                                  <div className="font-bold text-gray-600 uppercase">Trạng thái: </div>
                                  <div className="">{item.status_text}</div>
                                </div>
                                <div className="flex items-end space-x-2">
                                  <div className="font-bold text-gray-600 uppercase">Kho hiện tại: </div>
                                  <div className="">{item.current_warehouse}</div>
                                </div>
                              </div>
                            </div>
                          </Popup>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border border-gray-400 p-6 text-center text-l" colSpan="9">Không tìm thấy đơn hàng nào...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Popup open={openReviewBill} onOpen={closeModal} closeOnDocumentClick onClose={() => { closeModalReviewBill(); resetState() }} position="center center">
            <div className="cardview border-box pt-8 pl-16 pr-16 pb-8 " style={{ height: '100%', width: '60vw', backgroundColor: '#f9eedc', color: 'grey', fontSize: '14px' }}>
              <div className="flex justify-between items-center pl-40 pr-40" >
                <div className="flex items-center space-x-2">
                  <div className='flex gap-2 cursor-pointer' >
                    <span><FaShippingFast color={'#00A66C'} size={50} /></span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full space-x-4 mt-2">
                <div style={{ width: '48%' }}>
                  <div className="font-bold text-gray-600">1. Họ tên địa chỉ người gửi:</div>
                  <div style={{ height: '60px' }}>
                    <div>{senderName}</div>
                    <div>{senderDetailAddress} </div>
                  </div>
                  <div className="flex space-x-8"><div className='font-bold'>Điện thoại: </div>
                    <div>{senderPhoneCreated}</div></div>
                  <div className='flex'>
                    <div className="flex space-x-2 w-1/2"><div className='font-bold'>Mã khách hàng: </div>
                      <div></div></div>
                    <div className="flex space-x-2 w-1/2"><div className='font-bold'>Mã bưu chính: </div>
                      <div>{senderProvince}</div></div>
                  </div>
                </div>
                <div className='h-full' style={{ width: '50%' }}>
                  <div className="font-bold text-gray-600">2. Họ tên địa chỉ người nhận:</div>
                  <div style={{ height: '60px' }}>
                    <div>{receiverName}</div>
                    <div>{receiverDetailAddress}</div></div>
                  <div className="flex space-x-8"><div className='font-bold mt-auto'>Điện thoại: </div>
                    <div>{receiverPhoneCreated}</div></div>
                  <div className='flex'>
                    <div className="flex space-x-2 w-1/2"><div className='font-bold'>Mã khách hàng: </div>
                      <div></div></div>
                    <div className="flex space-x-2 w-1/2"><div className='font-bold'>Mã bưu chính: </div>
                      <div>{receiverProvince}</div></div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-400 mt-2 mb-2"></div>
              <div className="flex justify-between w-full space-x-4 mt-2">
                <div style={{ width: '48%' }}>
                  <div className="font-bold text-gray-600">3. Loại hàng gửi: </div>
                  <div className="flex justify-between pl-16 pr-16">
                    <div className="flex items-center">
                      <input type="checkbox" className="form-checkbox" checked={isDocumentChecked} disabled />
                      <span className="ml-2">Tài liệu</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="form-checkbox" checked={isGoodsChecked} disabled />
                      <span className="ml-2">Hàng hóa</span>
                    </div>
                  </div>
                  <div className="font-bold text-gray-600">4. Nội dung bưu gửi: </div>
                  <div className="flex space-x-8"><div className='font-bold'>Nội dung: </div>
                    <div>{shipmentsCreateData.description}</div></div>
                  <div className='flex'></div>
                  <div className='flex'>
                    <div className="flex space-x-2 w-1/2"><div className='font-bold'>Trị giá: </div>
                      <div>{shipmentsCreateData.price_item}</div></div>
                  </div>
                  <div className="flex space-x-8"><div className='font-bold'>Giấy tờ đính kèm:</div>
                    <div>{shipmentsCreateData.extra_letter}</div></div>
                  <div className="border-b border-gray-400 mt-2 mb-2"></div>
                  <div className="font-bold text-gray-600 h-24">5. Dịch vụ đặc biệt/Cộng thêm: </div>
                  <div className="border-b border-gray-400 mt-2 mb-2">{shipmentsCreateData.special_service}</div>
                  <div className="font-bold text-gray-600">6. Chỉ dẫn của người gửi khi không phát được bưu gửi: </div>
                  <div className="grid grid-cols-2 gap-2 text-xs w-full">
                    <label className="flex items-center">
                      <input type="radio" name="options" className="form-radio" readOnly disabled value='1' checked={selectedOption === '1'} />
                      <span className="ml-2">Chuyển hoàn ngay</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="options" className="form-radio" readOnly disabled value='2' checked={selectedOption === '2'} />
                      <span className="ml-2">Gọi điện cho người gửi/BC gửi</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="options" className="form-radio" readOnly disabled value='3' checked={selectedOption === '3'} />
                      <span className="ml-2">Chuyển hoàn trước ngày</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="options" className="form-radio" readOnly disabled value='4' checked={selectedOption === '4'} />
                      <span className="ml-2">Chuyển hoàn khi hết thời gian lưu trữ</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="options" className="form-radio" readOnly disabled value='5' checked={selectedOption === '5'} />
                      <span className="ml-2">Hủy</span>
                    </label>
                  </div>
                  <div className="border-b border-gray-400 mt-2 mb-2"></div>
                  <div className="font-bold text-gray-600">7. Cam kết của người gửi: </div>
                  <div style={{ fontSize: '13px' }}>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm ,cấm gủi. Trường hợp không phát được hãy thực hiện chỉ dẫn tại mục 6, tôi sẽ trả cước chuyển hoàn.</div>
                  <div className="flex mt-2">
                    <div style={{ width: '50%' }}>
                      <div className="font-bold text-gray-600">8. Ngày giờ gửi: </div>
                      <div className="mt-4 text-gray-600">{dateTime} </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-600">Chữ ký người gửi </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: '50%' }}>
                  <div className="justify-between" style={{ display: 'flex' }}>
                    <div style={{ width: '48%' }}>
                      <div className="font-bold text-gray-600">9. Cước: </div>
                      <div className="flex justify-between">
                        a. Cước chính:
                        <div className="flex"><div className="mr-5">{(3150 * weight).toLocaleString()}</div>
                          <div>đ</div></div>
                      </div>
                      <div className="flex justify-between">
                        b. Phụ phí:
                        <div className="flex"><div className="mr-5">{(surcharges).toLocaleString()}</div>
                          <div>đ</div></div>
                      </div>
                      <div className="flex justify-between font-bold ">
                        <div className="uppercase ">Tổng cước:</div>
                        <div className="flex"><div className="mr-5">{((3150 * weight + calculatedValue) * 1.08).toLocaleString()}</div>
                          <div>đ</div></div>
                      </div>
                      <div className="border-b border-gray-400 mt-16 mb-2"></div>
                      <div className="font-bold text-gray-600">11. Thu của người nhận: </div>
                      <div className="flex justify-between">
                        a. COD:
                        <div className="flex"><div className="mr-5">{cod.toLocaleString()}</div>
                          <div>đ</div></div>
                      </div>
                      <div className="flex justify-between">
                        b. Phụ thu:
                        <div className="flex"><div className="mr-5">{surcharges2.toLocaleString()}</div>
                          <div>đ</div></div>
                      </div>
                      <div className="flex justify-between font-bold ">
                        <div className="uppercase ">Tổng Thu:</div>
                        <div className="flex"><div className="mr-5">{total.toLocaleString()}</div>
                          <div>đ</div></div>
                      </div>

                    </div>
                    <div style={{ width: '48%' }}>
                      <div className="font-bold text-gray-600">10. Khối lượng: </div>
                      <div className="flex  w-full items-end justify-between">
                        <div>Khối lượng thực tế:</div>
                        <div className="flex">{shipmentsCreateData.weight}<div className="mr-2"></div>
                          <div>kg</div></div>
                      </div>
                      <div className="flex  w-full items-end mt-1 justify-between">
                        <div>Khối lượng quy đổi:</div>
                        <div className="flex"><div className="mr-2">{weight}</div>
                          <div>kg</div></div>
                      </div>
                      <div className="border-b border-gray-400 mt-2 mb-2"></div>
                      <div className="font-bold text-gray-600">12. Chú dẫn nghiệp vụ: </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-400 mt-12 mb-2"></div>
                  <div className="justify-between" style={{ display: 'flex' }}>
                    <div style={{ width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div className="font-bold text-gray-600">13. Bưc cục chấp nhận: </div>
                        Chữ ký GDV nhận
                      </div>
                      <div style={{ borderRadius: '50%', width: '100px', height: '100px', marginTop: '15px' }}>
                      </div>
                      <div className="mt-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div className="mt-8 text-gray-600">GDV: Heheheheheh </div></div>
                    </div>
                    <div style={{ width: '48%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <div className="font-bold text-gray-600">14. Ngày giờ nhận: </div>
                      <div className="font-bold">......h....../......../......../20....</div>
                      <div className="text-gray-600">Người nhận/Người được ủy quyền </div>
                      <div className='text-italic text-gray-600'>(Ký tên, ghi rõ họ tên)</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Popup>
        </div>
      </>
    ) : (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Journals" prevLocation={prevLocation} />
        <div className="pb-10">
          <h1 className="max-w-[600px] text-base text-lightText mb-2">
            <span className="text-primeColor font-semibold text-lg">Shop</span>{" "}
            humm
          </h1>
          <Link to="/shop">
            <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>)}</>
  );
};

export default Journal;