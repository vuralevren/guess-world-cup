import logo from "../assets/logo.png";

export default function Logo({ className }) {
  return (
    <img
      className={className || "w-[192px] h-[120px] mb-6"}
      src={logo}
      alt="Guess World Cup"
    />
  );
}
