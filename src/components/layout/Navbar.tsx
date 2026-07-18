import React, { type ReactNode } from 'react';
import { useShojiNavigate } from '../hooks/useShojiNavigate'; // Importamos tu nuevo hook independiente

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
}

// 2. Componente Principal (Contenedor)
export const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="w-full bg-[#6320EE] text-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {children}
        {/* Un div vacío a la derecha por si en el futuro quieres un botón de login/perfil */}
        <div className="hidden md:block w-10"></div>
      </div>
    </nav>
  );
};

// 3. Subcomponente para el Logo (Alineado a la izquierda)
const NavbarLogo = ({ children }: NavbarLogoProps) => {
  return (
    <div className="flex items-center text-xl font-bold tracking-wide cursor-pointer">
      {children}
    </div>
  );
};

// 4. Subcomponente Contenedor de Links
const NavbarLinks = ({ children }: NavbarLinksProps) => {
  return (
    <div className="hidden md:flex items-center justify-center space-x-6 flex-1 h-full">
      {children}
    </div>
  );
};

// 5. Subcomponente para cada Enlace individual (Integrado con Shoji Transition)
const NavbarLink = ({ to, children }: NavbarLinkProps) => {
  const shojiNavigate = useShojiNavigate(); // Hook personalizado

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Bloqueamos el salto de URL inmediato de React Router
    shojiNavigate(to); // Ejecuta el cierre lento de puertas antes del cambio de página
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className="group relative px-6 py-3 text-white/95 hover:text-white font-medium transition-colors duration-300 z-10 inline-block cursor-pointer"
    >
      {/* El texto va arriba con z-10 para que la tinta negra pase por detrás sin taparlo */}
      <span className="relative z-10">{children}</span>

      {/* Contenedor del SVG que ocupa TODO el fondo del texto */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <svg
          viewBox="0 0 120 45"
          preserveAspectRatio="none"
          className="w-full h-full opacity-30 group-hover:opacity-100 transition-opacity duration-300"
        >
          {/* Primer trazo (Brocha gorda) */}
          <path
            d="M 5 35 C 30 42, 45 10, 65 15 C 85 20, 95 38, 115 28"
            fill="none"
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="
              [stroke-dasharray:150] [stroke-dashoffset:150]
              group-hover:[stroke-dashoffset:0]
              transition-all duration-500 ease-out
            "
          />
          
          {/* Segundo trazo (Cerdas del pincel) */}
          <path
            d="M 12 38 C 32 44, 48 14, 63 12 C 78 10, 98 32, 112 32"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="
              [stroke-dasharray:150] [stroke-dashoffset:150]
              group-hover:[stroke-dashoffset:0]
              transition-all duration-700 ease-out delay-75
            "
          />
        </svg>
      </div>
    </a>
  );
};

// 6. Asignación de los componentes hijos al padre
Navbar.Logo = NavbarLogo;
Navbar.Links = NavbarLinks;
Navbar.Link = NavbarLink;