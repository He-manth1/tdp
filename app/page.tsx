"use client";

import { useState } from "react";
import { Wizard } from "./components/form/Wizard";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "Testuser" && password === "User@123") {
      setIsAuthenticated(true);
    } else {
      setError("Invalid username or password");
    }
  };

  if (isAuthenticated) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: "#fffefa" }}>
        <Wizard />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-8 px-4" style={{ backgroundColor: "#fffefa" }}>
      <div className="w-full max-w-md" style={{ backgroundColor: "transparent" }}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Login</h3>
          <p className="text-sm text-muted-foreground">Enter your credentials to access the form</p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

