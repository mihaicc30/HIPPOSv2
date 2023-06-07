import React, { useEffect, useState } from "react";
import "./Basket.css";

const Basket = ({ menuitems, basketItems, setBasketItems }) => {
	const [computedBasket, setComputedBasket] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const matchingItems = menuitems.reduce((items, category) => {
			const matchedItems = category.items
				.filter((item) =>
					basketItems.some((basketItem) => basketItem.item === item.name),
				)
				.map((item) => ({
					...item,
					course: parseInt(
						basketItems.find((basketItem) => basketItem.item === item.name)
							.course,
					),
					qty: parseInt(
						basketItems.find((basketItem) => basketItem.item === item.name).qty,
					),
				}));
			return [...items, ...matchedItems];
		}, []);
		setComputedBasket(matchingItems);
		if (basketItems.length > 0) checkIfCoursesNeedRefactoring();
	}, [basketItems]);

	useEffect(() => {
		const totalPrice = calculateTotalPrice(computedBasket);
		setTotalPrice(totalPrice);
	}, [computedBasket]);

	const calculateTotalPrice = (basketItems) => {
		const totalPrice = basketItems.reduce(
			(total, item) => total + parseFloat(item.price * item.qty),
			0,
		);
		return totalPrice.toFixed(2);
	};

	const isConsecutive = (arr) => {
		const sortedArr = arr.sort((a, b) => a - b); // Sort the array in ascending order
		for (let i = 0; i < sortedArr.length - 1; i++) {
			if (sortedArr[i] + 1 !== sortedArr[i + 1]) {
				return false; // Numbers are not consecutive
			}
		}
		return true; // Numbers are consecutive
	};

	const checkIfCoursesNeedRefactoring = () => {
		const uniqueCourses = [...new Set(basketItems.map((item) => item.course))];
		console.log("🚀 ~ file: Basket.jsx:55 ~ checkIfCoursesNeedRefactoring ~ uniqueCourses:", uniqueCourses)
		if (!uniqueCourses) return;
		const areCoursesConsecutive = isConsecutive(uniqueCourses);
		if (!uniqueCourses.includes(1) || !areCoursesConsecutive) {
			console.log("Basket needs refactoring.");
			const updatedBasketItems = basketItems.map((item) => {
				console.log(item, item.course);
				const newCourse =
					item.course > 1 && !uniqueCourses.includes(item.course - 1) 
						? item.course - 1
						: item.course;
				return {
					...item,
					// course: newCourse > 1 ? newCourse : 1,
					course: newCourse > 1 ? newCourse : item.course == 0 ? 0 : 1
				};
			});
			setBasketItems(updatedBasketItems);
		} else {
			console.log("Basket does not need refactoring.");
		}
	};

	const handleIncrement = (item) => {
		const updatedBasket = computedBasket.map((basketItem) => {
			if (basketItem.name === item.name) {
				const updatedQty = basketItem.qty + 1;
				return {
					...basketItem,
					qty: updatedQty,
				};
			}
			return basketItem;
		});

		const updatedBasketItems = basketItems.map((basketItem) => {
			if (basketItem.item === item.name) {
				const updatedQty = parseInt(basketItem.qty) + 1;
				return {
					...basketItem,
					qty: updatedQty.toString(),
				};
			}
			return basketItem;
		});

		setComputedBasket(updatedBasket);
		setBasketItems(updatedBasketItems);
	};

	const handleDecrement = (item) => {
		if (item.qty == 1) {
			const updatedBasket = computedBasket.filter(
				(basketItem) => basketItem.name !== item.name,
			);
			const updatedBasketItems = basketItems.filter(
				(basketItem) => basketItem.item !== item.name,
			);
			setComputedBasket(updatedBasket);
			setBasketItems(updatedBasketItems);
		} else {
			const updatedBasket = computedBasket.map((basketItem) => {
				if (basketItem.name === item.name && basketItem.qty > 0) {
					const updatedQty = basketItem.qty - 1;
					return {
						...basketItem,
						qty: updatedQty,
					};
				}
				return basketItem;
			});

			const updatedBasketItems = basketItems.map((basketItem) => {
				if (basketItem.item === item.name && parseInt(basketItem.qty) > 0) {
					const updatedQty = parseInt(basketItem.qty) - 1;
					return {
						...basketItem,
						qty: updatedQty.toString(),
					};
				}
				return basketItem;
			});

			setComputedBasket(updatedBasket);
			setBasketItems(updatedBasketItems);
		}
	};

	const getUniqueCourses = () => {
		const uniqueCourses = basketItems.reduce((courses, item) => {
			if (!courses.includes(item.course)) {
				courses.push(item.course);
			}
			return courses;
		}, []);

		return uniqueCourses.sort((a, b) => a - b);
	};

	const handleCourseChange = (itemz, e) => {
		console.log(itemz, e);
		const updatedBasketItems = basketItems.map((item) => {
			if (item.item === itemz) {
				console.log(
					"🚀 ~ file: Basket.jsx:154 ~ updatedBasketItems ~ item:",
					item,
				);
				return {
					...item,
					course: parseInt(e),
				};
			}
			return item;
		});
		console.log(
			"🚀 ~ file: Basket.jsx:163 ~ updatedBasketItems ~ updatedBasketItems:",
			updatedBasketItems,
		);

		setBasketItems(updatedBasketItems);
	};

	return (
		<div className="basis-[80%] bg-[--c60] z-10 overflow-y-scroll flex flex-col">
			<div className="flex flex-col text-center my-4 pb-4 border-b-2 text-xl">
				<p>The White Lion</p>
				<p>Table: 6</p>
			</div>
			<div className="products flex flex-col gap-4 px-4 my-4  overflow-auto">
				{getUniqueCourses().includes(0) && <p className="border-b-8">Drinks</p>}
				{computedBasket.map((item, index) => {
					if (item.course === 0) {
						return (
							<div
								key={crypto.randomUUID()}
								className="product flex gap-2 pb-2 border-b-2">
								{/* <img src={item.img} alt={item.name} /> */}
								<div
									className="grow flex flex-col justify-start"
									key={crypto.randomUUID()}>
									<p className="font-bold text-xl line-clamp-1">{item.name}</p>

									<div className="flex gap-2 justify-start text-md items-center">
										<button
											className="px-3 py-1 rounded-full border-2"
											onClick={() => handleDecrement(item)}>
											-
										</button>
										<span className="quantity">{item.qty}</span>
										<button
											className="px-3 py-1 rounded-full border-2"
											onClick={() => handleIncrement(item)}>
											+
										</button>
									</div>
								</div>
								<div key={crypto.randomUUID()}>
									<p className="text-xl text-end">Total:</p>
									<p className="font-bold text-xl text-end">
										£
										{(parseFloat(item.price) * parseFloat(item.qty)).toFixed(2)}
									</p>
								</div>
							</div>
						);
					}
					return null; // or handle the case when the condition is not met
				})}
				{getUniqueCourses().map((course) => {
					// console.log(computedBasket);
					if (course !== 0)
						return (
							<div key={crypto.randomUUID()}>
								<p className="border-b-8">
									Course {course}
									{course > 0 && course < 2 && getUniqueCourses().length > 1
										? "(first to serve)"
										: ""}
								</p>
								{computedBasket
									.filter((item) => item.course === course)
									.map((item) => {
										if (item.course > 0)
											return (
												<div
													key={crypto.randomUUID()}
													className="product flex gap-2 pb-2 border-b-2">
													{/* <img src={item.img} alt={item.name} /> */}
													<div className="grow flex flex-col justify-start">
														<p className="font-bold text-xl line-clamp-1">
															{item.name}
														</p>
														<div>
															<span>Course </span>
															<select
																className="appearance-none bg-[--c1] rounded px-3 text-center font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none"
																name="courseNumber"
																defaultValue={item.course}
																onChange={(event) =>
																	handleCourseChange(
																		item.name,
																		event.target.value,
																	)
																}>
																{getUniqueCourses().map((course, index) => {
																	if (course !== 0)
																		return (
																			<option
																				className="text-center"
																				value={course}
																				key={crypto.randomUUID()}>
																				{course}
																			</option>
																		);
																})}
																<option
																	className="text-center"
																	value={
																		getUniqueCourses()[
																			getUniqueCourses().length - 1
																		] + 1
																	}
																	key={crypto.randomUUID()}>
																	{getUniqueCourses()[
																		getUniqueCourses().length - 1
																	] + 1}
																</option>
															</select>
														</div>
														<span className="text-xs font-normal">
															{item.cal} kcal
														</span>
														<div className="flex gap-2 justify-start text-md items-center">
															<button
																className="px-3 py-1 rounded-full border-2"
																onClick={() => handleDecrement(item)}>
																-
															</button>
															<span className="quantity">{item.qty}</span>
															<button
																className="px-3 py-1 rounded-full border-2"
																onClick={() => handleIncrement(item)}>
																+
															</button>
														</div>
													</div>
													<div>
														<p className="text-xl text-end">Total:</p>
														<p className="font-bold text-xl text-end">
															£
															{(
																parseFloat(item.price) * parseFloat(item.qty)
															).toFixed(2)}
														</p>
													</div>
												</div>
											);
									})}
							</div>
						);
				})}
			</div>

			<p className="text-3xl text-center my-4 pt-4 border-t-2">
				TOTAL £{totalPrice}
			</p>
			<button
				disabled={parseFloat(totalPrice) <= 0}
				className="bg-[--c1] rounded px-3 text-center py-3 my-4 mx-4 font-bold border-b-2 border-b-[--c2] text-[--c2] relative inline-block shadow-xl active:shadow-black active:shadow-inner disabled:bg-[#cecdcd] disabled:text-[#ffffff] disabled:active:shadow-none">
				Payment
			</button>
		</div>
	);
};

export default Basket;
