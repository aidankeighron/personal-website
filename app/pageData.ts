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
    skill?: number,
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
            skill: 85,
        },
        {
            name: "Machine Learning",
            skill: 40,
        },
        {
            name: "Web Development",
            skill: 80,
        },
        {
            name: "Firebase (GCP)",
            skill: 60,
        },
        {
            name: "Git / GitHub",
            skill: 80,
        },
        {
            name: "REST",
            skill: 70,
        },
        {
            name: "Computer Vision",
            skill: 75,
        }
    ],
    "Soft Skills": [
        {
            name: "Team Leadership"
        },
        {
            name: "Communication"
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
        {
            name: "Problem Solving"
        },
        {
            name: "Project Management"
        },
        {
            name: "Creative Writing"
        },
        {
            name: "Resilience and Determination"
        },
        {
            name: "Passion for Learning"
        }
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
      description: "Aurora, IL",
      duration: "August 2022 - Present",
      bullets: ["Improved car tracking system accuracy by 48% and achieved real-time performance, decreasing processing time from 2 seconds to 0.2",
"Spearheaded development of a mobile app for the Paramount Theater, writing 60% of the code and seamlessly integrating with existing databases and payment systems",
"Empowered development team by providing 24/7 support, leading to a significant increase in productivity",
"Managed a team of 7+ interns, overseeing training and assigning tasks to maximize output"]
    }
]

type OtherProject = {
    name: string,
    description: string,
    date: string,
    tags: string[],
    page?: string,
    github?: string,
}

const otherProjects: OtherProject[] = [
    {
        name: "File Calculator",
        description: "A calculator that uses folders and files to do calculations",
        date: "February 2022",
        tags: ["Java", "Multithreading"],
        page: '/projects/file-calculator',
        github: 'https://github.com/aidankeighron/calculator',
    },
    {
        name: "Physics Simulation",
        description: "Physics simulation with an intractable cube that you can throw around a room",
        date: "September 2023 - October 2023",
        tags: ["C#", "Physics"],
        github: 'https://github.com/aidankeighron/simulation',
    },
    {
        name: "Fantasy FRC",
        description: "Website for running a fantasy draft with FRC teams. It handles everything from picking teams to calculating their score.",
        date: "October 2022 - January 2023",
        tags: ["HTML/CSS", "JavaScript", "Express.js", "Socket.io", "mySQL"],
        page: '/projects/fantasy-FRC',
        github: 'https://github.com/aidankeighron/fantasy-FRC',
    },
    {
        name: "Machine Learning Maze",
        description: "Neural Network for a cube traveling through a maze, built without libraries.",
        date: "October 2021 - January 2022",
        tags: ["AI", "Java"],
        github: 'https://github.com/aidankeighron/machine-learning',
    },
    {
        name: "Sheet Scraper",
        description: "Scraped designed to make a collection of every FRC shirt trade.",
        date: "October 2021 - January 2022",
        tags: ["Python", "Google Sheets API"],
        page: '/projects/sheet-scraper',
        github: 'https://github.com/aidankeighron/sheet-scraper',
    },
    {
        name: "Productivity",
        description: "Productivity software that runs in the corner of your desktop to keep track of all of your tasks, has many other cool features.",
        date: "December 2021 - May 2022",
        tags: ["Swing", "Java"],
        page: '/projects/productivity',
        github: 'https://github.com/aidankeighron/productivity',
    },
    {
        name: "PID Visualizer",
        description: "Visualization of a PID algorithm that is fully tuneable.",
        date: "January 2023",
        tags: ["Java", "Swing", "PID", "Robotics"],
        page: '/projects/PID-visualizer',
        github: 'https://github.com/aidankeighron/PID-visualizer',
    },
    {
        name: "Compression Algorithm",
        description: "Python compression algorithm that uses random number seeding to compress large files to a few bytes.",
        date: "July 2023",
        tags: ["Python", "Compression", "Algorithms"],
        github: "https://github.com/aidankeighron/compression-algorithm",
    },
    {
        name: "Smash Elo Ranking",
        description: "Elo algorithm implementation for personal Super Smash Bros Ultimate tournament.",
        date: "October 2023",
        tags: ["Python", "Elo"],
        github: "https://github.com/aidankeighron/smash-elo-ranking/tree/main"
    },
    {
        name: "Reminder Notification",
        description: "Desktop app to schedule recurring reminders with custom notifications.",
        date: "August 2023",
        tags: ["JavaScript", "Electron.js"],
        github: "https://github.com/aidankeighron/reminder-notification/commits/main/"
    },
    {
        name: "Youtube Limit",
        description: "Chrome extension to block Youtube usage until all due Asana (time management tool) tasks have been complected.",
        date: "September 2023",
        tags: ["Productivity", "JavaScript", "Chrome Extension", "API"]
    },
    {
        name: "Asana Notes App",
        description: "Mobile app to view and add new tasks to Asana (time management tool).",
        date: "August - September 2023",
        tags: ["Asana", "JavaScript", "React Native"]
    },
    {
        name: "Group Extension",
        description: "Save and load chrome tab groups across devices.",
        date: "July 2013",
        tags: ["Chrome extension", "JavaScript", "Productivity"],
        github: "https://github.com/aidankeighron/group-extension"
    },
    {
        name: "Falling Sand",
        description: "Particle physics simulator with a multitude of different elements to choose from.",
        date: "April 2022",
        tags: ["Java", "Swing", "Physics"],
        github: "https://github.com/aidankeighron/falling-sand"
    },
    {
        name: "Util",
        description: "Utility website with a collection of advanced programming concepts, list of algorithms and data structures, and helpful links.",
        date: "October 2022 - Present",
        tags: ["JavaScript", "Jekyll", "Utility"],
        github: "https://github.com/aidankeighron/Util"
    }
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