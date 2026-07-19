import { type ReactNode, Children } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  children: ReactNode;
  externalLink?: string;
}

export default function ProjectCard({ children, externalLink }: ProjectCardProps) {
  // Filtramos los hijos para separar la imagen de los textos de forma dinámica
  const childrenArray = Children.toArray(children);
  
  const imageChild = childrenArray.find(
    (child) => (child as any).type?.name === "ProjectCardImage"
  );
  
  const textChildren = childrenArray.filter(
    (child) => (child as any).type?.name !== "ProjectCardImage"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between bg-[#161214] border border-gray-800/60 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-[#8075FF]/40 hover:shadow-[0_12px_30px_-10px_rgba(128,117,255,0.15)] min-h-[320px]"
    >
      {/* Envoltura opcional si toda la card es un enlace externo */}
      {externalLink && (
        <a 
          href={externalLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute inset-0 z-30 cursor-pointer"
          aria-label="Ver proyecto"
        />
      )}
      
      {/* ─── CUERPO SUPERIOR: TEXTO IZQUIERDA E IMAGEN DERECHA ─── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full z-10">
        {/* Contenido Izquierdo (Título y Descripción) */}
        <div className="md:col-span-7 space-y-4">
          {textChildren.filter(
            (child) => (child as any).type?.name !== "ProjectCardTechStack"
          )}
        </div>

        {/* Contenido Derecho (Imagen) */}
        {imageChild && <div className="md:col-span-5 w-full">{imageChild}</div>}
      </div>

      {/* ─── FOOTER DE LA CARD: TECH STACK ─── */}
      <div className="mt-6 pt-4 border-t border-gray-800/40 w-full z-10">
        {textChildren.find(
          (child) => (child as any).type?.name === "ProjectCardTechStack"
        )}
      </div>
    </motion.div>
  );
}

// ─── SUBCOMPONENTES COMPUESTOS ─────────────────────────────────────────

// 1. Encabezado / Título del Proyecto
interface HeaderProps {
  title: string;
  category?: string;
}
ProjectCard.Header = function ProjectCardHeader({ title, category }: HeaderProps) {
  return (
    <div className="space-y-1">
      {category && (
        <span className="text-xs font-semibold tracking-wider uppercase text-[#8075FF]">
          {category}
        </span>
      )}
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#8075FF] transition-colors duration-300">
        {title}
      </h3>
    </div>
  );
};

// 2. Descripción del Proyecto
ProjectCard.Description = function ProjectCardDescription({ children }: { children: ReactNode }) {
  return (
    <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
      {children}
    </p>
  );
};

// 3. Stack de Tecnologías Usadas (Footer)
interface TechStackProps {
  tags: string[];
}
ProjectCard.TechStack = function ProjectCardTechStack({ tags }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="text-xs font-medium px-3 py-1 rounded-full bg-[#8075FF]/10 text-[#8075FF] border border-[#8075FF]/20 backdrop-blur-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

// 4. Imagen del Proyecto (Lado Derecho)
interface ImageProps {
  src: string;
  alt: string;
}
ProjectCard.Image = function ProjectCardImage({ src, alt }: ImageProps) {
  return (
    <div className="relative w-full h-44 md:h-36 lg:h-40 rounded-xl overflow-hidden bg-gray-900/40 border border-gray-800/40">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#161214]/50 to-transparent pointer-events-none" />
    </div>
  );
};