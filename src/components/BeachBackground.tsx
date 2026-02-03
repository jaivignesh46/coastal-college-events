import React from 'react';

interface BeachBackgroundProps {
  children: React.ReactNode;
}

const BeachBackground: React.FC<BeachBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky via-sky/80 to-sand">
      {/* Sun */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-sunset opacity-80 blur-sm animate-pulse-glow" />
      
      {/* Clouds */}
      <div className="absolute top-16 left-10 animate-float-slow">
        <Cloud className="w-32 h-16" />
      </div>
      <div className="absolute top-24 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
        <Cloud className="w-48 h-20" />
      </div>
      <div className="absolute top-12 right-1/3 animate-float-slow" style={{ animationDelay: '4s' }}>
        <Cloud className="w-40 h-18" />
      </div>
      <div className="absolute top-32 left-1/2 animate-float" style={{ animationDelay: '1s' }}>
        <Cloud className="w-36 h-16" />
      </div>

      {/* Palm Tree Silhouettes */}
      <div className="absolute bottom-0 left-5 opacity-20">
        <PalmTree className="h-64" />
      </div>
      <div className="absolute bottom-0 right-10 opacity-15">
        <PalmTree className="h-48 scale-x-[-1]" />
      </div>

      {/* Ocean Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
        {/* Back wave */}
        <svg
          className="absolute bottom-8 w-[200%] h-20 animate-wave-slow opacity-40"
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(199 89% 48%)"
            d="M0 22L60 16.7C120 11 240 0.7 360 0.7C480 0.7 600 11 720 22C840 33 960 44 1080 44C1200 44 1320 33 1380 27.5L1440 22L1440 54L1380 54C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54L0 54Z"
          />
        </svg>
        
        {/* Middle wave */}
        <svg
          className="absolute bottom-4 w-[200%] h-24 animate-wave opacity-60"
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(195 100% 70%)"
            d="M0 27L48 32C96 37 192 47 288 47C384 47 480 37 576 32C672 27 768 27 864 32C960 37 1056 47 1152 47C1248 47 1344 37 1392 32L1440 27L1440 54L1392 54C1344 54 1248 54 1152 54C1056 54 960 54 864 54C768 54 672 54 576 54C480 54 384 54 288 54C192 54 96 54 48 54L0 54Z"
          />
        </svg>
        
        {/* Front wave with foam */}
        <svg
          className="absolute bottom-0 w-[200%] h-28 animate-wave"
          style={{ animationDuration: '6s' }}
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(199 89% 38%)"
            d="M0 22L60 27C120 32 240 42 360 42C480 42 600 32 720 27C840 22 960 22 1080 27C1200 32 1320 42 1380 47L1440 52L1440 54L1380 54C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54L0 54Z"
          />
          {/* Foam effect */}
          <path
            fill="hsl(180 50% 98%)"
            fillOpacity="0.5"
            d="M0 48L60 46C120 44 240 48 360 49C480 50 600 46 720 45C840 44 960 48 1080 49C1200 50 1320 46 1380 46L1440 46L1440 54L0 54Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const Cloud: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 200 100" fill="none">
    <ellipse cx="60" cy="60" rx="50" ry="35" fill="white" fillOpacity="0.9" />
    <ellipse cx="100" cy="50" rx="45" ry="40" fill="white" fillOpacity="0.95" />
    <ellipse cx="145" cy="55" rx="40" ry="32" fill="white" fillOpacity="0.9" />
    <ellipse cx="80" cy="70" rx="55" ry="25" fill="white" fillOpacity="0.85" />
    <ellipse cx="130" cy="68" rx="45" ry="22" fill="white" fillOpacity="0.85" />
  </svg>
);

const PalmTree: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 200" fill="currentColor">
    <path d="M48 200 L48 80 Q48 70 50 60 Q52 70 52 80 L52 200 Z" fill="hsl(35 40% 30%)" />
    <path d="M50 60 Q20 40 5 50 Q25 55 50 60" fill="hsl(120 40% 25%)" />
    <path d="M50 60 Q80 40 95 50 Q75 55 50 60" fill="hsl(120 40% 25%)" />
    <path d="M50 55 Q30 20 15 25 Q35 40 50 55" fill="hsl(120 40% 30%)" />
    <path d="M50 55 Q70 20 85 25 Q65 40 50 55" fill="hsl(120 40% 30%)" />
    <path d="M50 50 Q50 15 40 5 Q50 25 50 50" fill="hsl(120 40% 28%)" />
    <path d="M50 50 Q50 15 60 5 Q50 25 50 50" fill="hsl(120 40% 28%)" />
  </svg>
);

export default BeachBackground;
