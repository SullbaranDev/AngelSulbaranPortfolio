import React, { type ReactNode, useState } from 'react';
import { useShojiNavigate } from '../hooks/useShojiNavigate';
import trazo from "../../assets/images/trazo.png";

// 1. Interfaces de TypeScript para las Props
interface NavbarProps {
  children: ReactNode;
}

interface NavbarLogoProps {
  children: ReactNode;
}

interface NavbarLinksProps {
  children: ReactNode;
}

interface NavbarLinkProps {
  to: string;
  children: ReactNode;
  onClick?: () => void; // Añadido opcional para cerrar el menú móvil al hacer click
}

interface NavbarMobileMenuProps {
  children: ReactNode;
}

// 2. Componente Principal (Contenedor)
export const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="w-full bg-[#6320EE] text-white shadow-md px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {children}
      </div>
    </nav>
  );
};

// 3. Subcomponente para el Logo
const NavbarLogo = ({ children }: NavbarLogoProps) => {
  return (
    <div className="flex items-center text-xl font-bold tracking-wide cursor-pointer z-50">
      {children}
    </div>
  );
};

// 4. Subcomponente Contenedor de Links (Escritorio)
const NavbarLinks = ({ children }: NavbarLinksProps) => {
  return (
    <div className="hidden md:flex items-center justify-center space-x-6 flex-1 h-full">
      {children}
    </div>
  );
};

// 5. Subcomponente para cada Enlace individual (Mantiene tu efecto brocha negra intacto)
const NavbarLink = ({ to, children, onClick }: NavbarLinkProps) => {
  const shojiNavigate = useShojiNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick(); // Ejecuta el cierre del menú móvil si existe
    shojiNavigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className="group relative px-6 py-3 text-white hover:text-white/90 font-medium transition-colors duration-300 z-10 inline-block cursor-pointer overflow-visible w-full md:w-auto text-center md:text-left"
    >
      <span className="relative z-10">{children}</span>

      <div 
        className="absolute inset-y-0 left-0 h-full w-0 group-hover:w-full transition-[width] duration-500 ease-in-out overflow-hidden pointer-events-none z-0 select-none bg-[#6320EE] opacity-50 group-hover:opacity-100"
      >
        <div 
          className="absolute inset-y-0 left-0 h-full"
          ref={(el) => {
            if (!el) return;
            const parentWidth = el.parentElement?.parentElement?.getBoundingClientRect().width;
            if (parentWidth) {
              el.style.width = `${parentWidth}px`;
            }
          }}
        >
          <img
            src={trazo}
            alt="Trazo de pincel"
            className="w-full h-[140%] object-stretch absolute top-1/2 -translate-y-1/2 left-0"
            style={{ mixBlendMode: 'darken' }}
          />
        </div>
      </div>
    </a>
  );
};

// 6. NUEVO Subcomponente para el Menú Hamburguesa Móvil
const NavbarMobileMenu = ({ children }: NavbarMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden flex items-center z-50">
      {/* Botón de Hamburguesa Animado por CSS nativo */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition duration-300 ease-in-out ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Desplegable Móvil (Cortina desde arriba con el mismo color #6320EE) */}
      <div
        className={`absolute top-full left-0 w-full bg-[#6320EE] border-t border-white/10 shadow-lg px-6 py-6 flex flex-col space-y-4 transition-all duration-300 ease-in-out transform origin-top ${
          isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'
        }`}
      >
        {/* Clonamos los hijos para inyectarles automáticamente el cierre del menú al pulsarlos */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement<NavbarLinkProps>(child)) {
            return React.cloneElement(child, { onClick: toggleMenu });
          }
          return child;
        })}
      </div>
    </div>
  );
};

// 7. Asignación de los componentes hijos al padre
Navbar.Logo = NavbarLogo;
Navbar.Links = NavbarLinks;
Navbar.Link = NavbarLink;
Navbar.MobileMenu = NavbarMobileMenu; // Acoplado al namespace del componente