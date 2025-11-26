import PreviousWork from "@/components/AllInOne/CartoonInteractiveScroll";
import CartoonScrollSections from "@/components/AllInOne/CartoonInteractiveScroll";
import CartoonInteractiveScroll from "@/components/AllInOne/CartoonInteractiveScroll";
import FeaturedProjects from "@/components/AllInOne/FeaturedProjects";
import HorizontalGallery from "@/components/AllInOne/HorizontalGallery";
import MagneticMorphing from "@/components/AllInOne/MagneticMorphing";
import ParallaxHero from "@/components/AllInOne/ParalaxHero";
import ProductCards from "@/components/AllInOne/ProductCards";
import RobotScrollAnimation from "@/components/AllInOne/RobotScrollAnimation";
import TextReveal from "@/components/AllInOne/TextReveal";
import VerticalScrollWork from "@/components/AllInOne/VerticalScrollWork";
import VideoScroll from "@/components/AllInOne/VideoScroll";
import WavyImageGrid from "@/components/AllInOne/WavyEffect";

export default function Home() {
  return (
    <div>
      {/* <SmoothScrollContainer> */}
      <ParallaxHero />
      <TextReveal />
      <HorizontalGallery />
      <VideoScroll />
      <ProductCards />
      <WavyImageGrid />
      <MagneticMorphing />
      <FeaturedProjects />
      {/* <RobotScrollAnimation /> */}
      <PreviousWork />
      <VerticalScrollWork />
      <section className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-3xl">Thanks — end of demo</h2>
      </section>
      {/* </SmoothScrollContainer> */}
    </div>
  );
}
