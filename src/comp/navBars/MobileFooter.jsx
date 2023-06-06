import React, { useState, useEffect } from "react";
import "./MobileFooter.css";

import { useNavigate } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";
import { BsLayoutTextWindowReverse, BsBoxArrowRight } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineSettingsSuggest } from "react-icons/md";

const MobileFooter = ({basketQty}) => {
	const nav = useNavigate();
	const [activeIndex, setActiveIndex] = useState("");

	useEffect(() => {}, [activeIndex]);

	const handleDivClick = (index) => {
		setActiveIndex(index);
		nav(`/${index}`);
	};

	return (
		<div className="MobileFooter basis-[10%] flex justify-center gap-4 bg-[--c60] py-4 relative max-md:gap-1">
			<div
				className={`basis-[18%] transition-all cursor-pointer hover:scale-[0.98] active:scale-[0.90] rounded-3xl flex flex-col text-center text-lg justify-center font-semibold ${
					activeIndex === "" ? "MAFA" : ""
				}`}
				onClick={() => handleDivClick("")}>
				<span className="mx-auto text-3xl">
					<MdRestaurantMenu />
				</span>
				<p className={activeIndex === "" ? "" : "max-sm:hidden"}>Menu</p>
			</div>
			<div
				className={`basis-[18%] transition-all cursor-pointer hover:scale-[0.98] active:scale-[0.90] rounded-3xl flex flex-col text-center text-lg justify-center font-semibold ${
					activeIndex === "Receipts" ? "MAFA" : ""
				}`}
				onClick={() => handleDivClick("Receipts")}>
				<span className="mx-auto text-2xl">
					<BsLayoutTextWindowReverse />
				</span>
				<p className={activeIndex === "Receipts" ? "" : "max-sm:hidden"}>
					Receipts
				</p>
			</div>
			<div
				className={`relative border-2 basis-[18%] transition-all cursor-pointer hover:scale-[0.98] active:scale-[0.90] rounded-3xl flex flex-col text-center text-lg justify-center font-semibold ${
					activeIndex === "Basket" ? "MAFA" : ""
				}`}
				onClick={() => handleDivClick("Basket")}>
				<span className="mx-auto text-2xl">
					<RiShoppingCartLine />
				</span>
				<span className="absolute top-[10%] right-[10%] translate-x-[50%] translate-y-[-50%] z-2 bg-[--c60] p-[2px] w-[32px] h-[32px] rounded-full text-sm">
					{basketQty}
				</span>
				<p className={activeIndex === "Basket" ? "" : "max-sm:hidden"}>
					Basket
				</p>
			</div>
			<div
				className={`basis-[18%] transition-all cursor-pointer hover:scale-[0.98] active:scale-[0.90] rounded-3xl flex flex-col text-center text-lg justify-center font-semibold ${
					activeIndex === "Settings" ? "MAFA" : ""
				}`}
				onClick={() => handleDivClick("Settings")}>
				<span className="mx-auto text-2xl">
					<MdOutlineSettingsSuggest />
				</span>
				<p className={activeIndex === "Settings" ? "" : "max-sm:hidden"}>
					Settings
				</p>
			</div>
			<div
				className={`basis-[18%] transition-all cursor-pointer hover:scale-[0.98] active:scale-[0.90] rounded-3xl flex flex-col text-center text-lg justify-center font-semibold ${
					activeIndex === "SignOut" ? "MAFA" : ""
				}`}
				onClick={() => handleDivClick("SignOut")}>
				<span className="mx-auto text-2xl">
					<BsBoxArrowRight />
				</span>
				<p className={activeIndex === "SignOut" ? "" : "max-sm:hidden"}>
					Sign Out
				</p>
			</div>
		</div>
	);
};

export default MobileFooter;
