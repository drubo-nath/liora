import HeroCarousel from "@/components/home/HeroCarousel";
import Marquee from "@/components/home/Marquee";
import Bestsellers from "@/components/home/Bestsellers";
import Ritual from "@/components/home/Ritual";
import MonsoonEdit from "@/components/home/MonsoonEdit";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Marquee />
      <Bestsellers />
      <Ritual />
      <MonsoonEdit />
      <Reviews />
      <Newsletter />
    </>
  );
}
