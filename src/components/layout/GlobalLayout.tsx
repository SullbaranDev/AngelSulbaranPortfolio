import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import ShojiTransition from "../layout/ShojiTransition"; 
import Logo from '../../assets/images/logo.png';
import { NavigationContext } from "../hooks/useShojiNavigate"; // <-- Nueva importación

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isShojiActive, setIsShojiActive] = useState(false);
  const pendingPathRef = useRef<string | null>(null);

  const navigateWithShoji = (to: string) => {
    if (to === location.pathname) return; 
    pendingPathRef.current = to; 
    setIsShojiActive(true); 
  };

  const handleDoorsClosed = () => {
    if (pendingPathRef.current) {
      navigate(pendingPathRef.current);
      pendingPathRef.current = null;
    }
  };

  useEffect(() => {
    if (!isShojiActive) return;

    const openTimeout = setTimeout(() => {
      setIsShojiActive(false);
    }, 500);

    return () => clearTimeout(openTimeout);
  }, [location]);

  return (
    <NavigationContext.Provider value={navigateWithShoji}>
      <div className="relative min-h-screen flex flex-col">
        <Navbar>
          <Navbar.Logo>
            <img src={Logo} className="w-12 h-12 object-contain mr-2" alt="Logo" />
            <span className="text-white">Sulbaran</span>
            <span className="text-purple-200 font-light ml-1">Dev</span>
          </Navbar.Logo>

          <Navbar.Links>
            <Navbar.Link to="/">Home</Navbar.Link>
            <Navbar.Link to="/projects">Proyectos</Navbar.Link>
            <Navbar.Link to="/stack">Sobre Mi</Navbar.Link>
            <Navbar.Link to="/contact">Contacto</Navbar.Link>
          </Navbar.Links>
        </Navbar>

        <main className="flex-1">
          {children}
        </main>

        <ShojiTransition 
          isActive={isShojiActive} 
          onClosed={handleDoorsClosed} 
        />
      </div>
    </NavigationContext.Provider>
  );
};

export default GlobalLayout; // Exportación única de componente limpia