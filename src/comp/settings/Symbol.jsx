import React,{useEffect} from "react";

import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Symbol = ({user}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return navigate("/");
  }, []);
  return (
    <div className="basis-[80%] bg-[--c60] z-10 overflow-y-scroll p-4 flex flex-col">
      <button className="mr-auto p-2 text-3xl" onClick={() => navigate(-1)}>
        <AiOutlineLeft />
      </button>
      <p>Work in Progress.</p>
    </div>
  );
};

export default Symbol;
