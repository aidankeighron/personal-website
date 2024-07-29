import { Position, Rotation } from "./types"

type Robot = {
    name: string,
    description: string,
    modelUrl?: string,
    imageUrl?: string,
    imageAlt?: string,
    videoUrl?: string,
    scale: number,
    position: Position,
    rotation: Rotation,
    pageUrl?: string,
}
  
const combatRobotList: Robot[] = [
    {
      name: "Bad Conflict",
      description: "I am the Team Manager of the combat robotics team, Bad Conflict. We compete in ant-weight robotics competitions, meaning the robots need to be less than one pound. Our team philosophy is to help our members compete in combat robotics by removing barriers to entry. We support our members throughout the creation process with member support for designing, wiring, and building. We also get corporate sponsorships to help offset the cost of combat robotics.",
      modelUrl: "/models/twofold.glb",
      scale: 2,
      position: [0, 0, 0],
      rotation: [-1, -0.1, Math.PI + 0.2],
    },
    {
      name: "Horizon",
      description: "My current robot is Horizon, a horizontal spinner. It has 1/8in Carbon Fiber top and bottom plates for stability and armor. Its chassis is made of TPU (3D printable rubber) to absorb damage. The weapon is a 101g AR500 weapon spinning, theoretically, at 18000 RPM. With a weapon diameter of over 6 inches, it has a tip speed of 350 MPH, packing quite a punch. Horizon also has a slower weapon configuration, as the previous configuration often runs out of power near the end of the 3 minute matches.",
      modelUrl: "/models/horizon.glb",
      scale: 2,
      position: [0, 0, 0],
      rotation: [2*Math.PI/3, 0, -Math.PI/12],
    },
]

const competitiveRobotList: Robot[] = [
    {
      name: "Mantis",
      description: "I did competitive robotics in high school as the Programming Lead of team 2451 PWNAGE. Each season, we built a 125 pound robot to compete in 3v3 competitions. We build a wide variety of robots, from a 420 degree turret that shoots basketball sized balls to a triple jointed arm able to pick up cones and cubes. It was a lot of fun designing the code for these robots. You had to ride the line of what the robot was capable of and get it as fast as possible without burning out a motor or snapping a shaft.",
      imageUrl: "/images/2451-2023-1.png",
      imageAlt: "Image of 2451's 2023 FRC Robot",
      videoUrl: "/videos/mantis_demo_1.mp4",
      scale: 1,
      position: [0,0,0],
      rotation: [0,0,0],
    }
]

type Project = {
    name: string,
    description: string,
    videoUrl?: string,
    imageUrl?: string,
    imageAlt?: string,
    page?: string,
}

const projectList: Project[] = [
    {
        name: "Alchemy",
        description: "Alchemy is a task management tool that I designed to help me improve my time management. I always struggled with time management and I could never find an app or piece of software that suited me. Everything had too much overhead, which resulted in it taking forever to plan out my tasks. I set out to create a tool that would let you instantly create new tasks without removing customizability. I ended up with Alchemy. To create a task, all you have to do is click on the day you plan to complete the task and type in the name. It's that simple. You don’t need to do any unnecessary configuration or go through 3 menus before your task gets created; it's just one click. And with a powerful and fully customizable name pattern system, you can configure a task just by adding certain prefixes and suffixes to the task name. Maybe you set it up so a task prefixed with an exclamation mark colors the task red. Alchemy is fully customizable, so let it become the task management software designed just for you.",
        videoUrl: "/videos/intro_video1.mp4",
    },
    {
        name: "Personal Website",
        description: "This website is a project that came about because I felt like my previous personal website did not capture my nature as a backend developer. So I went back to the drawing board to make a new website that captured who I am as a programmer. I stumbled across Three.js, a library for 3D rendering on a website and an idea was born. I used Three.js to showcase 3D models of my robots and other projects. As you traverse through my website, you will see other instances of it, including a driveable demo of my combat robotics and a race course you can drive on. This website will be a live canvas for my development career. I will keep it up to date with my new projects and try to add new and exciting features. Check back in every once in a while to see what's new.",
        imageUrl: "/images/aidan_profile.jpg",
        imageAlt: "Image of Personal Website",
    },
]

type Skill = {
    name: string,
    experienceYears?: number,
    skill?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    subList?: string[]
}

