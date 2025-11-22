import CTASection from "@/components/LocomotiveScroll/CTASection";
import HeroSection from "@/components/LocomotiveScroll/HeroSection";
import PinSection from "@/components/LocomotiveScroll/PinSection";
import ProductShowcase from "@/components/LocomotiveScroll/ProductShowcase";
import SmoothScrollContainer from "@/components/LocomotiveScroll/SmoothScrollContainer";
import StatsSection from "@/components/LocomotiveScroll/StatsShow";

export default function Page() {
  const electronicsFeatures = [
    {
      icon: "⚡",
      title: "Cutting-Edge Tech",
      description:
        "Latest processors and AI-powered features for superior performance",
    },
    {
      icon: "🔋",
      title: "Long Battery Life",
      description:
        "Advanced battery technology for all-day usage without compromise",
    },
    {
      icon: "🎨",
      title: "Premium Design",
      description:
        "Sleek aesthetics combined with durable, high-quality materials",
    },
  ];

  const evFeatures = [
    {
      icon: "🌱",
      title: "Zero Emissions",
      description: "100% electric powertrains for a sustainable future",
    },
    {
      icon: "🚀",
      title: "Fast Charging",
      description:
        "80% charge in just 30 minutes with our supercharger network",
    },
    {
      icon: "🛡️",
      title: "Advanced Safety",
      description:
        "AI-powered collision prevention and autonomous driving features",
    },
  ];

  return (
    <div>
      {/* <SmoothScrollContainer> */}
        <HeroSection />

        <PinSection
          title="Premium Electronics"
          description="Experience the next generation of smart devices"
          features={electronicsFeatures}
          bg="bg-gradient-to-br from-red-500 via-red-600 to-pink-600"
          icon="📱"
        />

        <PinSection
          title="Electric Vehicles"
          description="Drive the future with sustainable mobility"
          features={evFeatures}
          bg="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600"
          icon="🚗"
        />

        <ProductShowcase />

        <StatsSection />

        <CTASection />
      {/* </SmoothScrollContainer> */}
    </div>
  );
}
