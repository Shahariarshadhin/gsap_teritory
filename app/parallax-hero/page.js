import ParallaxHero from "@/components/ParallaxHero/ParallaxHeroPublic";
import React from "react";

const page = () => {
  return (
    <div>
       <ParallaxHero />
      <section className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-3xl font-bold">Scroll down to see the parallax</h2>
      </section>
    </div>
  );
};

export default page;
