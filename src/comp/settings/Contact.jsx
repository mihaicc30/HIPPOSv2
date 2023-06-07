import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = ({ user }) => {
	const nav = useNavigate()
	const [err, setErr] = useState({
		name: "",
		email: "",
		message: "",
	});
	const handleSend = (e) => {
		e.preventDefault();
		let submit = true;

		const name = e.target.name.value;
		const email = e.target.email.value;
		const message = e.target.message.value;
		const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}$/;

		if (!email || email.length < 5) {
			submit = false;
			setErr((prevErr) => ({
				...prevErr,
				email: "Please enter email.",
			}));
		} else if (!emailPattern.test(email)) {
			submit = false;
			setErr((prevErr) => ({
				...prevErr,
				email: "Email is not valid.",
			}));
		} else {
			setErr((prevErr) => ({
				...prevErr,
				email: "",
			}));
		}

		if (!name || name.length < 3) {
			submit = false;
			setErr((prevErr) => ({
				...prevErr,
				name: "Please enter name.",
			}));
		} else {
			setErr((prevErr) => ({
				...prevErr,
				name: "",
			}));
		}
		if (!message || message.length < 6) {
			submit = false;
			setErr((prevErr) => ({
				...prevErr,
				message: "Please enter message.",
			}));
		} else {
			setErr((prevErr) => ({
				...prevErr,
				message: "",
			}));
		}
		if (!submit) return;
		console.log("Contact form valid. Proceeding.");
		setErr({
			name: "",
			email: "",
			message: "",
		});

		e.target.name.value = "";
		e.target.email.value = "";
		e.target.message.value = "";
		alert("Your message has been sent!");
		nav(-1)
	};
	return (
		<div className="basis-[80%] bg-[--c60] z-10 overflow-y-scroll p-4 flex flex-col items-center w-100">
			<form className="flex flex-col" onSubmit={handleSend}>
				<div className="p-2 pb-4">
					<input
						name="name"
						type="text"
						placeholder="Name"
						required
						className="w-[200px] p-4 rounded-[10px] border-b-2 border-b-black outline-none"
					/>

					{err.name && <p>{err.name}</p>}
				</div>
				<div className="p-2 pb-4">
					<input
						name="email"
						type="text"
						placeholder="Email"
						defaultValue={user}
						required
						className="w-[200px] p-4 rounded-[10px] border-b-2 border-b-black outline-none"
					/>

					{err.email && <p>{err.email}</p>}
				</div>

				<div className="p-2 pb-4">
					<textarea
						name="message"
						rows="4"
						placeholder="Message"
						required
						className="w-[200px] p-4 rounded-[10px] border-b-2 border-b-black outline-none"></textarea>

					{err.message && <p>{err.message}</p>}
				</div>
				<button className="bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] mx-auto text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none">
					Send
				</button>
			</form>
		</div>
	);
};

export default Contact;
