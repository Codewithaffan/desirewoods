
import Header from "@/components/Header";
import Hero from "../components/Hero";
import StorySection from "@/components/StorySection";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import Instagram from "@/components/Instagram";
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <StorySection />
      <Categories />
      <Products />
      <Instagram />
      <Footer />
    </main>
  );
}