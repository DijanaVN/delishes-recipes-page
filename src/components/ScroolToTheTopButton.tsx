import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import React from "react";

const ScrollToTopButton = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showBackToTop && (
        <Button
          position="fixed"
          bottom="4"
          right="4"
          onClick={scrollToTop}
          colorScheme="cyan"
        >
          Back to Top
        </Button>
      )}
    </>
  );
};

export default ScrollToTopButton;
