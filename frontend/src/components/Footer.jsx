import React from "react";
import logo from "../assets/logo.png";
import { useGeneral } from "../contexts/GeneralContext";
import { useHomePage } from "../contexts/HomePageContext";
import { Link } from "react-router-dom";
const Footer = () => {
	const {
		aboutRef,
		featuresRef,
		topPageRef,
		pricingRef,
		contactRef,
		testimonialsRef,
	} = useHomePage();

	const scrollToRef = (ref) => {
		ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	const scrollToRefMobile = (ref) => {
		setMobileMenuOpen(false);
		ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<footer className="bg-white  mt-auto">
			<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link
						to="/"
						onClick={() => scrollToRef(topPageRef)}
						className="flex items-center mb-4 sm:mb-0"
					>
						<img
							src={logo}
							className="h-10 mr-3"
							alt="ChronoCraft Logo"
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap text-[#4f46e5] ">
							ChronoCraft
						</span>
					</Link>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
						<li>
							<Link
								to="/"
								className="mr-4 hover:underline md:mr-6 "
								onClick={() => scrollToRef(aboutRef)}
							>
								About
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className="mr-4 hover:underline md:mr-6"
							>
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className="mr-4 hover:underline md:mr-6 "
							>
								Licensing
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className="hover:underline"
								onClick={() => scrollToRef(contactRef)}
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center ">
					© 2023{" "}
					<Link to="/" className="hover:underline">
						ChronoCraft™
					</Link>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