const skillsets: {[key: string]: Skill[]} = {
    "Programming Languages": [
        {
            name: "Python",
            experienceYears: 2,
        },
        {
            name: "Java",
            experienceYears: 3,
        },
        {
            name: "C++",
            experienceYears: 1,
        },
        {
            name: "C#",
            experienceYears: 3,
        },
        {
            name: "JavaScript / TypeScript",
            experienceYears: 2,
            subList: ["React Native", "Electron", "Express.js / Socket.io", "Next.js"],
        },
        {
            name: "HTML / CSS",
            experienceYears: 2,
        },
    ],
    "Technical Skills": [
        {
            name: "Software Development",
            skill: 8,
        },
        {
            name: "Machine Learning",
            skill: 4,
        },
        {
            name: "Web Development",
            skill: 7,
        },
        {
            name: "Firebase (GCP)",
            skill: 6,
        },
        {
            name: "Git / GitHub",
            skill: 7,
        },
        {
            name: "REST",
            skill: 6,
        },
    ],
    "Soft Skills": [
        {
            name: "Team Management"
        },
        {
            name: "Leadership"
        },
        {
            name: "Agile Development"
        },
        {
            name: "CI/CD Development"
        },
        {
            name: "Time Management"
        },
    ]
}

type WorkExperience = {
    company: string,
    description: string,
    duration: string,
    bullets: string[],
}
  
const workExperience: WorkExperience[] = [
    {
      company: "APS Data Technologies",
      description: "Tech startup based out of Aurora, IL",
      duration: "August 2022 - Present",
      bullets: ["Worked on backend systems for car tracking in a parking lot, using machine learning to identify potential cars, filtering the outputted list of cars and finding their match from the previous frame",
                "Optimizing said algorithm to get it running in real time (from 2 seconds per frame to 10 frames per second)",
                "Developed a mobile app for the Paramount Theater in downtown Aurora, allowing users to purchase tickets and memberships, working with their backend databases to ensure live updates and a seamless transition for existing users, adding extra security measures to help with fraud prevention",
                "Managed a team of 7+ interns, handled team training and task assignments",
                "Managed other company projects, performing code reviews and helping developers solve code issues"]
    }
]

type OtherProject = {
    name: string,
    description: string,
    date: string,
    tags: string[],
    page?: string,
}

const otherProjects: OtherProject[] = [
    {
        name: "File Calculator",
        description: "A calculator that uses folders and files to do calculations",
        date: "February 2022",
        tags: ["Java", "Multithreading"],
        page: '/file-calculator'
    },
    {
        name: "Physics Simulation",
        description: "Physics simulation with an intractable cube that you can throw around a room",
        date: "September 2023 - October 2023",
        tags: ["C#", "Physics"],
    },
    {
        name: "Fantasy FRC",
        description: "Website for running a fantasy draft with FRC teams. It handles everything from picking teams to calculating their score.",
        date: "October 2022 - January 2023",
        tags: ["HTML/CSS", "JavaScript", "Express.js", "Socket.io"],
    },
    {
        name: "Machine Learning Maze",
        description: "Neural Network for a cube traveling through a maze, built without libraries.",
        date: "October 2021 - January 2022",
        tags: ["AI", "Java"],
    },
    {
        name: "Sheet Scraper",
        description: "Scraped designed to make a collection of every FRC shirt trade.",
        date: "October 2021 - January 2022",
        tags: ["Python", "Google Sheets API"],
        page: '/sheet-scraper'
    },
    {
        name: "Productivity",
        description: "Productivity software that runs in the corner of your desktop to keep track of all of your tasks, has many other cool features.",
        date: "December 2021 - May 2022",
        tags: ["Swing", "Java"],
        page: '/productivity'
    },
];

type BCRobot = {
    name: string,
    record: {
        w: string | number,
        l: string | number,
    },
    description: string,
    info: {
        [key: string]: string,
    },
    image1?: string,
    image1Alt?: string,
    image2?: string,
    image2Alt?: string,
}

const badConflictRobots: BCRobot[] = [
    {
        name: "Horizon",
        record: {
            w: 1,
            l: 3
        },
        description: "Horizon is a horizontal spinner with a 100g weapon that spins at ~18000 RPM. It has a TPU chassis to absorb impact and Carbon Fiber top and bottom plates for rigidity. It's weapon is AR500 Steel and has a tip speed of 350 MPH.",
        info: {
            "Weight": "TODO",
            "Weapon Hit Force": "TODO",
            "Dimensions": "6.6in x 4.9in x 1.5in",
            "Number of Wires": "15"
        },
    },
    {
        name: "Twofold",
        record: {
            w: "5",
            l: "7"
        },
        description: "Twofold is a double wedge designed to get under opponents and push them around. The double wedge design allows Twofold to take a lot more damage as it comes with a spare ready to go. Fun fact: Twofold is so low to the ground that some weapons are unable to do any damage.",
        info: {
            "Weight": "0.5lb",
            "Weapon Hit Force": "0",
            "Dimensions": "7in x 7.2in x 1in",
            "Ground Effect": "All of it"
        },
        image1: "/images/twofold_1.jpg",
        image1Alt: "Twofold after a competition",
        image2: "/images/twofold_2.jpg",
        image2Alt: "Twofold before a competition",
    }
];

export { combatRobotList, projectList, skillsets, workExperience, competitiveRobotList, otherProjects, badConflictRobots }