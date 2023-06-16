import React, { useEffect } from "react";
import "./Signout.css";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const Signout = ({ setVenueNtable}) => {
  const nav = useNavigate();
  useEffect(() => {
    
    console.log("requesting logout ", `${import.meta.env.VITE_API}logout`);
    const timeout = setTimeout(() => {
      fetch(`${import.meta.env.VITE_API}logout`, {
        method: "POST",
        // credentials: "include",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          v: import.meta.env.VITE_G,
        }),
      });
      setVenueNtable({ venue: null, table: null });
      localStorage.clear();
      nav("/");
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="absolute inset-0 grow bg-[--c60] z-10 overflow-y-scroll flex flex-col justify-center items-center">
      <div className="ui-loader loader-blk">
        <svg viewBox="22 22 44 44" className="multiColor-loader">
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth="3.6"
            className="loader-circle loader-circle-animation"
          ></circle>
        </svg>
      </div>
      <p className="mt-8 text-xl">Logging user out...</p>
    </div>
  );
};

export default Signout;
