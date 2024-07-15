'use client'

import css from "./page.module.css";
import React, { StrictMode, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from "./components/physics/Scene";
import { Physics } from "@react-three/cannon";
import { Html, PerformanceMonitor, Stats } from "@react-three/drei";
import { Root, FontFamilyProvider } from '@react-three/uikit'
import { useRouter } from "next/navigation";
import Header from "./components/Header";

const cardStyle = {
  titleFontSize: 22,
  contentFontSize: 12,
  width: 400,
  height: 100,
  padding: 15,
  marginBottom: 100,
  centerGapLeft: 400,
  centerGapRight: 50,
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
  const [dpr, setDpr] = useState(1.5);
  const router = useRouter();
  
  useEffect(() => {
    fetch("/data.json").then(Response => Response.json()).then(data => {
      let newProjectList: Project[] = []
      data.projects.forEach((project: Project) => {
        newProjectList.push(project);
      });
      setProjectList(newProjectList);
    });
  }, []);
  // TODO start supporting dark/light mode from the start
  return(
    <main className='main'>
      <div className={css.scene}>
        <StrictMode>
          <Canvas frameloop="demand" dpr={dpr} performance={{current: 1, min: 0.1, max: 1, debounce: 200}}>
            <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
              <Physics
                broadphase="SAP" gravity={[0, -2.6, 0]}>
                <Scene startPosition={[0, 0.2, -2]} />
              </Physics>
              <Stats />
              <Root flexDirection="column" anchorX={'center'} anchorY={'center'} >
                <FontFamilyProvider
                  JetBrainsMono={{
                    normal: "/JetBrainsMono_Italic.json",
                  }}
                >
                  {/* TODO skills loading bar */}
                <Html className={css.contentWrapper} transform rotation-x={-Math.PI / 2} position={[0, 0, 0]} occlude="blending" scale={0.1} fullscreen>
                  <div className={css.projects}>
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

                      const marginLeft = index % 2 != 0 ? -cardStyle.centerGapLeft : cardStyle.centerGapRight;

                      return (
                        <div key={project.title} className={css.projectCard} style={{marginLeft}}
                        onClick={() => {router.push(`/${project.page}`)}}>
                          <h1>{project.title}</h1>
                          <p>{language}</p>
                          <p>{techStack}</p>
                          <p>{project.shortDescription}</p>
                        </div>
                      );
                    }));
                  })()}
                  </div> 
                </Html>
                {/* <Container transformRotateX={-90} flexDirection="column" positionType={"absolute"} inset={0} positionTop={0} positionLeft={0}>
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

                      const marginLeft = index % 2 != 0 ? -cardStyle.centerGapLeft : cardStyle.centerGapRight;

                      return (
                        <Container key={project.title} backgroundOpacity={0.7} backgroundColor="grey" width={cardStyle.width} height={cardStyle.height} 
                        flexDirection={"column"} padding={cardStyle.padding} marginLeft={marginLeft} marginBottom={cardStyle.marginBottom}
                        onClick={() => {router.push(`/${project.page}`)}} borderRadius={10} borderColor={'grey'} borderWidth={3}>
                          <Text fontFamily="JetBrainsMono" fontWeight={"normal"} fontSize={cardStyle.titleFontSize}>{project.title}</Text>
                          <Text fontFamily="JetBrainsMono" fontWeight={"normal"} fontSize={cardStyle.contentFontSize}>{language}</Text>
                          <Text fontFamily="JetBrainsMono" fontWeight={"normal"} fontSize={cardStyle.contentFontSize}>{techStack}</Text>
                          <Text fontFamily="JetBrainsMono" fontWeight={"normal"} fontSize={cardStyle.contentFontSize}>{project.shortDescription}</Text>
                        </Container>
                      );
                    }));
                  })()}        
                </Container> */}
                </FontFamilyProvider>
              </Root>
            </PerformanceMonitor>
          </Canvas>
        </StrictMode>
      </div>
      <Header />
    </main>
  );
}