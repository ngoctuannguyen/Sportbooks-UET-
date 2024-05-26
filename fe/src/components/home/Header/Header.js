import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import { navBarListAdmin } from "../../../constants";
import Flex from "../../designLayouts/Flex";

const Header = ({ isAdmin: initialIsAdmin }) => {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  const handleLogout = () => {
    // Your logout logic here
    setIsAdmin(false);
    navigate("/signin");
  };

  const handleLogin = () => {
    // Your login logic here
    setIsAdmin(false);
    navigate("/signin");
  };

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <Image className="w-32 object-cover" imgSrc={logo} />
            </div>
          </Link>
          <div className="flex items-center">
            <div>
              {showMenu && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center w-auto z-50 p-0 gap-2"
                >
                  <>
                    {isAdmin ? (
                      navBarListAdmin.map(({ _id, title, link }) => (
                        <NavLink
                          key={_id}
                          className={`flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 ${location.pathname.includes(link) ? 'active' : ''}`}
                          to={link}
                          state={{ data: location.pathname.split("/")[1] }}
                        >
                          <li>{title}</li>
                        </NavLink>
                      ))
                    ) : (
                      navBarList.map(({ _id, title, link }) => (
                        <NavLink
                          key={_id}
                          className={`flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 ${location.pathname === link ? 'active' : ''}`}
                          to={link}
                          state={{ data: location.pathname.split("/")[1] }}
                        >
                          <li>{title}</li>
                        </NavLink>
                      ))
                    )}
                  </>
                </motion.ul>
              )}
              <HiMenuAlt2
                onClick={() => setSidenav(!sidenav)}
                className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
              />
              {sidenav && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-[80%] h-full relative"
                  >
                    <div className="w-full h-full bg-primeColor p-6">
                      <img
                        className="w-28 mb-6"
                        src={logoLight}
                        alt="logoLight"
                      />
                      <ul className="text-gray-200 flex flex-col gap-2">
                        {navBarList.map((item) => (
                          <li
                            className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                            key={item._id}
                          >
                            <NavLink
                              to={item.link}
                              state={{ data: location.pathname.split("/")[1] }}
                              onClick={() => setSidenav(false)}
                            >
                              {item.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h1
                          onClick={() => setCategory(!category)}
                          className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                        >
                          Shop by Category{" "}
                        </h1>
                        {category && (
                          <motion.ul
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-sm flex flex-col gap-1"
                          >
                            <li className="headerSedenavLi">Tất cả</li>
                            <li className="headerSedenavLi">Giày</li>
                            <li className="headerSedenavLi">Áo</li>
                            <li className="headerSedenavLi">Mũ</li>
                            <li className="headerSedenavLi">Set</li>
                          </motion.ul>
                        )}
                      </div>
                    </div>
                    <span
                      onClick={() => setSidenav(false)}
                      className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                    >
                      <MdClose />
                    </span>
                  </motion.div>
                </div>
              )}
            </div>
            <div>
              <button className="ml-4 px-4 py-2 bg-black text-white rounded-md" onClick={isAdmin ? handleLogout : handleLogin}>
                {isAdmin ? "Đăng xuất" : "Đăng nhập"}
              </button>
            </div>
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
