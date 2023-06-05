import React from "react";
import { Outlet } from "react-router-dom";

import MobileFooter from "../navBars/MobileFooter";
import MobileHeader from "../navBars/MobileHeader";

const Layout = ({ user, setUser, basketQty }) => {

	return (
		<div className="flex flex-col justify-center h-[100svh]">
			{user && <MobileHeader user={user} />}
			<Outlet />
			{user && <MobileFooter user={user} basketQty={basketQty} />}
		</div>
	);
};

export default Layout;
