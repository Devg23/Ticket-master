import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WelcomeAnimation() {
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to parse stored user", error);
      return null;
    }
  }, []);

  const displayName = location.state?.name || storedUser?.name || "Explorer";
  const redirectPath = typeof location.state?.redirectPath === "string" ? location.state.redirectPath : "/dashboard";

  const words = useMemo(() => {
    const phrase = `Welcome to Rebecca ${displayName}`.trim();
    return phrase.split(/\s+/);
  }, [displayName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, redirectPath]);

  const pageStyle = {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at 20% 20%, #0c1020 0%, #05070d 60%, #03040a 100%)",
    color: "#f2f6ff",
    fontFamily: "'Poppins', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflow: "hidden",
    position: "relative",
  };

  const dustLayerStyle = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: "radial-gradient(circle at 15% 20%, rgba(115, 180, 255, 0.12), transparent 40%), " +
      "radial-gradient(circle at 80% 10%, rgba(255, 138, 209, 0.1), transparent 45%), " +
      "radial-gradient(circle at 50% 85%, rgba(92, 138, 255, 0.14), transparent 55%)",
    filter: "blur(32px)",
    opacity: 0.75,
    animation: "drift 14s ease-in-out infinite alternate",
  };

  const phraseWrapStyle = {
    position: "relative",
    zIndex: 1,
    fontSize: "clamp(2rem, 6vw, 3.6rem)",
    fontWeight: 600,
    letterSpacing: "0.12rem",
    textTransform: "uppercase",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.55ch",
  };

  const wordStyle = index => ({
    display: "inline-block",
    opacity: 0,
    filter: "blur(14px)",
    transform: "translate3d(0, 40px, 0) scale(0.9)",
    backgroundImage: "linear-gradient(135deg, rgba(140, 186, 255, 0.92), rgba(255, 162, 220, 0.92))",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    paddingInline: "0.25ch",
    animationName: "wordCompose, wordDriftAway",
    animationDuration: "0.7s, 1.05s",
    animationTimingFunction: "cubic-bezier(0.23, 0.9, 0.38, 1.2), ease-out",
    animationDelay: `${index * 0.25}s, ${3 + index * 0.15}s`,
    animationFillMode: "forwards",
  });

  return (
    <div style={pageStyle}>
      <div style={dustLayerStyle} />
      <div style={phraseWrapStyle}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} style={wordStyle(index)}>
            {word}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes wordCompose {
          0% {
            opacity: 0;
            transform: translate3d(0, 46px, 0) rotate(6deg) scale(0.86);
            filter: blur(16px);
          }
          65% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes wordDriftAway {
          0% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: translate3d(42px, -46px, 0) rotate(-8deg) scale(1.08);
            filter: blur(18px);
          }
        }

        @keyframes drift {
          0% {
            transform: translate3d(-4%, -2%, 0) scale(1.05);
          }
          50% {
            transform: translate3d(3%, 4%, 0) scale(1.1);
          }
          100% {
            transform: translate3d(-2%, 6%, 0) scale(1.04);
          }
        }
      `}</style>
    </div>
  );
}
