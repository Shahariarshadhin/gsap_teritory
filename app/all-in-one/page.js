import HorizontalGallery from "@/components/AllInOne/HorizontalGallery";
import ParallaxHero from "@/components/AllInOne/ParalaxHero";
import ProductCards from "@/components/AllInOne/ProductCards";
import TextReveal from "@/components/AllInOne/TextReveal";
import VideoScroll from "@/components/AllInOne/VideoScroll";

export default function Home() {
  return (
    <div>
      {/* <SmoothScrollContainer> */}
      <ParallaxHero />
      <TextReveal />
      <HorizontalGallery />
      <VideoScroll />
      <ProductCards />
      <section className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-3xl">Thanks — end of demo</h2>
      </section>
      {/* </SmoothScrollContainer> */}
    </div>
  );
}
