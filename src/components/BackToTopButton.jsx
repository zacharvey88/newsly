import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; 

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="back-to-top"
          onClick={scrollToTop}
          style={backToTopStyles}
        >
          <FaArrowUp />
        </div>
      )}
    </>
  );
}

const backToTopStyles = {
  position: "fixed",
  width: '50px',
  height: '50px',
  bottom: "60px",
  right: "60px",
  backgroundColor: "#345284",
  color: "#fff",
  padding: "10px 10px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "24px",
  zIndex: 1000,
};
