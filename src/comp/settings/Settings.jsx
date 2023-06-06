import React from "react";
import "./Settings.css";

import { AiFillCaretRight } from "react-icons/ai";

const Settings = ({ user, setUser }) => {
	return (
		<div className="basis-[80%] bg-[--c60] z-10 overflow-y-scroll p-4 flex flex-col">
			<p className="font-bold text-lg pb-4 border-b-2">Account Services</p>
			<div className="flex flex-col gap-2 border-b-2 pb-4 my-4">
				<p>Current email:</p>
				<p>{user}</p>
				<button className="mr-auto bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none">Update Email</button>
			</div>
			<div className="inline-flex w-100 items-center justify-between border-b-2 pb-4 my-4">
				<p>
					Mails: <span className="font-bold">0/0</span>{" "}
				</p>
					<AiFillCaretRight className="bg-[--c1] rounded p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"/>
			</div>

			<div className="flex flex-col gap-2 border-b-2 pb-4 my-4">
				<div className="inline-flex items-center justify-between">
					<p>Contact Us</p>
					<AiFillCaretRight className="bg-[--c1] rounded p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"/>
				</div>
				<div className="inline-flex items-center justify-between">
					<p>FAQ</p>
					<AiFillCaretRight className="bg-[--c1] rounded p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"/>
				</div>
				<div className="inline-flex items-center justify-between">
					<p>T&C</p>
					<AiFillCaretRight className="bg-[--c1] rounded p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"/>
				</div>
				<div className="inline-flex items-center justify-between">
					<p>Privacy policy</p>
					<AiFillCaretRight className="bg-[--c1] rounded p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"/>
				</div>
				<div className="inline-flex items-center justify-between">
					<p>Symbol Explanation</p>
					<AiFillCaretRight className="bg-[--c1] rounded p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"/>
				</div>
				<div className="inline-flex items-center justify-between">
					<p>Our News</p>
					<AiFillCaretRight className="bg-[--c1] rounded p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"/>
				</div>
			</div>

			<div className="flex flex-col gap-2 border-b-2 pb-4 my-4">
				<div className="inline-flex items-center justify-between">
					<p>App Version: 1.0.0</p>
				</div>
				<div className="inline-flex items-center justify-between">
					<p>Last Updated: {new Date().toLocaleDateString()}</p>
				</div>
			</div>
		</div>
	);
};

export default Settings;
