import WeatherCard from "../components/WeatherCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="absolute inset-0 z-0">
        <img
          src="/clouds.jpg"
          className="w-full h-full object-cover"
          alt="Background"
        />
      </div>
      <div className="z-10 relative">
        <WeatherCard />
      </div>
    </main>
  );
}
