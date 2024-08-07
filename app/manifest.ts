import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Aidan Keighron personal website",
        short_name: "Personal Website",
        description: "Website to showcase personal projects",
        start_url: "/",
        categories: ["portfolio, personal website, aidan keighron, blog"],
        orientation: "portrait-primary",
        // icons: [ // TODO https://developer.mozilla.org/en-US/docs/Web/Manifest/icons
        //     {
        //       src: '/favicon.ico',
        //       sizes: 'any',
        //       type: 'image/x-icon',
        //     },
        // ],
    }
  }
