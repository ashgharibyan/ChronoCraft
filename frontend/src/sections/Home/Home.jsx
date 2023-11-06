import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HomePageProvider, useHomePage } from "../../contexts/HomePageContext";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import ContactForm from "./ContactForm";
import About from "./About";
import Features from "./Features";

const Home = () => {
	const navigate = useNavigate();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const {
		aboutRef,
		featuresRef,
		pricingRef,
		contactRef,
		testimonialsRef,
		topPageRef,
	} = useHomePage();
	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			navigate("/dashboard");
		}

		topPageRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}, []);
	return (
		<main ref={topPageRef} className="relative ">
			<section id="hero">
				<Hero />
			</section>
			<section ref={aboutRef} id="about">
				<About />
			</section>
			<section ref={featuresRef} id="features">
				<Features />
			</section>
			<section ref={testimonialsRef} id="testimonials">
				<Testimonials />
			</section>
			<section ref={pricingRef} id="pricing">
				<Pricing />
			</section>
			<section ref={contactRef} id="contact">
				<ContactForm />
			</section>
		</main>
	);
};

export default Home;
