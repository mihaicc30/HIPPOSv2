import React from "react";

const Contact = () => {
	return (
		<div className="basis-[80%] bg-[--c60] z-10 overflow-y-scroll p-4 flex flex-col items-center w-100">
			<div className="p-2 pb-4 border-b-2">
				<input type="text" placeholder="Name" />
			</div>
			<div className="p-2 pb-4 border-b-2">
				<input type="text" placeholder="Email" />
			</div>

			<div className="p-2 pb-4 border-b-2">
				<textarea name="" id="" rows="10" placeholder="Message"></textarea>
			</div>
			<button className="bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none">
				Contact us
			</button>
		</div>
	);
};

export default Contact;
