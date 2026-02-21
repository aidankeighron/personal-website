'use client';

import { useEffect, useState } from "react";

export default function BackToTop() {
    const [buttonVisible, setButtonVisible] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setButtonVisible(document.documentElement.scrollTop > 20);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
          };
    }, []);

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <>
            {buttonVisible && <button onClick={backToTop} type="button" id="btn-back-to-top" data-twe-ripple-init data-twe-ripple-color="light"
            className="!fixed bottom-5 end-5 rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:border-2 dark:border-t-main">
                <span className="[&>svg]:w-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                </span>
            </button>}
        </>
    )
}