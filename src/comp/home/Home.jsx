import React, { useState, useEffect } from "react";
import "./Home.css";
import Auth from "../isAuth/Auth";
import VenueNTable from "./VenueNTable";

import { AiFillCaretRight, AiOutlineLeft } from "react-icons/ai";
import { BsFilterRight } from "react-icons/bs";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import MenuItem from "./MenuItem";
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	NavLink,
	useNavigate,
	useLocation,
} from "react-router-dom";

const Home = ({
	user,
	updateUser,
	menuitems,
	toggleGrid,
	setToggleGrid,
	toggleFilters,
	setToggleFilters,
	searchValue,
	setSearchValue,
	selectedKCal,
	setSelectedKCal,
	selectedDietary,
	setSelectedDietary,
	venues,
	venueNtable,
	setVenueNtable,
}) => {
	useEffect(() => {}, [user]);

	if (!user || user === "") {
		return <Auth updateUser2={updateUser} />;
	} else {
		const handleInputChange = (event) => {
			setSearchValue(event.target.value);
		};

		const [viewSearch, setViewSearch] = useState(false);
		const nav = useNavigate();

		const location = useLocation();
		const isBaseRoute = location.pathname === "/";

		const handleF1 = (event) => {
			setSelectedKCal(event.target.name);
		};
		const handleF2 = (event) => {
			setSelectedDietary(event.target.name);
		};

		const handleItemClick = (c, i) => {
			// Navigate to the item details route
			nav(`/${c}/${i}`);
		};
		if (!venueNtable.venue || !venueNtable.table)
			return (
				<VenueNTable
					venues={venues}
					venueNtable={venueNtable}
					setVenueNtable={setVenueNtable}
				/>
			);

		

		return (
			<div
				className={`basis-[80%] flex flex-col bg-[--c60] z-10 ${
					isBaseRoute ? "overflow-y-scroll" : "overflow-y-hidden"
				} relative`}>
				<div className="flex flex-col gap-4 ">
					<div className="searchBar flex flex-col relative gap-4">
						<div className="relative flex  mr-4 items-center max-[350px]:flex-wrap  max-[350px]:justify-center">
							<div className="relative grow mx-4">
								<input
									type="text"
									placeholder="Search..."
									className="w-[98%] mx-auto pl-10 pr-10 py-2 my-2 rounded"
									value={searchValue}
									onChange={handleInputChange}
								/>
								<span className="absolute top-[28px] left-2 -translate-y-3">
									🔍
								</span>
								<button
									onClick={() => setSearchValue("")}
									className={`absolute top-[28px] right-5 -translate-y-3 ${
										searchValue ? "" : "hidden"
									}
									`}>
									✖
								</button>
							</div>
							<button
								onClick={() => setToggleFilters(!toggleFilters)}
								className="whitespace-nowrap bg-[--c1] rounded px-3 border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none h-[40px] text-4xl">
								<BsFilterRight />
							</button>
							<button
								onClick={() => setToggleGrid(!toggleGrid)}
								className={`md:hidden whitespace-nowrap bg-[--c1] rounded ml-4 px-3 border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none h-[40px] text-4xl 
								${
									selectedKCal === "clear" &&
									selectedDietary === "clear" &&
									searchValue === ""
										? ""
										: "hidden"
								}
								}`}>
								{toggleGrid ? <CiGrid41 /> : <CiGrid2H />}
							</button>
						</div>

						<div
							className={`${
								toggleFilters ? "flex" : "hidden"
							} gap-4 px-4 pb-2 flex-nowrap overflow-auto`}>
							<button
								name="clear"
								onClick={handleF1}
								className={`whitespace-nowrap bg-[--c30] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedKCal === "clear"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								✖
							</button>
							<button
								name="300"
								onClick={handleF1}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedKCal === "300"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								&#60; 300 KCal
							</button>
							<button
								name="600"
								onClick={handleF1}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedKCal === "600"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								&#60; 600 KCal
							</button>
							<button
								name="900"
								onClick={handleF1}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedKCal === "900"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								&#60; 900 KCal
							</button>
							<button
								name="1200"
								onClick={handleF1}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedKCal === "1200"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								&#60; 1200 KCal
							</button>
						</div>
						<div
							className={`${
								toggleFilters ? "flex" : "hidden"
							} gap-4 px-4 pb-2 flex-nowrap overflow-auto`}>
							<button
								name="clear"
								onClick={handleF2}
								className={`whitespace-nowrap bg-[--c30] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedDietary === "clear"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								✖
							</button>
							<button
								name="dairy free"
								onClick={handleF2}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedDietary === "dairy free"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								Dairy Free
							</button>
							<button
								name="gluten free"
								onClick={handleF2}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedDietary === "gluten free"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								Gluten Free
							</button>
							<button
								name="nut free"
								onClick={handleF2}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedDietary === "nut free"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								Nut Free
							</button>
							<button
								name="vegan"
								onClick={handleF2}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedDietary === "vegan"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								Vegan
							</button>
							<button
								name="vegetarian"
								onClick={handleF2}
								className={`whitespace-nowrap bg-[--c1] rounded px-3 py-1 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block  active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none ${
									selectedDietary === "vegetarian"
										? "shadow-inner shadow-black"
										: "shadow-xl"
								}`}>
								Vegetarian
							</button>
						</div>
					</div>

					<div
						className={`relative ${
							toggleGrid ? "grid-cols-1" : "grid-cols-2"
						} ${
							selectedKCal === "clear" &&
							selectedDietary === "clear" &&
							searchValue === ""
								? "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
								: "flex"
						} `}>
						<Outlet />

						{selectedKCal === "clear" &&
						selectedDietary === "clear" &&
						searchValue === "" ? (
							menuitems.map((item, index) => (
								<div
									key={index}
									className="p-2 flex flex-col cursor-pointer hover:scale-[0.98] transition-all border-b-2 animate-fadeUP1 opacity-0" style={{animationDelay:`0.${index}s`}}
									onClick={() => nav(item.name)}>
									<img
										src={item.img}
										className="h-[100px] w-[100%]"
										style={{ objectFit: "cover", overflow: "hidden" }}
									/>
									<div className="flex justify-between items-center">
										<p>{item.name}</p>
										<AiFillCaretRight className="bg-[--c1] rounded p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none" />
									</div>
								</div>
							))
						) : (
							<ul className="w-[100%]">
								{menuitems.map((menuItem, index) => {
									// console.log(menuItem);
									return menuItem.items
										.filter(
											(item) =>
												(item.name
													.toLowerCase()
													.indexOf(searchValue.toLowerCase()) >= 0 ||
													item.name
														.toLowerCase()
														.includes(searchValue.toLowerCase()) ||
													item.ingredients.some((ingredient) =>
														ingredient
															.toLowerCase()
															.includes(searchValue.toLowerCase()),
													)) &&
												(selectedKCal === "clear" ||
													selectedKCal >= item.cal) &&
												(selectedDietary === "clear" ||
													item.allergens.includes(selectedDietary) ||
													item.tag.includes(selectedDietary)),
										)
										.map((menuItem2, index2) => {
											// console.log(menuItem2);
											return (
												<li key={index2}>
													<div
														className="flex border-b-2 p-4 active:bg-[--clsec] hover:scale-[0.98] transition gap-4"
														onClick={() =>
															handleItemClick(menuItem.name, menuItem2.name)
														}>
														<div className="grow">
															<p className="font-bold text-xl">
																{menuItem2.name}
															</p>
															<p className="text-sm capitalize">
																{menuItem2.ingredients.map((itemz, index) => (
																	<span key={index}>
																		<span>{itemz}</span>
																		{index !==
																			menuItem2.ingredients.length - 1 && (
																			<span>, </span>
																		)}
																	</span>
																))}
															</p>
														</div>
														<div>
															<p className="font-bold text-xl text-end">
																£{parseFloat(menuItem2.price).toFixed(2)}
															</p>
															<p className="text-sm whitespace-nowrap text-end">
																{menuItem2.cal} kcal
															</p>
														</div>
														<div>
															<AiFillCaretRight className=" bg-[--c1] rounded my-auto p-[2px] text-xl font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none" />
														</div>
													</div>
												</li>
											);
										});
								})}
							</ul>
						)}
					</div>
				</div>
			</div>
		);
	}
};

export default Home;
