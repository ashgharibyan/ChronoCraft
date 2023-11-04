import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	PhoneIcon,
	PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { useUser } from "../contexts/UserContext";
import logo from "../assets/logo.png";
import { useHomePage } from "../contexts/HomePageContext";

const products = [
	{
		name: "Project Management",
		description:
			"Plan, manage, and collaborate on any project from one place",
		href: "/products",
		icon: ChartPieIcon,
	},
	{
		name: "Task Management",
		description:
			"Prioritize, assign, and manage tasks from start to finish",
		href: "/products",
		icon: CursorArrowRaysIcon,
	},
	{
		name: "Portfolio Management",
		description:
			"Get a high-level overview of multiple projects, from progress to reporting",
		href: "/products",
		icon: FingerPrintIcon,
	},
	{
		name: "Resource Management",
		description:
			"Allocate and manage resources to balance workloads more efficiently",
		href: "/products",
		icon: SquaresPlusIcon,
	},
	{
		name: "Business Operations",
		description:
			"Streamline business workflows, from ops planning to supply chain management",
		href: "/products",
		icon: ArrowPathIcon,
	},
];
const callsToAction = [
	{ name: "Watch demo", href: "#", icon: PlayCircleIcon },
	{ name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { isLoggedIn, logIn, logOut } = useUser();

	const { aboutRef, featuresRef, pricingRef, contactRef, testimonialsRef } =
		useHomePage();

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			logIn();
		} else {
			logOut();
		}
	}, []);

	const scrollToRef = (ref) => {
		ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	const scrollToRefMobile = (ref) => {
		setMobileMenuOpen(false);
		ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<header className="bg-white sticky top-0 z-20 w-full">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1 gap-2 items-center">
					<Link on="/" className="-m-1.5 p-1.5">
						<span className="sr-only">ChronoCraft</span>
						<img className="h-10 w-auto" src={logo} alt="" />
					</Link>
					<Link to="/" className="">
						<span className="self-center text-[#4f46e5] text-2xl font-semibold whitespace-nowrap">
							ChronoCraft
						</span>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<Popover.Group className="hidden lg:flex lg:gap-x-12">
					<Popover className="relative">
						<Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
							Products
							<ChevronDownIcon
								className="h-5 w-5 flex-none text-gray-400"
								aria-hidden="true"
							/>
						</Popover.Button>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
								<div className="p-4">
									{products.map((item) => (
										<div
											key={item.name}
											className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
										>
											<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
												<item.icon
													className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
													aria-hidden="true"
												/>
											</div>
											<div className="flex-auto">
												<a
													href={item.href}
													className="block font-semibold text-gray-900"
												>
													{item.name}
													<span className="absolute inset-0" />
												</a>
												<p className="mt-1 text-gray-600">
													{item.description}
												</p>
											</div>
										</div>
									))}
								</div>
								<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
									{callsToAction.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
										>
											<item.icon
												className="h-5 w-5 flex-none text-gray-400"
												aria-hidden="true"
											/>
											{item.name}
										</a>
									))}
								</div>
							</Popover.Panel>
						</Transition>
					</Popover>
					<a
						onClick={() => scrollToRef(aboutRef)}
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						About Us
					</a>
					<a
						onClick={() => scrollToRef(testimonialsRef)}
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Testimonials
					</a>
					<a
						onClick={() => scrollToRef(pricingRef)}
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Pricing
					</a>

					<a
						onClick={() => scrollToRef(contactRef)}
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Contact Us
					</a>
				</Popover.Group>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					{isLoggedIn ? (
						<Link
							to="/dashboard"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Account <span aria-hidden="true">&rarr;</span>
						</Link>
					) : (
						<Link
							to="/login"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Log in <span aria-hidden="true">&rarr;</span>
						</Link>
					)}
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<Disclosure as="div" className="-mx-3">
									{({ open }) => (
										<>
											<Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
												Products
												<ChevronDownIcon
													className={classNames(
														open
															? "rotate-180"
															: "",
														"h-5 w-5 flex-none"
													)}
													aria-hidden="true"
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="mt-2 space-y-2">
												{[
													...products,
													...callsToAction,
												].map((item) => (
													<Disclosure.Button
														key={item.name}
														as="a"
														href={item.href}
														className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
													>
														{item.name}
													</Disclosure.Button>
												))}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
								<a
									onClick={() => scrollToRefMobile(aboutRef)}
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									About Us
								</a>
								<a
									onClick={() =>
										scrollToRefMobile(testimonialsRef)
									}
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Testimonials
								</a>
								<a
									onClick={() =>
										scrollToRefMobile(pricingRef)
									}
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Pricing
								</a>
								<a
									onClick={() =>
										scrollToRefMobile(contactRef)
									}
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Contact Us
								</a>
							</div>
							<div className="py-6">
								{isLoggedIn ? (
									<Link
										to="/dashboard"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Account
									</Link>
								) : (
									<Link
										to="/login"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Log in
									</Link>
								)}
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
};

export default NavBar;
