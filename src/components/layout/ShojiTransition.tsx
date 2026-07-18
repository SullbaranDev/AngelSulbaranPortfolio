import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShojiLeft from "../../assets/images/ShojiGate1.png";
import ShojiRight from "../../assets/images/ShojiGate2.png";
import PersonalLogo from "../../assets/images/logo.png";

interface ShojiTransitionProps {
  isActive: boolean;
  onClosed?: () => void;
}

export default function ShojiTransition({ isActive, onClosed }: ShojiTransitionProps) {
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [isFullyOpened, setIsFullyOpened] = useState(true);

  // ⚡ Duración de la transición de las puertas (Más rápida)
  const DOOR_DURATION = 1.0;
  
  // ⏱️ Tiempo que el logo se queda fijo antes de abrir las puertas (Más rápido)
  const HOLD_TIME = 0.6; 

  if (isActive && isFullyOpened) {
    setIsFullyOpened(false);
  }

  return (
    <div className={`fixed inset-0 z-50 flex w-screen h-screen overflow-hidden ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}>
      
      {/* ⬜ FONDO BLANCO ANIMADO CON DESVANECIMIENTO RÁPIDO */}
      <AnimatePresence>
        {!isFullyOpened && (
          <motion.div 
            className="absolute inset-0 bg-white z-0 w-full h-full pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }} // Desvanecimiento en 0.3s
          />
        )}
      </AnimatePresence>

      {/* Puerta izquierda */}
      <motion.div
        className="h-full w-1/2 relative z-10"
        style={{ 
          backgroundImage: `url(${ShojiLeft})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "right center",
          boxShadow: "inset -20px 0 30px -10px rgba(0,0,0,0.3)"
        }}
        initial={{ x: "-100%" }}
        animate={{ x: isActive ? "0%" : "-100%" }}
        transition={{ 
          duration: DOOR_DURATION, 
          ease: "easeInOut",
          delay: isActive ? 0 : HOLD_TIME 
        }}
        onAnimationComplete={() => {
          if (isActive) {
            setIsFullyClosed(true);
            onClosed?.();
          } else {
            setIsFullyOpened(true);
          }
        }}
        onAnimationStart={() => {
          if (!isActive) {
            setIsFullyClosed(false);
          }
        }}
      />

      {/* Contenedor del Logo y Spinner (Centrado absoluto) */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isFullyClosed ? 1 : 0.2, 
                scale: isFullyClosed ? 1 : 0.85  
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                transition: { delay: HOLD_TIME, duration: 0.25, ease: "easeInOut" }
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Spinner circular (Gira un poco más rápido para hacer juego con el ritmo) */}
              <motion.div 
                className="absolute rounded-full border-4 border-[#6320EE]/10 border-t-[#6320EE]"
                style={{ 
                  width: "18rem", 
                  height: "18rem", 
                  boxShadow: "0 0 20px rgba(99, 32, 238, 0.15)" 
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />

              {/* Logo Personal */}
              <img
                src={PersonalLogo}
                alt="Personal Logo"
                className="w-64 h-64 object-contain relative z-30 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Puerta derecha */}
      <motion.div
        className="h-full w-1/2 relative z-10"
        style={{ 
          backgroundImage: `url(${ShojiRight})`,
          backgroundSize: "100% 100%", 
          backgroundPosition: "left center",
          boxShadow: "inset 20px 0 30px -10px rgba(0,0,0,0.3)"
        }}
        initial={{ x: "100%" }}
        animate={{ x: isActive ? "0%" : "100%" }}
        transition={{ 
          duration: DOOR_DURATION, 
          ease: "easeInOut",
          delay: isActive ? 0 : HOLD_TIME 
        }}
      />
    </div>
  );
}