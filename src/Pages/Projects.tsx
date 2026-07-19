import ProjectsGrid from "../components/layout/ProjectsGrid"

const Projects = () => {
  return (
    <section
    className="relative w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden px-4"
      style={{ backgroundColor: "#211A1D" }}
    >
        <ProjectsGrid/>
    </section>
  )
}

export default Projects