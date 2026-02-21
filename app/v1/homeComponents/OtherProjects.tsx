'use client';

import { m } from "framer-motion";
import Link from "next/link";
import { otherProjects } from "../pageData";

export default function OtherProjects() {
    return (
      <div className='flex flex-wrap m-10 justify-around gap-y-10 gap-x-5'>
        {otherProjects.map(project => {
          return (
            <m.div
              initial={{opacity: 0, y: '25%'}}
              whileInView={{opacity: 1, y: '0', transition: {duration: 1, ease: 'easeOut'}}}
              viewport={{once: true, amount: 'some', margin: '5%'}}
              key={project.name}
              className='bg-a-main dark:bg-d-a-main p-8 rounded-xl shadow-lg min-h-full flex flex-col max-[400px]:w-[300px] w-[400px]'
            >
              <p className='text-3xl font-semibold mb-2 bottom-border w-fit'>{project.name}</p>
              <p className='text-sm dark:text-d-second mb-3'>{project.date}</p>
              <p className='text-base'>{project.description}</p>
              <div className='flex flex-wrap gap-3 mt-4'>
                {project.tags.length != 0 && project.tags.map(tag => {
                  return (
                    <p key={tag} className='text-sm text-a-main dark:text-d-main bg-second dark:bg-a-main font-semibold w-fit px-3 py-1 rounded-2xl'>{tag}</p>
                  );
                })}
              </div>
              <div className="mt-auto flex flex-col sm:flex-row justify-between">
                {project.github && <Link href={project.github} className='' target='_blank'><p className='robot-learn-more'>View Code</p></Link>}
                {project.page && <Link href={project.page} className=''><p className='robot-learn-more'>Learn More</p></Link>}
              </div>
            </m.div>
          )
        })}
      </div>
    )
}