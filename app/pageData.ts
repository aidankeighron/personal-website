import { Position, Rotation } from "./types"

type Robot = {
    name: string,
    description: string,
    modelUrl: string,
    scale: number,
    position: Position,
    rotation: Rotation,
    title?: string,
    titleBody?: string,
    titleRightAlign?: boolean,
}
  
const robotList: Robot[] = [
    {
      name: "Bad Conflict",
      description: `I am the Team Manager of a combat robotics team, Bad Conflict, we compete in ant-weight robotics competitions. 
      I am an alumni of FRC team 2451 PWNAGE and FLL team 11676 TechNo Turtles. I have been doing competitive robotics since middle 
      school and I height recommend it to anyone even vaguely interested.`,
      modelUrl: "/models/twofold.glb",
      scale: 2,
      position: [0, 0, 0],
      rotation: [-1, -0.1, Math.PI + 0.2],
    },
    {
      name: "Horizon",
      description: `My current robot is Horizon a horizontal spinner. It has 1/8 in Carbon Fiber top and bottom plates for armor and a TPU (3D printable rubber) chassis to absorb damage. With a 101g AR500 weapon spinning, theoretically, at 18000 RPM. That is a tip speed of 350 MPH, packing quite a punch.`,
      modelUrl: "/models/horizon.glb",
      scale: 2,
      position: [0, 0, 0],
      rotation: [2*Math.PI/3, 0, -Math.PI/12],
    },
    {
      name: "Mantis",
      description: "",
      modelUrl: "/models/horizon.glb",
      // modelUrl: "/models/mantis.glb",
      scale: 1,
      position: [0,0,0],
      rotation: [0,0,0],
      title: "Competitive Robotics",
      titleBody: "January 2019 - May 2023",
      titleRightAlign: false,
    }
]

type Project = {
    name: string,
    description: string,
    videoUrl?: string,
    imageUrl?: string,
    imageAlt?: string,
}

const projectList: Project[] = [
    {
        name: "Alchemy",
        description: `I am the Team Manager of a combat robotics team, Bad Conflict, we compete in ant-weight robotics competitions. I am an alumni of FRC team 2451 PWNAGE and FLL team 11676 TechNo Turtles. I have been doing competitive robotics since middle school and I height recommend it to anyone even vaguely interested.`,
        videoUrl: "/videos/introVideo1.mp4",
    },
    {
        name: "Personal Website",
        description: `My current robot is Horizon a horizontal spinner. It has 1/8 in Carbon Fiber top and bottom plates for armor and a TPU (3D printable rubber) chassis to absorb damage. With a 101g AR500 weapon spinning, theoretically, at 18000 RPM. That is a tip speed of 350 MPH, packing quite a punch.`,
        imageUrl: "/images/aidan_profile.jpg",
        imageAlt: "Video of Personal Website",
    },
]

type Skill = {
    name: string,
    experienceYears?: number,
    skill?: 1 | 2 | 3 | 4 | 5,
}

const skillsets: {[key: string]: Skill[]} = {
    Languages: [{
        name: "Python",
        experienceYears: 2,
    },
    {
        name: "Java",
        experienceYears: 3,
    }],
    Technologies: [
        {
        name: "GCP",
        skill: 2,
        },
        {
        name: "Machine Learning",
        skill: 3,
        }
    ]
}

type WorkExperience = {
    company: string,
    description: string,
    duration: string,
    bullets: string,
}
  
const workExperience: WorkExperience[] = [
    {
      company: "APS Data Technologies",
      description: "Tech startup based out of Auroria, IL",
      duration: "August 2022 - Present",
      bullets: `● Worked on backend systems for car tracking in a parking lot, using machine learning to identify potential cars, filtering the outputted list of cars and finding their match from the previous frame
  ● Optimizing said algorithm to get it running in real time (from 2 seconds per frame to 10 frames per second)
  ● Developed a mobile app for the Paramount Theater in downtown Aurora, allowing users to purchase tickets and memberships, working with their backend databases to ensure live updates and a seamless transition for existing users, adding extra security measures to help with fraud prevention
  ● Managed a team of 7+ interns, handled team training and task assignments
  ● Managed other company projects, performing code reviews and helping developers solve code issues
  `
    }
]

export { robotList, projectList, skillsets, workExperience }