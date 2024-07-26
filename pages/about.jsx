import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';

const About = () => {

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/rahulbaweja-/', '_blank', 'noopener,noreferrer');
  };

  const handleGithubClick = () => {
    window.open('https://github.com/rahulbaweja7', '_blank', 'noopener,noreferrer');
  };

  const handleMailClick = () => {
    window.location.href = 'mailto:rbaweja1@asu.edu';
  };

  const handlePortfolioClick = () => {
    window.open('https://your-portfolio.com', '_blank', 'noopener,noreferrer'); // Replace with your actual portfolio URL
  };

  return (
    <div id="about" className="flex flex-col min-h-screen bg-linen">
      <Navbar />
      <main className="flex-grow py-12 md:py-16 lg:py-20 px-4 md:px-6 mt-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start md:order-2">
            <div className="h-auto shadow-xl shadow-gray-400 flex items-center justify-center hover:scale-105 ease-in duration-300 rounded-xl overflow-hidden w-full md:w-[400px] md:h-[400px]">
              <Image
                src="/assets/RahulLA.png"
                alt="Profile Picture"
                className='rounded-xl'
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto'
                }}
                width="400"
                height="400"
              />
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amethyst text-center md:text-left text-[#5651e5]">Who am I?</h1>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl text-justify">
                Hi, I&apos;m Rahul Baweja, a Junior at Arizona State University pursuing Computer Science.
                I have currently maintained a perfect GPA. My experience extends from UnderGraduate Teaching
                Assistant to interning as a Front-End Developer at eazy2biz.
                My projects primarily focus on AI-integrated web applications, reflecting my passion for
                technology and commitment to driving innovation. I strive to blend creativity with technology
                to solve real-world problems. Discover my journey and projects to see how I leverage my technical
                expertise to create positive change.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-amethyst text-center md:text-left text-[#5651e5]">Let&apos;s Connect</h2>
              <div className='flex items-center justify-between max-w-[330px] m-auto py-4'>
                <div 
                  className='rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-105 ease-in duration-300'
                  onClick={handleLinkedInClick}
                >
                  <FaLinkedinIn />
                </div>
                <div 
                  className='rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-105 ease-in duration-300'
                  onClick={handleGithubClick}
                >
                  <FaGithub />
                </div>
                <div 
                  className='rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-105 ease-in duration-300'
                  onClick={handleMailClick}
                >
                  <AiOutlineMail />
                </div>
                {/* <div 
                  className='rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-105 ease-in duration-300'
                  onClick={handlePortfolioClick}
                >
                  <BsFillPersonLinesFill />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
