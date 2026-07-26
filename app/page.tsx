import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import FeaturedProject from "@/components/FeaturedProject";
import OtherProjects from "@/components/OtherProjects";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-black">
      <Navbar />
      <Hero />
      <TrustedBy />
      <FeaturedProject />
      <OtherProjects />
      <About />
      <Stack />
      <Contact />
    </div>
  );
}
