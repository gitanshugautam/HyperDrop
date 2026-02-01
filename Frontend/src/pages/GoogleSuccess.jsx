import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false); // 🔥 IMPORTANT

  useEffect(() => {
    if (hasRun.current) return; // ⛔ stop second run
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("TOKEN FROM GOOGLE =", token);

    if (token) {
      localStorage.setItem("token", token);
      navigate("/home", { replace: true });
    } else {
      navigate("/login");
    }
  }, []);

  return <h1>Google Login Processing...</h1>;
};

export default GoogleSuccess;
