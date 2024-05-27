import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Order/Order";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Account/Profile";

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") || false);
  // const isAdmin = true;
  const Layout = () => {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <HeaderBottom />
        <SpecialCase isAdmin={isAdmin} />
        <ScrollRestoration />
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          {/* ==================== Header Navlink Start here =================== */}
          <Route index element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/order" element={<Journal />}></Route>
          {/* ==================== Header Navlink End here ===================== */}
          <Route path="/category/:category" element={<Offer />}></Route>
          <Route path="/product/:_id" element={<ProductDetails />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/paymentgateway" element={<Payment />}></Route>
          <Route path="/admin" element={<Home isAdmin={isAdmin} />}></Route>
          <Route path="/admin/product" element={<Shop isAdmin/>}></Route>
          <Route path="/admin/about" element={<About />}></Route>
          <Route path="/admin/admin" element={<Contact isAdmin />}></Route>
          <Route path="/admin/order" element={<Journal isAdmin />}></Route>
          <Route path="/admin/category/:category" element={<Offer isAdmin />}></Route>
          <Route path="/admin/product/:_id" element={<ProductDetails isAdmin />}></Route>
          <Route path="/admin/cart" element={<Cart />}></Route>
          <Route path="/admin/paymentgateway" element={<Payment />}></Route>
        </Route>
        <Route path="/admin/profile" element={<Profile isAdmin/>}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
    )
  );

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;