import { motion } from "framer-motion";
// Importamos los iconos específicos de React Icons (usando la colección 'Si' - Simple Icons)
import { SiHtml5, SiJavascript, SiReact, SiTypescript, SiTailwindcss, SiVite } from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";

// 1. Definimos la estructura de datos para nuestro stack
const techs = [
  { id: 1, name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { id: 2, name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { id: 3, name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { id: 4, name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { id: 5, name: "React", icon: SiReact, color: "#61DAFB" },
  // He añadido Tailwind y Vite que suelen ir de la mano con React modernos
  { id: 6, name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { id: 7, name: "Vite", icon: SiVite, color: "#646CFF" },
];

// 2. Variantes de animación para Framer Motion (entrada escalonada)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Retraso para que aparezca después del texto principal del Hero
      delayChildren: 0.8, 
      staggerChildren: 0.15, // Tiempo entre la aparición de cada icono
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function TechStack() {
  return (
    // Contenedor principal animado
    <motion.div
      className="mt-12 flex flex-col items-center justify-center gap-5 border-t border-gray-800/50 pt-10 w-full max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Título sutil opcional */}
      <motion.p 
        className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-1"
        variants={itemVariants}
      >
        Mi Stack Tecnológico Principal
      </motion.p>

      {/* Grid de iconos */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 px-4">
        {techs.map((tech) => (
          <motion.div
            key={tech.id}
            variants={itemVariants}
            className="group relative flex items-center justify-center flex-col gap-2"
            // Efecto sutil de hover en el icono
            whileHover={{ scale: 1.1, y: -5 }} 
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* El Icono */}
            <tech.icon 
              className="text-4xl sm:text-5xl transition-colors duration-300"
              // Por defecto gris, a color en hover o en pantallas pequeñas
              style={{ color: tech.color }} 
            />

            {/* Tooltip con el nombre (aparece al hacer hover) */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 min-w-max bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 group-hover:-bottom-12 transition-all duration-300 pointer-events-none shadow-xl border border-gray-700">
              {tech.name}
              {/* Flechita del tooltip */}
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}