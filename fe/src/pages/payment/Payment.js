import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useEffect } from "react";

const Payment = ({ location }) => { 
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const { total, productNames } = location?.state || {};
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000000);
    setIdNumber(randomId);
  }, []);

  useEffect(() => {
    if (location?.state) {
      const { total, productNames } = location.state;
    }
  }, [location]);

  const handleName = (e) => {
    setClientName(e.target.value);
    if (!e.target.value) {
      setErrClientName("Name is required");
    } else {
      setErrClientName("");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!e.target.value) {
      setErrEmail("Email is required");
    } else if (!emailRegex.test(e.target.value)) {
      setErrEmail("Invalid email address");
    } else {
      setErrEmail("");
    }
  };

  const handleMessages = (e) => {
    setMessages(e.target.value);
    if (!e.target.value) {
      setErrMessages("Message is required");
    } else {
      setErrMessages("");
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Name is required");
    }
    if (!email) {
      setErrEmail("Email is required");
    }
    if (!messages) {
      setErrMessages("Message is required");
    }
    if (clientName && email && messages) {
      // Your post logic here
      console.log("Form submitted:", { clientName, email, messages });
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <form className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Payment Form
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
            <div className="flex">
              <p className="text-base font-titleFont font-semibold px-2">
                ID Number
              </p>
              <p>{idNumber}</p>
            </div>
            <div className="flex">
              <p className="text-base font-titleFont font-semibold px-2">
                Total Amount
              </p>
              <p>{total}</p>
            </div>
            <div className="flex">
              <p className="text-base font-titleFont font-semibold px-2">
                Products
              </p>
              <ul>
                {productNames && productNames.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </div>
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
                Phone Number
              </p>
              <input
                onChange={handleEmail}
                value={email}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="email"
                placeholder="Enter your phone number here"
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
                Address
              </p>
              <textarea
                onChange={handleMessages}
                value={messages}
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                type="text"
                placeholder="Enter your address here"
              ></textarea>
              {errMessages && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errMessages}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">Note</p>
              <input
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your card number here"
              />
            </div>
            <button
              onClick={handlePost}
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
