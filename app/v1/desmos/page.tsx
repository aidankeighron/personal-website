'use client';

import Link from "next/link";

const width = '80%'
const height = 'w-[90%] sm:w-[80%] h-[40vh] sm:h-[50vh] md:h-[80vh]'

export default function Desmos() {
    return (
        <>
        <Link href='/v1'><p className='header-link w-fit fixed z-10 items-end justify-end top-10 left-[2.5%]'>Home</p></Link>
        <div className="flex flex-col px-5 sm:px-24 py-10">
            <p className="text-6xl mb-5 self-center">Desmos</p>
            <p className="text-lg mb-10">{`Desmos is a web graphing software that I frequently use to quickly graph equations or flesh out geometry.
My biggest use was physics calculations for a three jointed arm. Here I have added a collection of by most interesting
graphs, ranging from Bezier curves to physics simulations.`}</p>
            <div className="flex flex-col gap-y-20 items-center">
                <p className="mb-[-70px] text-lg">Bezier Curves</p>
                <iframe src="https://www.desmos.com/calculator/kvmakqu6wj?embed" width={width} className={height}></iframe>
                <p className="mb-[-70px] text-lg">Robotic Arm Kinematics</p>
                <iframe src="https://www.desmos.com/calculator/su0gmgibdm?embed" width={width} className={height}></iframe>
                <p className="mb-[-70px] text-lg">Polar</p>
                <iframe src="https://www.desmos.com/calculator/m0metunn7h?embed" width={width} className={height}></iframe>
                <p className="mb-[-70px] text-lg">Gravitational Torque Calculations</p>
                <iframe src="https://www.desmos.com/calculator/57cx1ogahq?embed" width={width} className={height}></iframe>
                <p className="mb-[-70px] text-lg">Gravity Simulation</p>
                <iframe src="https://www.desmos.com/calculator/fdzqob9r9w?embed" width={width} className={height}></iframe>
                <p className="mb-[-70px] text-lg">Robot Arm Motor Torque Calculation with Friction</p>
                <iframe src="https://www.desmos.com/calculator/edyfq7liov?embed" width={width} className={height}></iframe>
                <p className="mb-[-70px] text-lg">Robot Pathing</p>
                <iframe src="https://www.desmos.com/calculator/ow2jgopdrn?embed" width={width} className={height}></iframe>
            </div>
        </div>
        </>
    )
}