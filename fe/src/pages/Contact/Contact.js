import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import CardView from "../../components/CardView";
import { cardviewData, setFilteredCardviewData } from '../../components/CardView';
import Fuse from "fuse.js";

const Contact = ({ isAdmin }) => {
  const [cardviewData, setCardviewData] = useState([]);
  const [filteredCardviewData, setFilteredCardviewData] = useState([]);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      setSuccessMsg(
        `Thank you dear ${clientName}, Your messages has been received successfully. Futher details will sent to you by your email at ${email}.`
      );
    }
  };

  // Create an array of user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      image: "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg",
      phone: "123456789",
      email: "john.doe@example.com",
      address: "123 Main St, New York, Vietnam UET",
      membership: "Gold",
    },
    {
      id: 4,
      name: "Jane Smith",
      image: "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg",
      phone: "987654321",
      email: "mail@google.com",
      address: "456 Main St, New York, Vietnam UET",
      membership: "Gold",
    },
    {
      id: 5,
      name: "Jane Smith",
      image: "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg",
      phone: "987654321",
      email: "mail@google.com",
      address: "456 Main St, New York, Vietnam UET",
      membership: "Gold",
    },
    {
      id: 6,
      name: "Jane Smith",
      image: "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg",
      phone: "987654321",
      email: "mail@google.com",
      address: "456 Main St, New York, Vietnam UET",
      membership: "Gold",
    },
    {
      id: 7,
      name: "Jane Smith",
      image: "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg",
      phone: "987654321",
      email: "mail@google.com",
      address: "456 Main St, New York, Vietnam UET",
      membership: "Gold",
    },
    {
      id: 8,
      name: "Jane Smith",
      image: "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg",
      phone: "987654321",
      email: "mail@google.com",
      address: "456 Main St, New York, Vietnam UET",
      membership: "Gold",
    },



  ];
  
  const options = {
    includeScore: true,
    keys: ['name', 'phone', 'email', 'address', 'membership', "id"]
  }

  const fuse = new Fuse(users, options);
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
  
    const results = fuse.search(searchQuery);
  
    const filteredCardviewData = results.map(result => result.item);
  
    setFilteredCardviewData(filteredCardviewData);
    setCardviewData(filteredCardviewData); // Cập nhật cardviewData với dữ liệu đã lọc
  };

  return (
    <>
      {isAdmin ? (
        <>
          <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="Users" prevLocation={prevLocation} />
            <div className="w-full pl-48 pr-48">
              <input className="w-4/5 h-10 border-2 border-gray-300 rounded-md px-2" type="text" placeholder="Search for users..." />
              <button className="w-1/5 h-10 bg-primeColor text-white rounded-md" onClick={handleSearch}>Search</button>
            </div>
            {/* Display the card views */}
            <div className="grid grid-cols-6 gap-4 mt-16">
              {users.map((user) => (
                <CardView
                  key={user.id}
                  image={user.image}
                  name={user.name}
                  id={user.id}
                  phone={user.phone}
                  email={user.email}
                  address={user.address}
                  membership={user.membership}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-container mx-auto px-4">
          <Breadcrumbs title="Contact" prevLocation={prevLocation} />
          {successMsg ? (
            <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
          ) : (
            <form className="pb-20">
              <h1 className="font-titleFont font-semibold text-3xl">
                Fill up a Form
              </h1>
              <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
                <div>
                  <p className="text-base font-titleFont font-semibold px-2">
                    Name
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    type="text"
                    placeholder="Enter your name here"
                  />
                  {errClientName && (
                    <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                      <span className="text-sm italic font-bold">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-base font-titleFont font-semibold px-2">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    type="email"
                    placeholder="Enter your name here"
                  />
                  {errEmail && (
                    <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                      <span className="text-sm italic font-bold">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-base font-titleFont font-semibold px-2">
                    Messages
                  </p>
                  <textarea
                    onChange={handleMessages}
                    value={messages}
                    cols="30"
                    rows="3"
                    className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                    type="text"
                    placeholder="Enter your name here"
                  ></textarea>
                  {errMessages && (
                    <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                      <span className="text-sm italic font-bold">!</span>
                      {errMessages}
                    </p>
                  )}
                </div>
                <button
                  onClick={handlePost}
                  className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
                >
                  Post
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};


export default Contact;