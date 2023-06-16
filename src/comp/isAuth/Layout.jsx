import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase/config.jsx";
import { useAuthState } from "react-firebase-hooks/auth";

import MobileFooter from "../navBars/MobileFooter";
import MobileHeader from "../navBars/MobileHeader";

const Layout = ({ basketQty }) => {
  const [user, loading, error] = useAuthState(auth);
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/menu");
    if (!user) nav("/auth");
  }, [user]);

  return (
    <div className="flex flex-col justify-center h-[100svh] relative">
      {user && <MobileHeader user={user.email} />}
      <Outlet />
      {user && <MobileFooter user={user.email} basketQty={basketQty} />}
    </div>
  );
};

export default Layout;
