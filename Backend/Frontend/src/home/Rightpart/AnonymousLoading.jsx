import React from 'react';

const AnonymousLoading = () => {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: translateY(-15px) scale(2); 
            opacity: 1; 
          }
        }
        @keyframes text-pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(0.90); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1); 
          }
        }
        .particle-float {
          animation: float 3s ease-in-out infinite;
        }
        .text-pulse {
          animation: text-pulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <div className="flex justify-center items-center ">
        <div className="relative w-40 h-40">
          {/* Centered LOADING text */}
          
          <div>
          <div className="absolute inset-0 flex items-center justify-center">
            
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200 
                            text-sm font-bold tracking-wider animate-bounce
                            drop-shadow-[0_0_8px_rgba(100,200,255,0.5)]">
              LOADING
              <h2 className=''>Select USER to start chat</h2>
            </span>
            
          </div>
          
          </div>
            
          
          {/* Floating particles */}
          {[...Array(100)].map((_, i) => {
            const size = 1 + Math.random() * 2;
            const colorHue = 180 + Math.random() * 60;
            const delay = i * 0.15;
            const duration = 3 + Math.random() * 2;
            const distance = 20 + Math.random() * 15;

            return (
              <div
                key={i}
                className="absolute rounded-full particle-float"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: `hsla(${Math.floor(Math.random() * 360)}, 80%, 70%, ${0.6 + Math.random() * 0.3})`,
                  top: `${Math.sin(i * Math.PI / 6) * distance + 20}px`,
                  left: `${Math.cos(i * Math.PI / 6) * distance + 20}px`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  filter: 'blur(0.5px)'
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AnonymousLoading;