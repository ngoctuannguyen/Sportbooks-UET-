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
  const navigate = useNavigate();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  // order list
  useEffect(() => {
    const orderList = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/order_list`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    orderList();
  }, []);
  
  const {clientName, email, messages, total, productNames, quantitys, idNumber} = location.state || {};
  console.log(location.state)

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
        </div>
      </>
    ) : (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Orders" prevLocation={prevLocation} />
        <div className="pb-10">
          <div className="" style={{ margin: '0 auto' }}>
            <div className='h-screen pt-32 w-full' >
              <div className="border rounded border-box  text-brand text-lg  p-8" style={{ backgroundColor: 'rgba(242, 245, 247, 0.7)' }}>
                <div className="flex justify-between items-center" style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '30px', marginRight: '20px' }}>
                  <h1 >Theo dõi đơn hàng</h1>
                </div>
                <div className="flex items-center mb-8 w-full" style={{ fontSize: '16px' }}>
                  <div className="h-full">
                    <select className=" bg-gray-300 p-1 border rounded-tl rounded-bl border-black" onChange={e => setSearchOption(e.target.value)}>
                      <option value="id">Mã vận đơn</option>
                      <option value="order_name" >Tên sản phẩm</option>
                      <option value="sender_phone" >SĐT người gửi</option>
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
                      <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('order_name')}>
                        {sortConfig && sortConfig.key === 'order_name' ? (
                          sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                        ) : ''}
                        Tên sản phẩm</th>
                      <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('sender_phone')}>
                        {sortConfig && sortConfig.key === 'sender_phone' ? (
                          sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                        ) : ''}
                        SĐT người gửi</th>
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
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.tracking_number}</td>
                          <td className="border border-gray-800 p-2 text-center">{item.order_name}</td>
                          <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.sender_phone}</td>
                          <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.created_at}</td>
                          <td className="border border-gray-800 p-2 text-center">{item.status_text}</td>
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
          </div>
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