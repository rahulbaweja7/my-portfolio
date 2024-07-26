import Navbar from '@/components/Navbar'
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const Main = () => {

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
    window.open('https://your-portfolio.com', '_blank', 'noopener,noreferrer');
  };

  return (
      <div id="home" className='w-full h-screen text-center'>
                <Navbar />

          <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center'>
              <div>              
              <h1 className='py-4 text-gray-700'>Hello!</h1>
              <h1 className='py-4 text-gray-700'>I'm <span className='text-[#5651e5]'>Rahul Baweja</span></h1>
              {/* <h1 className='py-2 text-gray-700'>A Frontend Developer</h1> */}
                  <p className='py-4 text-gray-600 max-w-[70%] m-auto'>I’m focused on building responsive front-end web applications, and I’m passionate about learning new technologies.</p>

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
  )
}

export default Main
