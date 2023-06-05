import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

const Auth = ({ user, setUser }) => {
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState({
		email: "",
		password: "",
		general: "",
	});

	const performValidation = (e) => {
		e.preventDefault();
		let submit = true;
		const email = e.target.email.value;
		const password = e.target.password.value;
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

		if (!password || password.length < 5) {
			submit = false;
			setErr((prevErr) => ({
				...prevErr,
				password: "Please enter password.",
			}));
		} else {
			setErr((prevErr) => ({
				...prevErr,
				password: "",
			}));
		}
		if (!submit) return;
		console.log("Login details > valid");
		setErr({
			email: "",
			password: "",
			general: "",
		});
		setUser(email);
		e.target.email.value = "";
		e.target.password.value = "";
		// e.target.submit();
	};

	return (
		<div className="flex bg-[--clsec]">
			<div className="basis-[60%] max-md:basis-[100%] flex flex-col gap-[3vh] min-h-[100svh] justify-center items-center ">
				<div className="bg-[--c30] rounded shadow-lg shadow-[#535353] flex flex-col w-[80%] gap-[2vh] p-4 min-h-[80svh] justify-center border-2 border-[--c12]">
					<p className="font-black text-3xl tracking-widest text-center">
						HIPPOS
					</p>
					<img
						className="mx-auto max-w-[15svh] max-h-[15svh]"
						src="./assets/d956248b8cfe7fe8fa39033b50728bcb.jpg"
					/>
					<div className="text-center">
						<p className="font-bold text-lg">Welcome back!</p>
						<p>Please enter your log in details below</p>
					</div>
					<div className="text-center">
						<div className="my-4 py-4 flex justify-center gap-10 text-[3rem]">
							<FcGoogle className="transition hover:scale-[1.2] cursor-pointer" />
							<BsFacebook style={{fill:"#4267B2"}} className="transition hover:scale-[1.2] cursor-pointer"/>
						</div>
						<p className="text-[#bbbaba] text-sm">- Or use email -</p>
					</div>

					<form
						onSubmit={performValidation}
						className="flex flex-col mx-auto my-[2vh] w-[100%] max-w-[500px] max-sm:max-w-[90vw]">
						<input
							name="email"
							type="text"
							placeholder="Email"
							defaultValue="mihaic@gmail.com"
							required
							className="px-4 py-2 border-b-[--c60] border-b-2"
						/>
						{err.email && <p>{err.email}</p>}
						<input
							name="password"
							type="text"
							placeholder="Password"
							defaultValue="mihaic@gmail.com"
							required
							className="px-4 py-2 border-b-[--c60] border-b-2"
						/>

						{err.password && <p>{err.password}</p>}

						<button className="ml-auto my-[3vh] bg-[--clsec] p-2 rounded">
							Forgot password?
						</button>

						{err.general && <p>{err.general}</p>}
						<button
							disabled={loading}
							className="bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none">
							{loading ? "🕠" : "Login"}
						</button>
					</form>

					<p className="text-center">
						Dont have an account?
						<a
							href="#"
							className="bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner">
							Sign Up!
						</a>
					</p>
				</div>
			</div>

			<div className="basis-[40%] ml-auto block max-md:hidden overflow-hidden">
				<div className="overflow-hidden max-h-[100svh]">
					<img
						src="./assets/img-eWJbfpAtsnldJ5hRNnNHl.jpeg"
						className="ml-auto aspect-auto"
					/>
					<img
						src="./assets/img-FG3J2WMxkew7bcOilt4BG.jpeg"
						className="ml-auto aspect-auto"
					/>
					<img
						src="./assets/img-HiPyM5L04ZqdZG74hUvLM.jpeg"
						className="ml-auto aspect-auto"
					/>
					<img
						src="./assets/img-LfA4ebR2EcyVlRcRnmEbV.jpeg"
						className="ml-auto aspect-auto"
					/>
				</div>
			</div>
		</div>
	);
};

export default Auth;
