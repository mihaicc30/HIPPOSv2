import React, { useEffect } from "react";
import "./Signout.css";
import { useNavigate } from "react-router-dom";

const Signout = ({ user, setUser }) => {
	const nav = useNavigate();
	useEffect(() => {
		setUser(null);
		nav("/");
	}, []);
	return (
		<div className="basis-[80%] bg-[--c60] z-10 overflow-y-scroll">
			Signout
			{/* to have some animation of signing out */}
		</div>
	);
};

export default Signout;
