import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import ShojiTransition from "../layout/ShojiTransition";
import Logo from "../../assets/images/logo.png";
import { NavigationContext } from "../hooks/useShojiNavigate"; // <-- Nueva importación

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isShojiActive, setIsShojiActive] = useState(false);
  const pendingPathRef = useRef<string | null>(null);


  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Proyectos' },
    { to: '/stack', label: 'Sobre Mi' },
    { to: '/contact', label: 'Contacto' },
  ];

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
          {/* 1. Logotipo de la marca */}
          <Navbar.Logo>
            <img
              src={Logo}
              className="w-12 h-12 object-contain mr-2"
              alt="Logo"
            />
            <span className="text-white">Sulbaran</span>
            <span className="text-purple-200 font-light ml-1">Dev</span>
          </Navbar.Logo>

          {/* 2. Enlaces para Desktop (Escritorio) */}
          <Navbar.Links>
            {navLinks.map((link) => (
              <Navbar.Link key={link.to} to={link.to}>
                {link.label}
              </Navbar.Link>
            ))}
          </Navbar.Links>

          {/* 3. Nuevo Menú Hamburguesa + Desplegable para Mobile */}
          <Navbar.MobileMenu>
            {navLinks.map((link) => (
              <Navbar.Link key={link.to} to={link.to}>
                {link.label}
              </Navbar.Link>
            ))}
          </Navbar.MobileMenu>
        </Navbar>

        <main className="flex-1">{children}</main>

        <ShojiTransition
          isActive={isShojiActive}
          onClosed={handleDoorsClosed}
        />
      </div>
    </NavigationContext.Provider>
  );
};

export default GlobalLayout; // Exportación única de componente limpia
