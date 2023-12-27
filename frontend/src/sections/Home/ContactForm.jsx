import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import axios from "axios";

function getCookie(name) {
	let value = "; " + document.cookie;
	let parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const ContactForm = () => {
	const initialContactInfo = {
		first_name: "",
		last_name: "",
		company: "",
		email: "",
		phone_number: "",
		message: "",
		agreed: false,
	};
	const [contactInfo, setContactInfo] = useState(initialContactInfo);
	const [contactErrors, setContactErrors] = useState([]);

	const formAxios = () => {
		const csrfToken = getCookie("csrftoken");
		axios
			.post(
				"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/core/home/contact-form/",
				contactInfo,
				{
					withCredentials: true,
					headers: {
						"X-CSRFToken": csrfToken,
					},
				}
			)
			.then((res) => {
				console.log("SUCCESS in formAxios");
				console.log(res.data);
				setContactInfo(initialContactInfo);
			})
			.catch((err) => {
				console.log("ERROR in formAxios");
				console.log(err);
				console.log(err.response.data);
			});
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setContactErrors([]);
		setContactInfo((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSwitchChange = (isChecked) => {
		setContactErrors([]);
		setContactInfo((prevState) => ({ ...prevState, agreed: isChecked }));
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		setContactErrors([]);
		let errors = [];

		if (contactInfo.first_name === "") {
			errors.push("First name is required!");
		}
		if (contactInfo.last_name === "") {
			errors.push("Last name is required!");
		}
		if (contactInfo.company === "") {
			errors.push("Company is required!");
		}
		if (contactInfo.email === "") {
			errors.push("Email is required!");
		}
		if (contactInfo.phone_number === "") {
			errors.push("Phone number is required!");
		}
		if (contactInfo.message === "") {
			errors.push("Message is required!");
		}
		if (contactInfo.agreed === false) {
			errors.push("You must agree to the privacy policy!");
		}
		if (errors.length > 0) {
			setContactInfo(initialContactInfo);
			setContactErrors(errors);
			console.log("ERRORS");
			console.log(errors);
			return;
		}

		formAxios();

		console.log("SUCCESSSS after form axios");
		console.log(contactInfo);
	};

	return (
		<div className="isolate bg-gray-900  px-6 py-24 sm:py-32 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
					CONTACT US!
				</h2>
				<p className="mt-2 text-lg leading-8 text-gray-100">
					Get in touch with our sales team for tailored solutions,
					product inquiries, and exclusive offers.
				</p>
			</div>
			{contactErrors.length > 0
				? contactErrors.map((error, index) => (
						<div
							key={index}
							className="mt-6 mx-auto max-w-2xl text-center"
						>
							<p className="text-red-600">{error}</p>
						</div>
				  ))
				: null}
			<form
				action="/#"
				method="POST"
				onSubmit={handleFormSubmit}
				className="mx-auto mt-16 max-w-xl sm:mt-20"
			>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="first_name"
							className="block text-sm font-semibold leading-6 text-gray-50"
						>
							First name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="first_name"
								id="first_name"
								autoComplete="given-name"
								value={contactInfo.first_name}
								onChange={handleFormChange}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="last_name"
							className="block text-sm font-semibold leading-6 text-gray-50"
						>
							Last name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="last_name"
								id="last_name"
								autoComplete="family-name"
								onChange={handleFormChange}
								value={contactInfo.last_name}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="company"
							className="block text-sm font-semibold leading-6 text-gray-50"
						>
							Company
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="company"
								id="company"
								autoComplete="organization"
								onChange={handleFormChange}
								value={contactInfo.company}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 text-gray-50"
						>
							Email
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								onChange={handleFormChange}
								value={contactInfo.email}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="phone_number"
							className="block text-sm font-semibold leading-6 text-gray-50"
						>
							Phone number
						</label>
						<div className="relative mt-2.5">
							<div className="absolute inset-y-0 left-0 flex items-center">
								<label htmlFor="country" className="sr-only">
									Country
								</label>
								<select
									id="country"
									name="country"
									autoComplete="country"
									className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
								>
									<option>US</option>
									<option>CA</option>
									<option>EU</option>
								</select>
								<ChevronDownIcon
									className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
									aria-hidden="true"
								/>
							</div>
							<input
								type="tel"
								name="phone_number"
								id="phone_number"
								autoComplete="tel"
								onChange={handleFormChange}
								value={contactInfo.phone_number}
								className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block text-sm font-semibold leading-6 text-gray-50"
						>
							Message
						</label>
						<div className="mt-2.5">
							<textarea
								name="message"
								id="message"
								rows={4}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={handleFormChange}
								value={contactInfo.message}
							/>
						</div>
					</div>
					<Switch.Group
						as="div"
						className="flex gap-x-4 sm:col-span-2"
					>
						<div className="flex h-6 items-center">
							<Switch
								checked={contactInfo.agreed}
								onChange={handleSwitchChange}
								className={classNames(
									contactInfo.agreed
										? "bg-indigo-600"
										: "bg-gray-200",
									"flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								)}
							>
								<span className="sr-only">
									Agree to policies
								</span>
								<span
									aria-hidden="true"
									className={classNames(
										contactInfo.agreed
											? "translate-x-3.5"
											: "translate-x-0",
										"h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/2 transition duration-200 ease-in-out"
									)}
								/>
							</Switch>
						</div>
						<Switch.Label className="text-sm leading-6 text-gray-100">
							By selecting this, you agree to our{" "}
							<a
								href="#"
								className="font-semibold text-indigo-600"
							>
								privacy&nbsp;policy
							</a>
							.
						</Switch.Label>
					</Switch.Group>
				</div>
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Let's talk
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
