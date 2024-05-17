import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import CardView from "../../components/CardView"; 
import { cardviewData, setFilteredCardviewData } from '../../components/CardView';
import axios from 'axios'
const Contact = ({ isAdmin }) => {
  const [cardviewData, setCardviewData] = useState([]);
  const [filteredCardviewData, setFilteredCardviewData] = useState([]);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/customers/')
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => {
        console.error("There was an error making the request:", err);
      });
  }, []); // Empty dependency array ensures this runs only once
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
  const handleSearch = (e) => {
    // Get the search query from the input field
    const searchQuery = e.target.value.toLowerCase();

    // Filter the cardview data based on the search query
    const filteredCardviewData = cardviewData.filter((card) => {
      // Check if the card's text contains the search query
      return card.text.toLowerCase().includes(searchQuery);
    });

    // Update the state with the filtered cardview data
    setFilteredCardviewData(filteredCardviewData);
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
      id: 2,
      name: "Jane Doe",
      image: "data:image/jpeg;base64,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",
      phone: "987654321",
      email: "jane@mai.com",
      address: "456 Main St, New York, Vietnam UET",
      membership: "Silver",
    },
    {
      id: 3,
      name: "John Smith",
      image: "data:image/jpeg;base64,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",
      phone: "123456789",
      email: "xx@outlook.com",
      address: "123 Main St, New York, Vietnam UET",
      membership: "Bronze",
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
              {details.map((ouput,id) => (
                <CardView
                image={"https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg"}
                  name={ouput.customer_fname + ouput.customer_lname}
                  phone={ouput.phone}
                  email={'example@gmail.com'}
                  address={'exampleaddress'}
                  membership={'Gold'}
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