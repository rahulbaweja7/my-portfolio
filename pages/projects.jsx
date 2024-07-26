import Head from "next/head";
import Navbar from "@/components/Navbar";
import ProjectItem from "@/components/ProjectItem";
import quizmodoroImg from "../public/assets/projects/Quizmodoro.png";
import portfolioImg from "../public/assets/projects/Portfolio.png";
import unlimitedwordleImg from "../public/assets/projects/UnlimitedWordle.png";
import comingSoonImg from "../public/assets/projects/comingSoonNew.png";

const Projects = () => {
  return (
    <div id="projects" className="flex flex-col min-h-screen">
      <Head>
        <title>Projects | Rahul Baweja</title>
        <meta name="description" content="Projects by Rahul Baweja" />
      </Head>
      <Navbar />
      <main className="flex-grow mt-20">
        <div className='max-w-[1240px] mx-auto px-2 py-16'>
        <h1 className='py-4 text-gray-700'>PROJ<span className='text-[#5651e5]'>ECTS</span></h1>
        {/* <h2 className='py-4 font-bold'>What I've Built</h2> */}
          <div className='grid md:grid-cols-2 gap-8'>
            <ProjectItem
              title="QuizModoro"
              backgroundImg={quizmodoroImg}
              githubUrl='https://github.com/your-username/quizmodoro'
            />
            <ProjectItem
              title="My Portfolio"
              backgroundImg={portfolioImg}
              githubUrl='https://github.com/your-username/portfolio'
            />
            <ProjectItem
              title="MacrosBuddy"
              backgroundImg={comingSoonImg}
              githubUrl='https://github.com/your-username/macrosbuddy'
            />
            <ProjectItem
              title="UnlimitedWordle"
              backgroundImg={unlimitedwordleImg}
              githubUrl='https://github.com/your-username/unlimitedwordle'
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Projects;
