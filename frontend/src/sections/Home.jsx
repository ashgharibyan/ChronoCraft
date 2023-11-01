import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div>
      <main className="relative">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
      </main>
    </div>
  );
};

export default Home;
