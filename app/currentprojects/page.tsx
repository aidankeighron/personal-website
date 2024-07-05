'use client'

import css from './page.module.css';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

type Project = {
    name: string,
    description: string
}

export default function CurrentRobots() {
    const [projectList, setProjectList] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/data.json").then(Response => Response.json()).then(data => {
          let newProjectList: Project[] = []
          data.currentProjects.forEach((project: Project) => {
            newProjectList.push(project);
          });
          setProjectList(newProjectList);
        });
      }, []);

    return (
        <main className='main'>
        <Header />
        <div>
            <div className={css.projects}>
                <h1>Current Projects</h1>
                {(() => {
                    return (projectList.map((project) => {
                        return (
                            <div className={css.project}>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                            </div>
                        );
                    }));
                })()}
            </div>
        </div>
      </main>
    )
}