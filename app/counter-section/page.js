import CounterSection from "@/components/CounterSection/CounterSectionPublic";

const page = () => {
  return (
    <div>
      <div>
        <div className="h-screen flex items-center justify-center bg-blue-500 text-white">
          <h1 className="text-5xl font-bold">Scroll Down to See Stats</h1>
        </div>

        <CounterSection />

        <div className="h-screen flex items-center justify-center bg-gray-200">
          <h2 className="text-3xl font-bold">More Content Below</h2>
        </div>
      </div>
    </div>
  );
};

export default page;
