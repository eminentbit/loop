
import Frank from "../assets/Frank.jpg";
import Dammy from "../assets/Dammy.png";
import Daryl from "../assets/Daryl.jpg";
import Charles from "../assets/Charles.jpg";
import emp from "../assets/emp.jpg";
import lum from "../assets/lum.jpg";
import randy from "../assets/randy.jpg";
import Navbar from "src/components/landing-page-components/Navbar";
import Footer from "src/components/landing-page-components/Footer";
import logoLoop from "../assets/logo-loop.jpg";

function AboutPage() {
   

  const professionals = [
    { name: "", role: "Chief Executive Officer", image: Frank, description: "Oversees company vision, strategy, and overall management." },
    { name: "", role: "Chief Financial Officer", image: lum, description: "Manages financial planning, reporting, budgeting, and risk management." },
    { name: "", role: "Chief Technology Officer", image: Daryl, description: "Leads technology strategy, innovation, and technical teams." },
    { name: "", role: "Chief Operating Officer", image: Dammy, description: "Oversees daily operations, streamlines processes, and improves efficiency." },
    { name: "", role: "Full Stack Developer", image: Charles, description: "Develops and maintains web applications using a combination of front-end and back-end technologies." },
    { name: "", role: "Frontend Developer", image: randy, description: "Creates intuitive user interfaces with modern and responsive designs." },
  ];

  return (
    <main className="bg-white">
      <Navbar />
      {/* Hero Section */}
   <section className="bg-indigo-50 text-center px-4 py-20 sm:px-8">
   <div className="max-w-4xl mx-auto">
     <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-500 mb-6">
       About EMP Inc Solution Loop
     </h1>
     <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
       Bridging job seekers and recruiters through a seamless hiring
       platform.
     </p>
   </div>
 </section>

 {/* Mission Section */}
 <section className="bg-white px-4 py-20 sm:px-10">
   <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
     <article className="md:w-1/2">
       <h2 className="text-3xl sm:text-4xl font-bold text-indigo-500 mb-4">
         Our Mission
       </h2>
       <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
         To connect job seekers with the right opportunities and empower
         recruiters to discover top talent with ease. We leverage
         intelligent matching algorithms, intuitive dashboards, and
         seamless communication tools to streamline every step of the
         hiring lifecycle—ensuring both candidates and hiring teams move
         forward quickly, confidently, and transparently.
       </p>
     </article>
     <figure className="md:w-1/2">
       <img
         src={emp}
         alt="Our Mission"
         className="w-full h-auto rounded-xl shadow-md"
       />
     </figure>
   </div>
 </section>

 {/* Vision Section */}
 <section className="bg-indigo-50 px-4 py-20 sm:px-10">
   <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row-reverse items-center gap-12">
     <article className="md:w-1/2">
       <h2 className="text-3xl sm:text-4xl font-bold text-indigo-500 mb-4">
         Our Vision
       </h2>
       <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
         A future where everyone finds purpose in meaningful work. Where
         talent meets opportunity without barriers. A world driven by
         growth, collaboration, and innovation. Where companies thrive
         through truly great hires.
       </p>
     </article>
     <figure className="md:w-1/2">
       <img
         src={logoLoop}
         alt="Our Vision"
         className="w-full h-auto rounded-xl shadow-md"
       />
     </figure>
   </div>
 </section>
      {/* Professionals Section */}
      <section className="bg-white px-4 py-24 sm:px-8">
        <h2 className="text-4xl font-bold text-indigo-500 text-center mb-16">
          Meet the Professionals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {professionals.map((person, idx) => (
            <article
              key={idx}
              className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              {/* Image section with object-contain to avoid cropping */}
              <div className="flex-none h-64 bg-gray-100 flex items-center justify-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>

              {/* Content section */}
              <div className="flex-grow p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 text-center">{person.name}</h3>
                <p className="text-sm text-indigo-500 font-medium mt-1 text-center">{person.role}</p>
                <p className="mt-3 text-base text-gray-600 leading-relaxed flex-grow text-center">
                  {person.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AboutPage;
