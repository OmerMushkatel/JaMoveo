import { useState, useEffect } from "react";

import Button from "../components/Button";
import TextBox from "../components/TextBox";
import SelectBox from "../components/SelectBox";

import BlackLogo from "../components/Logos/BlackLogo";
import WhiteLogo from "../components/Logos/WhiteLogo";

interface RegisterProps {
  isAdmin?: boolean;
}

export default function Register({ isAdmin }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [instrument, setInstrument] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      window.location.href = "/";
    }
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            instrument,
            password,
            isAdmin: isAdmin,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      setSuccess("Registration successful! You can now log in.");
    } catch (err) {
      console.error("Registration error:", err);
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
            <p className="text-secondary font-600 text-xl">Register</p>
          </div>

          <div className="flex w-full flex-col gap-8">
            {/* Controlled Username Input */}
            <TextBox
              label="Username"
              placeholder="Select your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <SelectBox
              label="Your instrument"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              options={[
                { value: "drums", label: "Drums" },
                { value: "guitar", label: "Guitar" },
                { value: "bass", label: "Bass" },
                { value: "saxophone", label: "Saxophone" },
                { value: "keyboards", label: "Keyboards" },
                { value: "vocals", label: "Vocals" },
              ]}
              placeholder="Select an instrument"
            />

            <TextBox
              label="Create password"
              placeholder="Your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Button
              text={loading ? "Registering..." : "Register"}
              onClick={handleRegister}
              disabled={loading}
            />

            {success && <p className="text-center text-green-600">{success}</p>}

            {error && <p className="text-center text-red-500">{error}</p>}

            <p className="text-center">
              Already have an account?{" "}
              <a className="text-secondary" href="/login">
                Log In
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
