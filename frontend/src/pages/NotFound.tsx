import Header from "../components/Header";

import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
        <h1 className="text-primary text-6xl font-bold">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">
          Oops! The beat dropped... but the page didn’t 🎶
        </h2>

        <a href="/" className="mt-8 w-full max-w-xs">
          <Button text="Take me home 🏠" />
        </a>
      </div>
    </div>
  );
}
