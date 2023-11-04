import React, { useState } from "react";
import { useGeneral } from "../../contexts/GeneralContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Products = () => {
	const {
		projectManagementRef,
		taskManagementRef,
		portfolioRef,
		resourceRef,
		businessRef,
	} = useGeneral();

	const [selectedProduct, setSelectedProduct] = useState("");

	const products = [
		{ id: "pm", title: "Project Management" },
		{ id: "tm", title: "Task Management" },
		{ id: "portm", title: "Portfolio Management" },
		{ id: "resm", title: "Resource Management" },
		{ id: "bop", title: "Business Operations" },
	];

	const productDetails = {
		pm: "Detailed content for Project Management...",
		tm: "Detailed content for Task Management...",
		portm: "Detailed content for Portfolio Management...",
		resm: "Detailed content for Resource Management...",
		bop: "Detailed content for Business Operations...",
	};

	return (
		<div className="bg-white text-gray-700">
			<div className="container mx-auto px-4">
				{/* Title and subtitle */}
				<div className="text-center py-8">
					<h1 className="text-4xl font-bold text-gray-900">
						Our Products
					</h1>
					<p className="text-gray-600 mt-2">
						Choose a product to learn more about what we offer.
					</p>

					<div className="grid grid-cols-2 gap-4">
						{/* Product boxes */}
						{products.map((product) => (
							<div
								key={product.id}
								onClick={() => setSelectedProduct(product.id)}
								className={`p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer ${
									selectedProduct === product.id
										? "ring-2 ring-indigo-600"
										: ""
								}`}
							>
								<label className="flex items-center">
									<input
										type="checkbox"
										checked={selectedProduct === product.id}
										onChange={() =>
											setSelectedProduct(product.id)
										}
										className={`form-checkbox h-6 w-6 ${
											selectedProduct === product.id
												? "text-indigo-600 border-indigo-600"
												: "text-gray-300 border-gray-300"
										}`}
									/>
									<h5 className="ml-2 text-gray-900 text-lg leading-tight font-medium mb-2">
										{product.title}
									</h5>
								</label>
							</div>
						))}
					</div>

					<div className="mt-6 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md">
						<p className="text-gray-700 text-base mb-4">
							{selectedProduct
								? productDetails[selectedProduct]
								: productDetails.default}
						</p>
					</div>

					{/* Get Started Button */}
					{selectedProduct && (
						<div className="flex justify-center mt-6">
							<button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
								Get Started
							</button>
						</div>
					)}
				</div>

				{/* Rest of your code remains unchanged... */}
			</div>

			{/* Call to Action Section */}
			<section className="py-12 px-4 bg-indigo-600 text-white">
				<div className="max-w-6xl mx-auto text-center">
					<h2 className="text-3xl font-semibold mb-4">
						Ready to get started?
					</h2>
					<p className="mb-6">
						Watch the demo or contact sales to learn more about
						ChronoCraft.
					</p>
					<div className="flex justify-center gap-4">
						<a
							href="#demo"
							className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg"
						>
							Watch Demo
						</a>
						<a
							href="#contact-sales"
							className="bg-transparent border-2 border-white font-semibold py-2 px-4 rounded-lg"
						>
							Contact Sales
						</a>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Products;
