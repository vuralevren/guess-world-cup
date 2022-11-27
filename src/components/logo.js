import logo from "../assets/logo-white.webp";

export default function Logo({ className, w }) {
  return (
    <img
      className={className || `w-[${w || "192px"} ] h-[120px] mb-6`}
      src={logo}
      alt="Guess World Cup"
    />
  );
}
