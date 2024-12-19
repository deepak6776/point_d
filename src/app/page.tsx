
import AffiliateProductsSection from "./components/AffiliateProductsSection";
import Hero from "./components/Hero";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JoinUs from "./components/JoinUs";
import MadeBySharpener from "./components/MadeBySharpener";
import Resources from "./components/Resources";
import FeaturedArticles from "./components/FeaturedArticles";

export default function Home() {
  return (
    <>
     <Navbar />
     <Hero />
     {/* <AffiliateProductsSection /> */}
     {/* <FeaturedArticles /> */}
     <Resources />
     <JoinUs />
     <MadeBySharpener />
     <Footer />
    </>
  );
}
