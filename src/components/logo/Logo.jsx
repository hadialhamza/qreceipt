import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "",
  size = "md", // option: "sm" | "md" | "lg"
  href = "/",
  onClick,
}) {
  const sizeMap = {
    sm: { icon: 32, text: "text-xl" },
    md: { icon: 40, text: "text-2xl" },
    lg: { icon: 56, text: "text-3xl lg:text-4xl" },
  };

  const { icon: iconSize, text: textSize } = sizeMap[size] || sizeMap.md;
  const Component = onClick ? "div" : Link;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 group select-none ${onClick ? "cursor-pointer" : ""} ${className}`}
      aria-label="QReceipt Home"
    >
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/logo-icon.svg"
          alt="QReceipt Brand Mark"
          width={iconSize}
          height={iconSize}
          quality={100}
          priority={size === "lg"}
        />
      </div>

      <span
        className={`font-logo font-extrabold tracking-tight leading-none text-gray-900 transition-colors ${textSize}`}
      >
        Q<span className="text-brand-600">Receipt</span>
      </span>
    </Component>
  );
}
