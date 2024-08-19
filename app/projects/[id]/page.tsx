import Link from "next/link";
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import BackToTop from "../../components/BackToTop";
import { redirect } from 'next/navigation'

const uppercaseWords = (str: string) => str.replace(/(^.|\s.)/g, c => c.toUpperCase());

type ProjectParams = {
  params: {
    id: string,
  }
}

export default function Project({params}: ProjectParams) {
  const DynamicContent = dynamic(async () => {
    let mdxFile;
    try {
      mdxFile = await import(`./${params.id}.mdx`);
    }
    catch (error) {
      console.log("error");
      redirect(("/404"));
    }
    return mdxFile;
  }, {
    suspense: true,
  });
  const pageTitle = uppercaseWords(params.id.replaceAll("-", " "));

  return(
    <>
      <Link href='/'><p className='header-link w-fit fixed z-10 items-end justify-end top-10 left-20'>Home</p></Link>
      <div className='flex flex-col items-center pt-40'>
        <title>{`${pageTitle} | Aidan Keighron`}</title>
        <div className='content'>
        <Suspense fallback={<p className='animate-pulse w-fit mx-auto text-2xl'>Loading...</p>}>
          <DynamicContent />
        </Suspense>
        </div>
      </div>
      <BackToTop />
    </>
  );
}

// export async function getStaticPaths() { // TODO
//   const projects: string[] = [
//     "test",
//     "file-calculator",
//     "productivity",
//     "sheet-scraper",
//   ];

//   return {
//     paths: projects.map((project) => {
//       return {
//         params: {
//           id: project.replace(/\.md$/, ''),
//         },
//       };
//     }),
//     fallback: false,
//   };
// }

// "use client"; // TODO

// import { Html, PerformanceMonitor, Stats } from '@react-three/drei';
// import Content from './content.mdx';
// import { Canvas } from '@react-three/fiber';
// import { Scene } from "../components/physics/Scene";
// import { Physics } from "@react-three/cannon";
// import { StrictMode, useState } from 'react';
// import Link from 'next/link';

// export default function Page() {
//   const [dpr, setDpr] = useState(1.5);

//   return (
//     <div className='scene bg-d-main flex flex-col items-center'>
//     <title>File Calculator | Aidan Keighron</title>
//     <Link href='/'><p className='header-link w-fit absolute z-10 items-end justify-end top-10 left-20'>Home</p></Link>
//       <StrictMode>
//         <Canvas frameloop="demand" dpr={dpr} performance={{current: 1, min: 0.1, max: 1, debounce: 200}} className='bg-d-main'>
//         <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
//           <Physics
//             broadphase="SAP" gravity={[0, -2.6, 0]}>
//             <Scene startPosition={[0, 0.1, -12]}/>
//           </Physics>
//           <Stats />
//           <Html className="contentWrapper" transform rotation-x={-Math.PI / 2} position={[0, 0, 0]} occlude="blending" scale={0.1} fullscreen>
//               <div className='content' style={{transform: 'scale(2)'}}>
//                 <Content />
//               </div>
//           </Html>
//         </PerformanceMonitor>
//         </Canvas>
//       </StrictMode>
//       </div>
//   );
// }