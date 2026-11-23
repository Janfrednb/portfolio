import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import FeaturedProject from "@/components/FeaturedProject";
import OtherProjects from "@/components/OtherProjects";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import SectionNav from "@/components/SectionNav";
import Testimonials from "@/components/Testimonials";
import { getApprovedTestimonials } from "@/lib/testimonials";

// Approving a testimonial revalidates "/" right away; this is only a safety net.
export const revalidate = 300;

export default async function Home() {
  const testimonials = await getApprovedTestimonials();

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <SectionNav />
      <Hero />
      <TrustedBy />
      <FeaturedProject />
      <OtherProjects />
      <Testimonials items={testimonials} />
      <About />
      <Stack />
      <Contact />
    </div>
  );
}
