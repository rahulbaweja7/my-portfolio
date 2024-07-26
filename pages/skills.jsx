import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React from 'react';

const Skills = () => {
  return (
    <div id="skills" className="flex flex-col min-h-screen bg-linen">
      <Navbar />
      <main className="flex-grow py-12 md:py-16 lg:py-20 px-4 md:px-6 mt-20">
        <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <h1 className='py-4 text-gray-700'>Languages &<span className='text-[#5651e5]'> Frameworks</span></h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/html.png"
                    width={64}
                    height={64}
                    alt="HTML"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>HTML</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/css-icon.png"
                    width={64}
                    height={64}
                    alt="CSS"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>CSS</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/javascript.png"
                    width={64}
                    height={64}
                    alt="JavaScript"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>JavaScript</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/typescript.png"
                    width={64}
                    height={64}
                    alt="TypeScript"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>TypeScript</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/react.png"
                    width={64}
                    height={64}
                    alt="ReactJS"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>ReactJS</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/java-icon.png"
                    width={64}
                    height={64}
                    alt="Java"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>Java</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/c-icon.png"
                    width={64}
                    height={64}
                    alt="C"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>C</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/c-plus-plus-icon.png"
                    width={64}
                    height={64}
                    alt="C++"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>C++</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/python-icon.png"
                    width={64}
                    height={64}
                    alt="Python"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>Python</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/node.png"
                    width={64}
                    height={64}
                    alt="NodeJS"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>NodeJS</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/nextjs.png"
                    width={64}
                    height={64}
                    alt="NextJS"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>NextJS</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image
                    src="/assets/skills/tailwind.png"
                    width={64}
                    height={64}
                    alt="Tailwind"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>Tailwind</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;
