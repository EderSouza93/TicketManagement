import React, { ReactNode } from "react";

interface BackgroundLayoutProps {
  children: ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Background curve */}
      <div className="absolute w-full h-full">
        <div className="absolute top-0 w-full h-2/3 bg-gray-100" />
        <div
          className="absolute bottom-0 w-full h-1/2 bg-white"
          style={{
            borderTopLeftRadius: "50% 20%",
            borderTopRightRadius: "50% 20%",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
