import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";

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
      </main>
    </div>
  );
};

export default Home;
