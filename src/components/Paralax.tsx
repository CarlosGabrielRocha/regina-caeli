import React from "react";

interface ParalaxProps {
  src?: string;
  height?: string;
  children?: React.ReactNode;
  overlay?: boolean;
}

const Paralax: React.FC<ParalaxProps> = ({
  src = "/images/parallax-bg.png",
  height = "h-screen",
  children,
  overlay = true,
}) => {
  return (
    <div
      className={`relative w-full ${height} bg-fixed bg-center bg-cover flex items-center justify-center shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]`}
      style={{ backgroundImage: `url(${src})` }}
    >
      {overlay && <div className="absolute inset-0 bg-black/40" />}
      <div className="relative flex flex-col items-center justify-between z-10 text-white p-4 h-full">
        {children}
      </div>
    </div>
  );
};

export default Paralax;
