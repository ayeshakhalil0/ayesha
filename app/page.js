import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/Manifesto";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Research from "@/components/sections/Research";
import Teaching from "@/components/sections/Teaching";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <About />
        <Experience />
        <Work />
        <Research />
        <Teaching />
        <Contact />
      </main>
    </>
  );
}
