import HeroCarousel from "@/components/home/HeroCarousel";
import Bestsellers from "@/components/home/Bestsellers";
import Ritual from "@/components/home/Ritual";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Bestsellers />
      <Ritual />
      <Reviews />
    </>
  );
}
