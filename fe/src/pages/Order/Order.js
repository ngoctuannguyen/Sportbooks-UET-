import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Popup from 'reactjs-popup';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tabs as AntTabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { FaShippingFast, FaCheck } from 'react-icons/fa';
import './Order.css';

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

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const orderList = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/order_list`);
        const data = await response.json();
        console.log(data);
        setOrderList(data);
      } catch (error) {
        console.log(error);
      }
    };
    orderList();
  }, []);

  let data = orderList;
  console.log("dataaorderlist00", orderList);
  console.log("dataaorderlist", data);

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
    phone: '',
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


  const [surcharges, setSurcharges] = useState('');
  const [calculatedValue, setCalculatedValue] = useState('');


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



  const [searchOption, setSearchOption] = useState('phonene');

  const [activeTab, setActiveTab] = useState("1");

  const [openDetail, setOpenDetail] = useState({});

  const togglePopup = (id) => {
    setOpenDetail(prevOpen => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };



  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    console.log("sortableData", sortableData);
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
    let result = sortedData
    console.log("result", result);
    switch (activeTab) {
      case "2":
        result = result.filter(item => item.status === "Đang chờ");
        break;
      case "3":
        result = result.filter(item => item.status === "Đang vận chuyển");
        break;
      case "4":
        result = result.filter(item => item.status === "Hoàn thành");
        break;
      case "5":
        result = result.filter(item => item.status === "Đã hủy");
        break;
      case "6":
        result = result.filter(item => item.status === "Hoàn hàng");
        break;
      default:
        break;
    }
    if (searchTerm) {
      if (searchOption === 'id') {
        result = result.filter(item => item.id && item.id.toString().includes(searchTerm));
      } else if (searchOption === 'phonene') {
        result = result.filter(item => item.phone && item.phone.toString().includes(searchTerm));
      }
    } else {
      console.log("adminkhong", isAdmin);
      if (!isAdmin) {
        result = result.filter(item => item.phone && item.phone.toString() === phoneNumber);
      }
    }

    return result;
  }, [sortedData, activeTab, searchTerm, phoneNumber]);

  console.log("filteredData", filteredData);

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
  const [phoneneCreated, setphoneneCreated] = useState('');
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
  const handlephoneneCreatedChange = (event) => {
    setphoneneCreated(event.target.value);
    setShipmentsCreateData({
      ...shipmentsCreateData,
      phone: event.target.value
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
                    <option value="id">Mã vận đơn</option>
                    <option value="phonene" >SĐT người nhận</option>
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
                <TabPane tab="Đã giao" key="4" className="flex-1 text-center w-full" />
                <TabPane tab="Đã hủy" key="5" className="flex-1 text-center w-full" />
                <TabPane tab="Hoàn hàng" key="6" className="flex-1 text-center w-full" />
              </AntTabs>

              <table className="w-full border-collapse" style={{ fontSize: '15px' }}>
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('id')}>
                      {sortConfig && sortConfig.key === 'id' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Mã vận đơn
                    </th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('date_created')}>
                      {sortConfig && sortConfig.key === 'date_created' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Ngày gửi</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('status')}>
                      {sortConfig && sortConfig.key === 'status' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Status</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('updated_at')}>
                      {sortConfig && sortConfig.key === 'updated_at' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      Địa chỉ</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('phonene')}>
                      {sortConfig && sortConfig.key === 'phonene' ? (
                        sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                      ) : ''}
                      SĐT người nhận</th>
                    <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('phonene')}>
                      {sortConfig && sortConfig.key === 'phonene' ? (
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
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.id}</td>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.date_created}</td>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.status}</td>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.address}</td>
                        <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.phone}</td>
                        <td className="border border-gray-800 p-2 text-center">
                          <div className="flex justify-center items-center">
                            <StatusButton item={filteredData.find(item => item.id)} />
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
                                  <div className="">{item.id}</div>
                                </div>
                                <div className="mt-4">
                                  <div className="mt-4">
                                    <table className="w-full border-0">
                                      <thead>
                                      </thead>
                                      <tbody>

                                        <tr className="bg-white border-2 p-2 border-blue-200">
                                          <td className="py-2 border-2 p-2 font-bold">
                                            Tên sản phẩm: {item.product}
                                          </td>                                   </tr>
                                        <tr className="bg-yellow-50 border-2 p-2 border-gray-200">
                                          <td className="py-2 border-2 p-2 font-bold">Người nhận: {item.name}</td>
                                        </tr>
                                        <tr className="bg-white border-2 p-2 border-gray-200">
                                          <td className="py-2 border-2 p-2 font-bold">Số điện thoại: {item.phone}</td>
                                        </tr>
                                        <tr className="bg-yellow-50 border-2 p-2 border-gray-200">
                                          <td className="py-2 border-2 p-2 font-bold">Địa chỉ: {item.address}</td>
                                        </tr>
                                        <tr className="bg-white border-2 p-2 border-gray-200">
                                          <td className="py-2 border-2 p-2 font-bold">Ngày gửi: {item.date_created}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className="flex items-end space-x-2 mt-4">
                                  <div className="font-bold text-gray-600 uppercase">Trạng thái: </div>
                                  <div className="">{item.status}</div>
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
                      \                      <option value="phonene" >SĐT người nhận</option>
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
                  <TabPane tab="Đã giao" key="4" className="flex-1 text-center w-full" />
                  <TabPane tab="Đã hủy" key="5" className="flex-1 text-center w-full" />
                  <TabPane tab="Hoàn hàng" key="6" className="flex-1 text-center w-full" />
                </AntTabs>

                <table className="w-full border-collapse" style={{ fontSize: '15px' }}>
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('id')}>
                        {sortConfig && sortConfig.key === 'id' ? (
                          sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                        ) : ''}
                        Mã vận đơn
                      </th>
                      <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('product')}>
                        {sortConfig && sortConfig.key === 'product' ? (
                          sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                        ) : ''}
                        Tên sản phẩm</th>
                      <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('sender_phone')}>
                        {sortConfig && sortConfig.key === 'sender_phone' ? (
                          sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                        ) : ''}
                        SĐT người nhận</th>
                      <th className="border border-gray-800 p-2 text-center cursor-pointer" onClick={() => requestSort('date_created')}>
                        {sortConfig && sortConfig.key === 'date_created' ? (
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
                          <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.id}</td>
                          <td className="border border-gray-800 p-2 text-center whitespace truncate-2-lines">{item.product}</td>
                          <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.phone}</td>
                          <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.date_created}</td>
                          <td className="border border-gray-800 p-2 text-center whitespace-nowrap">{item.status}</td>
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
        </div>
      </div>)}</>
  );
};

export default Journal;