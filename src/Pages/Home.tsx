import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
// 📸 Cambia esta ruta por la de tu foto de perfil real
import ProfilePic from "../assets/images/profile.jpg";

const Home = () => {
 return (
    <section 
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden px-4"
      style={{ backgroundColor: "#211A1D" }}
    >
      {/* Contenedor principal con animación de entrada */}
      <motion.div 
        className="flex flex-col items-center text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 📷 Imagen de perfil redondeada en el medio */}
        <motion.div 
          className="relative w-48 h-48 mb-8 rounded-full p-1 bg-gradient-to-tr from-[#6320EE] to-[#804fe6] shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img 
            src={ProfilePic} 
            alt="Ángel Sulbarán" 
            className="w-full h-full object-cover rounded-full border-4 border-[#211A1D]"
          />
        </motion.div>

        {/* ✍️ Título con efecto de escritura infinita */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight min-h-[70px] sm:min-h-[84px]">
          <TypeAnimation
            sequence={[
              "Ángel Sulbarán",
              2000, // Espera 2 segundos mostrando tu nombre
              "Frontend Developer",
              2000, // Espera 2 segundos mostrando tu rol
            ]}
            wrapper="span"
            speed={40}      // Velocidad de escritura
            deletionSpeed={50} // Velocidad al borrarse
            repeat={Infinity} // Bucle infinito
            className="inline-block text-white"
          />
        </h1>

        {/* Subtexto opcional para darle balance visual al diseño */}
        <motion.p 
          className="mt-6 text-gray-400 text-lg sm:text-xl max-w-md font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Especializado en crear interfaces web atractivas, interactivas y de alto rendimiento utilizando React y TypeScript.
        </motion.p>
      </motion.div>

      {/* 💡 Elemento visual de fondo (Decorativo sutil para que no quede totalmente plano) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6320EE]/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}

export default Home