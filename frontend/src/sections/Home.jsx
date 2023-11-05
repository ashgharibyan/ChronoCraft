import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";
import Pricing from "../components/Home/Pricing";
import ContactForm from "../components/Home/ContactForm";
import { HomePageProvider, useHomePage } from "../contexts/HomePageContext";

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
