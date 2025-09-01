"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    console.log("Current theme:", resolvedTheme);
  }, [theme]);
  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button variant="default" disabled>
          Loading...
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="min-h-screen items-center flex justify-center">
        <Button
          variant="default"
          onClick={handleToggle}
          className="cursor-pointer"
        >
          {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
