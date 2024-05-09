import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import { BsSuitHeartFill } from "react-icons/bs";
import icons from "../../utils/icons";
import { Chart, CategoryScale, BarElement, LinearScale, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

Chart.register(CategoryScale, BarElement, LinearScale, ArcElement);

const { FaCircleUser, FcOk, FaPauseCircle, TiDelete, LiaShippingFastSolid, GrStorage, PiKeyReturn } = icons

const data = {
  total: 100,
  done: 50,
  pending: 30,
  fail: 20,
  wait: 10,
  store: 5,
};

const data_bar = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  datasets: [
    {
      label: 'Số lượng đơn hàng',
      data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 90],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const data_pie = {
  labels: ['Đã giao', 'Đang giao', 'Đã hủy'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 204, 204)', 'rgb(204, 204, 255)', 'rgb(255, 255, 204)'],
      hoverBackgroundColor: ['rgb(255, 153, 153)', 'rgb(153, 153, 255)', 'rgb(255, 255, 153)']
    }
  ]
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10,
      },
    },
  },
};

const optionPie = {
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          let index = context.dataIndex;
          let dataset = context.dataset;
          let currentValue = dataset.data[index];
          return `${dataset.labels[index]}: ${currentValue}`;
        }
      }
    }
  }
};


const Home = (isAdmin) => {
  return (
    <div className="w-full mx-auto">
      {isAdmin ? (
        <div>
          <div className="h-screen">
          <div className="border rounded border-box  text-brand text-lg font-bold p-8" style={{ width: '100vw', backgroundColor: 'rgba(242, 245, 247, 0.7)' }}>
            <div className="cardview rounded border-box mb-12" style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '48px' }}>
              <div className="w-full">
                <div className="flex items-center justify-between mb-0">
                  <h1 className='mb-4 ' style={{ fontSize: '24px' }}>Tổng quan bưu kiện</h1>
                </div>
                <div className="flex" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div className="cardview rounded border-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '32%', backgroundColor: 'white', color: 'grey' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '20%', fontSize: '15px', padding: '24px' }}>
                      <span >
                        <FcOk color={'#C2C2C2'} size={20} />
                      </span>
                      <div style={{ height: '100%', paddingLeft: '5px', border: 'none' }}>Đã giao thành công</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%', padding: '10px 0', fontSize: '36px', color: 'black', marginBottom: '12px' }}>{data.done}
                    </div>
                    <div style={{ marginTop: 'auto', backgroundColor: "#eeeeee", padding: '6px 24px', fontSize: '13px', borderRadius: '0 0 8px 8px', display: 'flex', justifyContent: 'center' }}>
                      <div>{data.done} của {data.total} bưu kiện</div>
                    </div>
                  </div>
                  <div className="cardview rounded border-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '32%', backgroundColor: 'white', color: 'grey' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '20%', fontSize: '15px', padding: '24px' }}>
                      <span >
                        <FaPauseCircle color={'#ffd428'} size={20} />
                      </span>
                      <div style={{ height: '100%', paddingLeft: '5px', border: 'none' }}>Chưa giao thành công</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%', padding: '10px 0', fontSize: '36px', color: 'black', marginBottom: '12px' }}>{data.pending}
                    </div>
                    <div style={{ marginTop: 'auto', backgroundColor: "#eeeeee", padding: '6px 24px', fontSize: '13px', borderRadius: '0 0 8px 8px', display: 'flex', justifyContent: 'center' }}>
                      <div>{data.pending} của {data.total} bưu kiện</div>
                    </div>
                  </div>
                  <div className="cardview rounded border-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '32%', backgroundColor: 'white', color: 'grey' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '20%', fontSize: '15px', padding: '24px' }}>
                      <span >
                        <TiDelete color={'f10d0c'} size={25} />
                      </span>
                      <div style={{ height: '100%', paddingLeft: '5px', border: 'none' }}>Giao hàng thất bại</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%', padding: '10px 0', fontSize: '36px', color: 'black', marginBottom: '12px' }}>{data.fail}
                    </div>
                    <div style={{ marginTop: 'auto', backgroundColor: "#eeeeee", padding: '6px 24px', fontSize: '13px', borderRadius: '0 0 8px 8px', display: 'flex', justifyContent: 'center' }}>
                      <div>{data.fail} của {data.total} bưu kiện</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between mb-0">
                  <h1 className='mb-4 mt-16' style={{ fontSize: '24px' }}>Thống kê</h1>
                </div>
                <div className="flex" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div className="cardview rounded border-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '32%', backgroundColor: 'white', color: 'grey' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '26px' }}> <LiaShippingFastSolid color={'#000000'} size={40} /></span>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '20%', fontSize: '15px', padding: '12px' }}>Đang chờ lấy hàng
                    </div>
                    <div style={{ marginTop: 'auto', backgroundColor: "#eeeeee", padding: '6px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%', padding: '10px 0', fontSize: '24px', color: 'black', borderRadius: '0 0 8px 8px', fontWeight: 'normal' }}>{data.wait}
                    </div>
                  </div>
                  <div className="cardview rounded border-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '32%', backgroundColor: 'white', color: 'grey' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '26px' }}> <PiKeyReturn color={'#000000'} size={40} /></span>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '20%', fontSize: '15px', padding: '12px' }}>Trả lại cho người gửi
                    </div>
                    <div style={{ marginTop: 'auto', backgroundColor: "#eeeeee", padding: '6px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%', padding: '10px 0', fontSize: '24px', color: 'black', borderRadius: '0 0 8px 8px', fontWeight: 'normal' }}>{data.fail}
                    </div>
                  </div>
                  <div className="cardview rounded border-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '32%', backgroundColor: 'white', color: 'grey' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '26px' }}> <GrStorage color={'#000000'} size={40} /></span>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '20%', fontSize: '15px', padding: '12px' }}>Lưu kho
                    </div>
                    <div style={{ marginTop: 'auto', backgroundColor: "#eeeeee", padding: '6px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%', padding: '10px 0', fontSize: '24px', color: 'black', borderRadius: '0 0 8px 8px', fontWeight: 'normal' }}>{data.store}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full ">
                <div className="flex items-center justify-between mb-0">
                  <h1 className='mb-4 mt-16' style={{ fontSize: '24px' }}>Biểu đồ</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{width: '60%'}}>
                    <Bar data={data_bar} options={options} />
                    <div style={{textAlign: 'center',fontSize: '12px', fontStyle: 'italic', fontWeight: 'normal' }}>Biểu đồ thống kê số lượng đơn hàng thành công năm 2024</div>
                  </div>
                  <div style={{width: '30%'}}>
                    <Pie data={data_pie} options={optionPie}/>
                    <div style={{textAlign: 'center', fontSize: '12px', fontStyle: 'italic', fontWeight: 'normal'}}>Biểu đồ thống kê đơn hàng năm 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div></div>
      ) : (
        <div>
          <Banner />
          <BannerBottom />
          <div className="max-w-container mx-auto px-4">
            <Sale />
            <NewArrivals />
            <BestSellers />
            <YearProduct />
            <SpecialOffers />
          </div>
        </div>
      )}
    </div>

  );
};

export default Home;