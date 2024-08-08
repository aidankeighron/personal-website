'use client';

import { m } from "framer-motion";
import { skillsets, workExperience } from "../pageData";

export default function Skillsets() {
    const variants = {
      visible: {
        opacity: 1,
        transition: {when: "beforeChildren", staggerChildren: 0.5}
      },
      hidden: {
        opacity: 0,
        transition: {when: "afterChildren"}
      },
    }
  
    const item = {
      visible: {
        opacity: 1,
        x: '0',
        transition: {ease: 'easeOut', duration: 1}
      },
      hidden: {
        opacity: 0,
        x: '-25%',
      },
    }
    
    return (
      <>
      <m.div 
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 'some'}}
        variants={variants}
        className='mx-[5%] flex flex-wrap flex-row sm:justify-around mb-10 dark:text-main text-d-main w-[90%]'
        id={'skills'}
      >
        {(() => {
          return (Object.entries(skillsets).map(([name, skillset]) => {
            return (
              <m.div 
                variants={item}
                key={name} className='p-4 mt-5'
              >
                <h1 className='w-min text-3xl font-bold mb-6'>{name}</h1>
                {skillset.map(skill => {
                  return (
                    <div className='mb-5 font-medium' key={skill.name}>
                      <h2 className='text-xl'>{skill.name}</h2>
                      {skill.experienceYears !== undefined &&
                        <p className='text-base text-second font-light dark:font-extralight dark:text-d-second'>{skill.experienceYears} Year{skill.experienceYears != 1 ? 's' : ''}</p>}
                      {skill.subList !== undefined && skill.subList.map(sub => {
                        return <p key={sub} className='text-base text-second font-light dark:font-extralight dark:text-d-second'>● {sub}</p>
                      })}
                      {skill.skill !== undefined &&
                        <p className='text-base text-second dark:text-d-second font-light dark:font-extralight mb-1'>Skill Level {skill.skill}</p>}
                    </div>
                  )
                })}
              </m.div>
          )}));
        })()}
      </m.div>
      <m.div 
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 'some'}}
        variants={variants}
        className='mx-[10%] mb-10 dark:text-main text-d-main'
      >
        <h1 className='text-4xl font-bold mb-6'>Work Experience</h1>
        {workExperience.map(experience => {
          return (
          <m.div 
            variants={item}
            key={experience.company}
          >
            <h2 className='text-2xl font-bold bottom-border w-fit mb-3'>{experience.company}</h2>
            <h3 className='text-sm mb-1 text-second dark:text-d-second'>{experience.description}</h3>
            <h4 className='text-sm mb-4 text-second dark:text-d-second'>{experience.duration}</h4>
            {experience.bullets.map(bullet => {
              return (<p key={bullet} className='text-base mb-2'>● {bullet}</p>);
            })}
          </m.div>
          );
        })}
      </m.div>
      </>
    );
}