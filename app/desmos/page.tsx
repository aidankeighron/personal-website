'use client';

export default function Desmos() {
    return (
        <div className="flex flex-col px-24 py-10">
            <p className="text-6xl mb-5">Desmos</p>
            <p className="text-lg mb-10">{`Desmos is a web graphing software that I frequently use to quickly graph equations or flesh out geometry.
I frequently used it in robotics to calculate the physics for a three jointed arm as you can see below. Here I have added a collection of by most interesting
graphs, ranging from Bezier curves to physics simulations.`}</p>
            <div className="flex flex-row flex-wrap gap-x-[150px] gap-y-20 justify-center">
                <iframe src="https://www.desmos.com/calculator/kvmakqu6wj?embed" width="500" height="500"></iframe>
                <iframe src="https://www.desmos.com/calculator/su0gmgibdm?embed" width="500" height="500"></iframe>
                <iframe src="https://www.desmos.com/calculator/m0metunn7h?embed" width="500" height="500"></iframe>
                <iframe src="https://www.desmos.com/calculator/57cx1ogahq?embed" width="500" height="500"></iframe>
                <iframe src="https://www.desmos.com/calculator/fdzqob9r9w?embed" width="500" height="500"></iframe>
                <iframe src="https://www.desmos.com/calculator/edyfq7liov?embed" width="500" height="500"></iframe>
                <iframe src="https://www.desmos.com/calculator/ow2jgopdrn?embed" width="500" height="500"></iframe>

            </div>
        </div>
    )
}