import SignIn from "./signin/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(360deg,#163359,#6F87A6,#163359)] flex flex-col justify-center items-center px-4 py-8">
      <SignIn />
    </div>
  );
}
