import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AiOutlineLeft, AiFillCaretRight } from "react-icons/ai";

// list belonging to a category from the menu
const MenuItem = ({ item }) => {
  const navigate = useNavigate();

  const handleItemClick = (i) => {
    // Navigate to the item details route
    navigate(`/menu/${item.name}/${i}`);
  };

  const location = useLocation();
  const isBaseRoute = location.pathname === "/menu/" + item.name;

  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-20 z-10 bg-[--c60] ${
        isBaseRoute ? "overflow-y-scroll" : "overflow-y-hidden"
      }`}
    >
      {/* Render the menu item details */}
      <img
        src={"."+item.img}
        className="h-[100px] w-[100%]"
        style={{ objectFit: "cover", overflow: "hidden" }}
      />
      <button className="mr-auto p-2 text-3xl" onClick={() => navigate(-1)}>
        <AiOutlineLeft />
      </button>
      <h2 className="text-center text-xl">{item.name}</h2>
      {/* Render the menu item items */}

      <Outlet />
      <ul>
        {item.items.map((menuItem, index) => (
          <li key={index}>
            <div
              className="flex border-b-2 p-4 active:bg-[--clsec] hover:scale-[0.98] transition gap-4 animate-fadeUP1 opacity-0"
              style={{ animationDelay: `0.${index}s` }}
              onClick={() => handleItemClick(menuItem.name)}
            >
              <div className="grow">
                <p className="font-bold text-xl">{menuItem.name}</p>
                <p className="text-sm capitalize">
                  {menuItem.ingredients.map((itemz, index) => (
                    <span key={index}>
                      <span>{itemz}</span>
                      {index !== menuItem.ingredients.length - 1 && (
                        <span>, </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="font-bold text-xl text-end">
                  £{parseFloat(menuItem.price).toFixed(2)}
                </p>
                <p className="text-sm whitespace-nowrap text-end">
                  {menuItem.cal} kcal
                </p>
              </div>
              <div>
                <AiFillCaretRight className=" bg-[--c1] rounded my-auto p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItem;
