import { useState, useEffect } from "react";

import Button from "../components/Button";
import TextBox from "../components/TextBox";
import BlackLogo from "../components/Logos/BlackLogo";
import WhiteLogo from "../components/Logos/WhiteLogo";

import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      window.location.href = "/";
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      localStorage.setItem("token", data.access_token);

      const decodedToken = jwtDecode(data.access_token);
      localStorage.setItem("user", JSON.stringify(decodedToken));

      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex h-screen w-full flex-col items-center justify-center lg:w-1/2">
        <div className="bg-mint-500 flex w-full max-w-md flex-col gap-8 p-4">
          <BlackLogo className="lg:hidden" />

          <div>
            <p className="text-text-muted font-400 text-md">
              Welcome to JaMoveo
            </p>
            <p className="text-secondary font-600 text-xl">Log in</p>
          </div>

          <div className="flex w-full flex-col gap-8">
            <TextBox
              label="Enter your Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextBox
              label="Enter your Password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Button
              text={loading ? "Logging in..." : "Log in"}
              onClick={handleLogin}
              disabled={loading}
            />

            {error && <p className="text-center text-red-500">{error}</p>}

            <p className="text-center">
              Don’t have an account?{" "}
              <a className="text-secondary" href="/register">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden h-screen w-1/2 bg-[url('./assets/hero.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-[#FFCD2933] lg:block">
        <WhiteLogo className="absolute right-8 bottom-8" />
      </div>
    </div>
  );
}
