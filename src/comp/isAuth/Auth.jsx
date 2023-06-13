import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = ({ user, setUser }) => {
  const [loginState, setLoginState] = useState(true);
  const location = useLocation();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({
    email: "",
    password: "",
    password2: "",
    general: "",
  });

  useEffect(() => {
    if (user) return nav("/");
  }, []);

  const performValidation = async (e) => {
    e.preventDefault();
    setLoading(true);

    let submit = true;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = !loginState ? e.target.password2.value : null;
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

    if (!loginState) {
      if (!password2 || password2.length < 5) {
        submit = false;
        setErr((prevErr) => ({
          ...prevErr,
          password2: "Please enter password.",
        }));
      } else if (password2 !== password) {
        submit = false;
        setErr((prevErr) => ({
          ...prevErr,
          password2: "Passwords do not match.",
        }));
      } else {
        setErr((prevErr) => ({
          ...prevErr,
          password2: "",
        }));
      }
    }

    if (!submit) return setLoading(false);
    setErr({
      email: "",
      password: "",
      password2: "",
      general: "",
    });

    const query = await fetch(
      `${import.meta.env.VITE_API}${loginState ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          v: import.meta.env.VITE_G,
          email: email,
          password: password,
        }),
      }
    );
    if (query.status == 200) {
      setLoading(false);
      const response = await query.json();
      localStorage.setItem("jwtToken", response.jwtToken);
      setUser(email);
      e.target.email.value = "";
      e.target.password.value = "";

      if (!loginState) {
        e.target.password2.value = "";
      }
    } else {
      setLoading(false);
      const err = await query.json();
      setErr((prevErr) => ({
        ...prevErr,
        general: err.error,
      }));
    }
  };

  return (
    <div className="flex bg-[--clsec] animate-fadeUP1">
      <div className="basis-[60%] max-md:basis-[100%] flex flex-col gap-[3vh] min-h-[100svh] justify-center items-center ">
        <div className="bg-[--c30] rounded shadow-lg shadow-[#535353] flex flex-col w-[80%] p-4 min-h-[80svh] justify-start border-2 border-[--c12] max-w-[650px]">
          <p className="font-black text-3xl tracking-widest text-center">
            HIPPOS
          </p>
          <img
            className="mx-auto max-w-[15svh] max-h-[15svh]"
            src="./assets/d956248b8cfe7fe8fa39033b50728bcb.jpg"
          />
          <div className="text-center">
            <p className="font-bold text-lg">Welcome!</p>
            <p>Please enter your details below</p>
          </div>
          <div className="text-center">
            <div className="my-4 py-4 flex justify-center gap-10 text-[3rem]">
              <FcGoogle className="transition hover:scale-[1.2] cursor-pointer text-[3.3rem]" />
              <BsFacebook
                style={{ fill: "#4267B2" }}
                className="transition hover:scale-[1.2] cursor-pointer"
              />
            </div>
            <p className="text-[#bbbaba] text-sm">- Or use email -</p>
          </div>
          <div className="grow">
            <form
              onSubmit={performValidation}
              className={`${
                !loginState ? "flex" : "hidden"
              } flex-col mx-auto my-[2vh] w-[100%] max-w-[500px] max-sm:max-w-[90vw] grow animate-fadeUP1`}
            >
              <input
                name="email"
                type="text"
                placeholder="Email"
                defaultValue=""
                required
                className="px-4 py-2 border-b-[--c60] border-b-2"
              />
              {err.email && <p>{err.email}</p>}
              <input
                name="password"
                type="text"
                placeholder="Password"
                defaultValue=""
                required
                className="px-4 py-2 border-b-[--c60] border-b-2"
              />
              {err.password && <p>{err.password}</p>}

              <input
                name="password2"
                type="text"
                placeholder="Confirm Password"
                defaultValue=""
                required
                className="px-4 py-2 border-b-[--c60] border-b-2"
              />
              {err.password2 && <p>{err.password2}</p>}

              {err.general && (
                <p className="my-4 bg-[--cldan] p-2 rounded">
                  🔴 {err.general}
                </p>
              )}
               {loading ? (
                <div className="ui-loader loader-blk mx-auto animate-fadeUP1 mt-10">
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
              ) : (
                <button
                  disabled={loading}
                  className=" animate-fadeUP1 bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"
                >
                  Register
                </button>
              )}
            </form>
            <form
              onSubmit={performValidation}
              className={`${
                loginState ? "flex" : "hidden"
              } flex-col mx-auto my-[2vh] w-[100%] max-w-[500px] max-sm:max-w-[90vw] grow animate-fadeUP1`}
            >
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

              {err.general && (
                <p className="my-4 bg-[--cldan] p-2 rounded">
                  🔴 {err.general}
                </p>
              )}

              {loading ? (
                <div className="ui-loader loader-blk mx-auto animate-fadeUP1 mt-10">
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
              ) : (
                <button
                  disabled={loading}
                  className=" animate-fadeUP1 bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"
                >
                  Log in
                </button>
              )}
            </form>
          </div>
          <div className="text-center flex items-center gap-4 mx-auto max-[400px]:flex-col ">
            <button className="basis-[46%] whitespace-nowrap bg-[#c4c4c4] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner">
              Forgot password?
            </button>
            <button
              onClick={() => setLoginState(!loginState)}
              href="#"
              className="basis-[46%] bg-[--c1] whitespace-nowrap rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner"
            >
              {loginState ? "Sign Up!" : "Log In!"}
            </button>
          </div>
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
