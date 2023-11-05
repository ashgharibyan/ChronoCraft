import React, { useState } from "react";
import { useGeneral } from "../../contexts/GeneralContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Products = () => {
	const { selectedProduct, setSelectedProduct } = useGeneral();

	const products = [
		{ id: "pm", title: "Project Management" },
		{ id: "tm", title: "Task Management" },
		{ id: "portm", title: "Portfolio Management" },
		{ id: "resm", title: "Resource Management" },
		{ id: "bop", title: "Business Operations" },
		{ id: "gas", title: "Goals & strategy" },
	];

	const productDetails = {
		pm: (
			<div>
				<p className="mb-4 text-lg text-gray-700">
					<strong className="font-bold">Project Management</strong> is
					the cornerstone of successful project delivery. It involves
					planning, executing, and overseeing projects to ensure they
					are completed within time, scope, and budget constraints.
					With our{" "}
					<strong className="font-bold">innovative tools</strong>, you
					can streamline workflows, enhance collaboration, and
					increase productivity. Effective project management leads to{" "}
					<strong className="font-bold">predictable outcomes</strong>,
					allowing teams to deliver high-quality results that align
					with business objectives.
				</p>

				<p className="text-lg text-gray-700">
					Our platform provides a comprehensive suite of features
					designed to support all aspects of{" "}
					<strong className="font-bold">project planning</strong> and
					execution. From{" "}
					<strong className="font-bold">resource allocation</strong>{" "}
					to <strong className="font-bold">risk assessment</strong>,
					and <strong className="font-bold">progress tracking</strong>
					, every phase of your project is meticulously catered for.
					Leverage the power of{" "}
					<strong className="font-bold">real-time analytics</strong>{" "}
					to make data-driven decisions and keep your team on the path
					to success. Embrace the full potential of professional
					project management with our tailored solutions.
				</p>
			</div>
		),
		tm: (
			<div className="text-lg text-gray-700">
				<p className="mb-4">
					<strong className="font-bold">Task Management</strong> is at
					the heart of project execution, providing a clear framework
					for tracking and managing the daily activities that drive
					progress. Our{" "}
					<strong className="font-bold">
						robust task management system
					</strong>{" "}
					simplifies the organization of tasks by priority and
					deadline, ensuring that nothing falls through the cracks. It
					enables seamless{" "}
					<strong className="font-bold">collaboration</strong> among
					team members, fostering an environment where productivity
					thrives.
				</p>
				<p>
					Enhance your team's efficiency with features like{" "}
					<strong className="font-bold">
						customizable task lists
					</strong>
					,{" "}
					<strong className="font-bold">integrated calendars</strong>,
					and{" "}
					<strong className="font-bold">interactive boards</strong>.
					Our system's flexibility supports various methodologies,
					from <strong className="font-bold">Kanban</strong> to{" "}
					<strong className="font-bold">Scrum</strong>, adapting to
					your project's needs. Stay ahead of deadlines with our
					intelligent task management solutions and drive your
					projects to successful completion.
				</p>
			</div>
		),

		portm: (
			<div className="text-lg text-gray-700">
				<p className="mb-4">
					<strong className="font-bold">Portfolio Management</strong>{" "}
					encompasses the strategic alignment of multiple projects,
					ensuring that they all contribute towards the overarching
					business goals. It demands a high level of oversight and the
					ability to{" "}
					<strong className="font-bold">
						make critical decisions
					</strong>{" "}
					about where to invest time and resources. Our platform
					facilitates this by providing{" "}
					<strong className="font-bold">holistic insights</strong>{" "}
					into every aspect of your project portfolio.
				</p>
				<p>
					Utilize our{" "}
					<strong className="font-bold">
						comprehensive dashboards
					</strong>{" "}
					to monitor the health and progress of your projects in
					real-time. Make data-driven decisions to prioritize projects
					and allocate resources where they are needed most. With our
					advanced portfolio management tools, you can achieve a
					balance between risk and return, ensuring{" "}
					<strong className="font-bold">sustainable success</strong>{" "}
					in your project execution.
				</p>
			</div>
		),

		resm: (
			<div className="text-lg text-gray-700">
				<p className="mb-4">
					<strong className="font-bold">Resource Management</strong>{" "}
					is a pivotal aspect of operational efficiency, involving the
					strategic planning, tracking, and allocation of assets and
					personnel. Our resource management tools offer{" "}
					<strong className="font-bold">
						unparalleled visibility
					</strong>{" "}
					into resource utilization, empowering you to maximize
					efficiency and avoid overallocation.
				</p>
				<p>
					With features such as{" "}
					<strong className="font-bold">
						real-time availability charts
					</strong>{" "}
					and{" "}
					<strong className="font-bold">demand forecasting</strong>,
					our system ensures that you have the right resources in the
					right place at the right time. Optimize your workforce and
					asset allocation with our intuitive resource management
					solutions, and drive your projects forward with confidence.
				</p>
			</div>
		),

		bop: (
			<div className="text-lg text-gray-700">
				<p className="mb-4">
					<strong className="font-bold">Business Operations</strong>{" "}
					are the lifeblood of any organization, encompassing the
					myriad of processes and systems that create value and drive
					growth. Our platform provides a{" "}
					<strong className="font-bold">centralized hub</strong> for
					managing these complex operations, from{" "}
					<strong className="font-bold">
						supply chain logistics
					</strong>{" "}
					to <strong className="font-bold">customer relations</strong>
					.
				</p>
				<p>
					Streamline your operations with our{" "}
					<strong className="font-bold">automated workflows</strong>{" "}
					and{" "}
					<strong className="font-bold">custom integrations</strong>.
					Gain insights into operational performance with our{" "}
					<strong className="font-bold">advanced analytics</strong>,
					and continuously improve your processes to stay competitive.
					With our comprehensive tools for business operations, turn
					efficiency into a strategic advantage.
				</p>
			</div>
		),

		gas: (
			<div className="text-lg text-gray-700">
				<p className="mb-4">
					<strong className="font-bold">Goals & Strategy</strong>{" "}
					articulation is the driving force behind long-term success,
					providing direction and focus for all organizational
					activities. Our solutions offer a clear framework for
					setting, tracking, and achieving strategic objectives,
					aligning every project and task with your company's vision.
				</p>
				<p>
					Embrace a goal-oriented culture with our{" "}
					<strong className="font-bold">target-setting tools</strong>{" "}
					and{" "}
					<strong className="font-bold">
						progress monitoring systems
					</strong>
					. Our platform ensures that every team member is working
					towards common goals, creating synergy and propelling the
					organization towards its strategic milestones with cohesion
					and clarity.
				</p>
			</div>
		),
	};

	return (
		<div className="bg-white text-gray-700">
			<div className="container mx-auto px-4">
				{/* Title and subtitle */}
				<div className="text-center py-8">
					<h1 className="text-4xl font-bold text-gray-900">
						Our Products
					</h1>
					<p className="text-indigo-600 text-lg mt-2">
						Choose a product to learn more about what we offer.
					</p>

					<div className="grid grid-cols-2 gap-4 mt-10 ">
						{/* Product boxes */}
						{products.map((product) => (
							<div
								key={product.id}
								onClick={() => setSelectedProduct(product.id)}
								className={`flex justify-center items-center p-6 max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer ${
									selectedProduct === product.id
										? "ring-2 ring-indigo-600"
										: ""
								}`}
							>
								<label className="flex items-center text-center">
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
									<h5 className="ml-2 text-gray-900 text-lg leading-tight font-medium ">
										{product.title}
									</h5>
								</label>
							</div>
						))}
					</div>

					{selectedProduct ? (
						<div className="mt-6 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md">
							<div className="text-gray-700 text-base mb-4">
								{productDetails[selectedProduct]}
							</div>
						</div>
					) : (
						productDetails.default
					)}

					{/* Get Started Button */}
					{selectedProduct && (
						<div className="flex justify-center mt-6">
							<Link
								to="/sign-up"
								className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
							>
								Get Started
							</Link>
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
