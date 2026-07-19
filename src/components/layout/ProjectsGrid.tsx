import ProjectCard from "../ui/ProjectsCard";

// Ejemplos de imágenes locales o URLs de tus capturas
import SulbaranLexPreview from "../../assets/images/profile.jpg";
import PortfolioPreview from "../../assets/images/logo.png";

export default function ProjectsGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 bg-[#0F0B0D]">
      
      {/* Cabecera de la Sección */}
      <div className="mb-16 space-y-3 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Proyectos <span className="text-[#8075FF]">Destacados</span>
        </h2>
        <p className="text-gray-400 max-w-xl text-base font-light">
          Una selección de las aplicaciones web que he diseñado y desarrollado de extremo a extremo.
        </p>
      </div>

      {/* 🚀 GRID DE 2 ELEMENTOS POR FILA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        
        {/* Proyecto 1: Compuesto e hiper-personalizable */}
        <ProjectCard externalLink="https://github.com/tu-usuario/sulbaranlex">
          <ProjectCard.Header 
            title="SulbaranLex — CRM Legal" 
            category="Software de Gestión" 
          />
          <ProjectCard.Description>
            Un CRM especializado para la gestión de expedientes judiciales, automatización de plazos legales y control de clientes. Diseñado con una arquitectura modular altamente escalable.
          </ProjectCard.Description>
          <ProjectCard.TechStack 
            tags={["Next.js", "TypeScript", "Prisma", "Supabase", "Tailwind CSS"]} 
          />
          <ProjectCard.Image 
            src={SulbaranLexPreview} 
            alt="Vista previa de SulbaranLex CRM" 
          />
        </ProjectCard>

        {/* Proyecto 2 */}
        <ProjectCard externalLink="https://tu-dominio.com">
          <ProjectCard.Header 
            title="Portfolio Profesional" 
            category="Diseño Web e Interacción" 
          />
          <ProjectCard.Description>
            Sitio web presentacional enfocado en la experiencia de usuario e interactividad. Implementa microinteracciones fluidas y un rendimiento optimizado al cien por ciento.
          </ProjectCard.Description>
          <ProjectCard.TechStack 
            tags={["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Vite"]} 
          />
          <ProjectCard.Image 
            src={PortfolioPreview} 
            alt="Vista previa de Portfolio Web" 
          />
        </ProjectCard>

      </div>
    </section>
  );
}