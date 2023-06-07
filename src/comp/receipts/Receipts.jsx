import React from "react";
import "./Receipts.css";

const Receipts = ({ receipts }) => {
	const getUniqueYears = () => {
		const years = new Set(receipts.map((receipt) => receipt.year));
		return Array.from(years).filter((year) => year);
	};

	const getUniqueMonths = () => {
		const months = new Set(receipts.map((receipt) => receipt.month));
		return Array.from(months).filter((month) => month);
	};

	return (
		<div className="basis-[80%] bg-[--c60] z-10 overflow-y-scroll px-2">
			{getUniqueYears().map((year) => (
				<details className="pl-1" key={year}>
					<summary className="py-2 border-b-2 bg-[--c12]">{year}</summary>
					{getUniqueMonths().map((month) => (
						<details className="pl-1 bg-[#f5b06f3d]" key={month}>
							<summary>{month}</summary>
							{receipts.map((receipt, index) => {
								if (receipt.year === year && receipt.month === month) {
									return (
										<div
											key={index}
											className="receipt border-t-2 border-b-2 my-4 text-sm bg-[--c30] py-2">
											<details className="pl-5">
												<summary>
													Receipt Number: {receipt.receiptNumber}
												</summary>
												<div>
													<p className="font-bold">Venue: {receipt.pubName}</p>
													<p>Address: {receipt.address}</p>
													<p>Phone: {receipt.phone}</p>
													<p>Website: {receipt.website}</p>
													<p className="font-bold">Date: {receipt.dateTime}</p>
													<div className="flex flex-1">
														<table className="w-[100%]">
															<thead>
																<tr className="border-2">
																	<th className="border-2">Item</th>
																	<th className="border-2">Quantity</th>
																	<th className="border-2">Price</th>
																	<th className="border-2">Total</th>
																</tr>
															</thead>
															<tbody>
																{receipt.items.map((item, itemIndex) => (
																	<tr key={itemIndex} className="text-center">
																		<td className="line-clamp-2 border-2">
																			{item.item}
																		</td>
																		<td className="border-2">{item.qty}</td>
																		<td className="border-2">£{item.price}</td>
																		<td className="border-2">
																			£{(item.qty * item.price).toFixed(2)}
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</div>
													<p>VAT: £{receipt.vat.toFixed(2)}</p>
													<p className="font-bold">
														Total Amount: £{receipt.totalAmount.toFixed(2)}
													</p>
													<p>Payment Method: {receipt.paymentMethod}</p>
													<p>Card Number: {receipt.cardNumber}</p>
												</div>
											</details>
										</div>
									);
								}
								return null;
							})}
						</details>
					))}
				</details>
			))}
		</div>
	);
};

export default Receipts;
