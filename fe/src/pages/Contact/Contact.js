import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import CardView from "../../components/CardView";
import Fuse from "fuse.js";
import ReactPaginate from 'react-paginate';

const Contact = ({ isAdmin }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Đặt trang hiện tại là 0
  const [usersPerPage] = useState(12);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [searchName, setSearchName] = useState("");
  
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch (`${process.env.REACT_APP_SERVER_URL}/api/admins/admin_search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: searchName}),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const renamedData = data.map(item => ({
          id: item.id,
          name: item.name,
          image: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
          phone: item.phone,
          email: item.email,
          address: item.address,
          membership: item.gender,
          usename: item.username,
        }));
        setUsers(renamedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [searchName]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const options = {
    includeScore: true,
    keys: ['name', 'phone', 'email', 'address', 'membership', "id"]
  }

  const fuse = new Fuse(filteredUsers, options);
  
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearchName(searchQuery);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Xóa admin id=" + id + "?");
    if (!isConfirmed) {
      return;
    }

    try {
      console.log(id);
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admins/admin_delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "admin_id": id
        }),
      });
      window.location.reload();
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      const data = await res.status();
      console.log(data); 
    } catch (err) {
      console.log(err);
    }
  };

  // Logic for pagination
  const indexOfLastUser = (currentPage + 1) * usersPerPage; // Điều chỉnh tính toán trang cuối
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = ({ selected }) => setCurrentPage(selected); // Cập nhật trang hiện tại khi người dùng chọn trang mới

  return (
    <>
      {isAdmin ? (
        <>
          <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="Users" prevLocation={prevLocation} />
            <div className="flex w-full pl-48 pr-48">
              <input value={searchName} onChange={handleSearch} className="w-4/5 h-10 border-2 border-gray-300 rounded-md px-2" type="text" placeholder="Search for users..." />
              <button className="w-1/5 h-10 bg-primeColor text-white rounded-md">Search</button>
            </div>
            {/* Display the card views */}
            <div className="grid grid-cols-6 gap-4 mt-16">
              {currentUsers.map((user) => (
                <CardView
                  key={user.id}
                  image={user.image}
                  name={user.name}
                  id={user.id}
                  phone={user.phone}
                  email={user.email}
                  address={user.address}
                  membership={user.membership}
                  username={user.usename}
                  searchQuery={searchName}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            {/* Pagination */}
            <Pagination
              pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
              onPageChange={paginate}
              currentPage={currentPage}
            />
          </div>
        </>
      ) : (
        <div className="max-w-container mx-auto px-4">
          {/* Your Contact Form JSX */}
        </div>
      )}
    </>
  );
};

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
          nextLabel=""
          onPageChange={onPageChange}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
  );
};

export default Contact;
