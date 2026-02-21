import { m } from "framer-motion"
import Link from "next/link"
import { projectList } from "../pageData"
import Image from "next/image"

export default function Projects() {
  return (
    <div className='px-20 flex flex-col'>
      <m.h2 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        id={'projects'} className='what-i-do-title self-end'
      >
        Projects
      </m.h2>
      <m.h3 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className='what-i-do-date self-end'
      >
        October 2021 - Present
      </m.h3>
      {projectList.map((project, index) => {
        return (
          <div className='robot-container min-h-[800px]' key={project.name}>
            <m.p 
              initial={{opacity: 0.5, y: '25%'}}
              whileInView={{opacity: 1, y: 0, transition: {
                duration: 1,
                delay: 0.1,
                ease: 'easeOut'
              }}}            
              viewport={{once: true, amount: 'some'}}
              className='robot-text'
            >
              {project.description}
            </m.p>
            {project.videoUrl !== undefined && <video autoPlay loop muted playsInline preload="auto" className='robot-video basis-1/2 w-[45%] object-none'>
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            {project.imageUrl !== undefined && <Image src={project.imageUrl} alt={project.imageAlt ?? ""} className='robot-image object-contain basis-1/2 w-[45%]'/>}
            {project.page && <div className='robot-learn-more mb-20 self-end'>
              <Link href={project.page}><p>Learn More</p></Link>
            </div>}
          </div>
        )
      })}
    </div>
  )
}