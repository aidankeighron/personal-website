'use client'

import css from "./page.module.css";
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from "./components/Scene";
import { Physics } from "@react-three/cannon";
import { Stats } from "@react-three/drei";
import { Container, Text, Root } from '@react-three/uikit'
import { useRouter } from "next/navigation";

const cardStyle = {
  titleFontSize: 22,
  contentFontSize: 12,
  width: 300,
  height: 100,
  padding: 15,
  marginBottom: 100,
  marginLeft: 550,
};

type Project = {
  title: string
  languages: string[],
  techStack: string[],
  shortDescription: string,
  page: string,
}

export default function Home() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    fetch("/projects.json").then(Response => Response.json()).then(data => {
      let newProjectList: Project[] = []
      data.projects.forEach((project: Project) => {
        newProjectList.push(project);
      });
      setProjectList(newProjectList);
    });
  }, []);
  
  return(
    <main className={css.main}>
      <div className={css.scene}>
        <Canvas>
          <Physics
            broadphase="SAP" gravity={[0, -2.6, 0]}>
            <Scene />
          </Physics>
          <Stats />
          <Root flexDirection="column" anchorX={'center'} anchorY={'center'} >
          <Container transformRotateX={-90} flexDirection="column" positionType={"absolute"} inset={0} positionTop={0} positionLeft={0}>
            {(() => {
              return (projectList.map((project, index) => {
                let language = "Language" + (project.languages.length > 1 ? "s: " : ": ") + project.languages.join(", ");
                if (project.languages.length > 1) {
                  let index = language.lastIndexOf(",");
                  language = `${language.substring(0, index)}${project.languages.length == 2 ? "" : ","} and${language.substring(index + 1)}`;
                }
                let techStack = "TechStack: " + project.techStack.join(", ");
                if (project.techStack.length > 1) {
                  let index = techStack.lastIndexOf(",");
                  techStack = `${techStack.substring(0, index)}${project.techStack.length == 2 ? "" : ","} and${techStack.substring(index + 1)}`;
                }
                // const marginLeft = index % 2 != 0 ? cardStyle.marginLeft : 0;
                const marginLeft = 0;

                return (
                  <Container key={project.title} backgroundOpacity={0.5} backgroundColor="grey" width={cardStyle.width} height={cardStyle.height} 
                  flexDirection={"column"} padding={cardStyle.padding} marginLeft={marginLeft} marginBottom={cardStyle.marginBottom}
                  onClick={() => {router.push(`/${project.page}`)}}>
                    <Text fontWeight={"semi-bold"} fontSize={cardStyle.titleFontSize}>{project.title}</Text>
                    <Text fontWeight={"normal"} fontSize={cardStyle.contentFontSize}>{language}</Text>
                    <Text fontWeight={"normal"} fontSize={cardStyle.contentFontSize}>{techStack}</Text>
                    <Text fontWeight={"normal"} fontSize={cardStyle.contentFontSize}>{project.shortDescription}</Text>
                  </Container>);
              }));
            })()}        
          </Container>
          </Root>
        </Canvas>
      </div>
      <div className={css.header}>
        <p>Aidan Keighron</p>
      </div>
    </main>
  );
}