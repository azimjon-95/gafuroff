import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { menuItems } from "../../utils/SidebarMenu";

function Sidebar() {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const getInitialOpenMenus = () => {
    try {
      const stored = localStorage.getItem("openMenus");
      return stored ? JSON.parse(stored) : {};
    } catch (err) {
      return {};
    }
  };
  const [openMenus, setOpenMenus] = useState(getInitialOpenMenus);
  const [activeMenu, setActiveMenu] = useState(localStorage.getItem("activeMenu") || "");
  const [activeSubPath, setActiveSubPath] = useState(localStorage.getItem("activeSubPath") || "");

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem("activeMenu");
    if (storedActiveMenu) setActiveMenu(storedActiveMenu);

    const storedSubPath = localStorage.getItem("activeSubPath");
    if (storedSubPath) setActiveSubPath(storedSubPath);
  }, []);
  useEffect(() => {
    localStorage.setItem("openMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  useEffect(() => {
    localStorage.setItem("activeMenu", activeMenu);
  }, [activeMenu]);

  useEffect(() => {
    localStorage.setItem("activeSubPath", activeSubPath);
  }, [activeSubPath]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    setActiveMenu(label);
  };
  const BaxodirShifoLogo = ({
    width = 270,
    height = 120,
    color = '#fff',
    className = ''
  }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Medical Cross Background */}


        {/* Heartbeat Line - next to CLINIC */}
        <path
          d="M-35 62 
     L-5 62 L-2 55 L2 70 L5 40 L8 72 L12 62 
     L270 62 
     L274 55 L278 70 L282 42 L286 72 L290 62 
     L310 62"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />




        {/* Main Text - BAXODIR-SHIFO */}
        <text
          x="140"
          y="35"
          fill={color}
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          DOCTOR GAFUROFF
        </text>

        {/* Subtitle - CLINIC */}
        <text
          x="140"
          y="58"
          fill={color}
          fontSize="15"
          fontWeight="600"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          letterSpacing="0px"
        >
          ЛЕЧЕНИЕ ГРЫЖИ БЕЗ ОПЕРАЦИИ
        </text>

      </svg>
    );
  };
  return (
    <aside>
      <div className="sidebar_logo">
        {/* Different sizes */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <BaxodirShifoLogo className="svgLogo" width={300} height={90} color="#fff" />
        </div>
        {/* <i>Avtomatlashtirish - kelajak bugun</i> */}
      </div>
      <div className="sidebar_links">
        {menuItems[role]?.map((item) =>
          item.children ? (
            <div key={item.label} className="sidebar_menu">
              <button
                onClick={() => toggleMenu(item.label)}
                className={`sidebar_menu_button ${activeMenu === item.label ? "active" : ""}`}
              >
                <span>{item.icon} {item.label}</span>
                {openMenus[item.label] ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </button>
              {openMenus[item.label] && (
                <div className="sidebar_submenu">
                  {item.children.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={`sidebar_submenu_item ${activeSubPath === subItem.path ? "active" : ""}`}
                      onClick={() => {
                        setActiveMenu(item.label); // ota menu-ni ham ochiq qilib qolish
                        setActiveSubPath(subItem.path); // active sub-path ni belgilash
                      }}
                    >
                      {subItem.icon} <span>{subItem.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar_menu_item ${activeMenu === item.label ? "active" : ""}`}
              onClick={() => {
                setActiveMenu(item.label); // menyu eslab qolsin
                localStorage.setItem("activeMenu", item.label); // localStorage ga yozish
                setActiveSubPath(""); // submenu bo'lmasa
              }}
            >
              {item.icon} <span>{item.label}</span>
            </NavLink>

          )
        )}
      </div>
    </aside>
  );
}

export default Sidebar;