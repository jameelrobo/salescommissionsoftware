import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaCalculator,
  FaFile,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/transaction",
    name: "Transaction",
    icon: <FaCalculator />,
  },
  {
    path: "/Customers",
    name: "Customers",
    icon: <FaUser />,
  },
  {
    path: "/salesman",
    name: "Salesman",
    icon: <FaUser />,
  },
  {
    path: "/factories",
    name: "Factories",
    icon: <FaMoneyBill />,
  },
  {
    path: "/commissonRules",
    name: "CommissonRules",
    icon: <BiAnalyse />,
  },

  
  {
    path: "/analytics",
    name: "Commission Reports",
    icon: <BiAnalyse />,
  },
  {
    path: "/reports",
    name: "Group Summaries",
    icon: <BiAnalyse />,
  },
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: <FaUser />,
  // },

  // {
  //   path: "/reports",
  //   name: "Reports",
  //   icon: <FaFile />,
  //   subRoutes: [
  //     {
  //       path: "/settings/salesCommission",
  //       name: "SalesCommission ",
  //       icon: <BiAnalyse />,
  //     },
  //     // {
  //     //   path: "/settings/2fa",
  //     //   name: "2FA",
  //     //   icon: <FaLock />,
  //     // },
  //     // {
  //     //   path: "/settings/billing",
  //     //   name: "Billing",
  //     //   icon: <FaMoneyBill />,
  //     // },
  //   ],
  // },

  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: <BiCog />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/users",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     // {
  //     //   path: "/settings/2fa",
  //     //   name: "2FA",
  //     //   icon: <FaLock />,
  //     // },
  //     // {
  //     //   path: "/settings/billing",
  //     //   name: "Billing",
  //     //   icon: <FaMoneyBill />,
  //     // },
  //   ],
  // },
  // {
  //   path: "/saved",
  //   name: "Saved",
  //   icon: <AiFillHeart />,
  // },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "150px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Barco Sales App
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
