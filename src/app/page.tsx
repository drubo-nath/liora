import HeroCarousel from "@/components/home/HeroCarousel";
import Bestsellers from "@/components/home/Bestsellers";
import ToolsSection from "@/components/home/ToolsSection";
import Ritual from "@/components/home/Ritual";
import { listTools } from "@/db/queries";

export default async function Home() {
  const tools = await listTools();

  return (
    <>
      <HeroCarousel />
      <Bestsellers />
      <Ritual />
      <ToolsSection tools={tools} />
    </>
  );
}
