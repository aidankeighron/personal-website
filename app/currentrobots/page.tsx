'use client'

import css from './page.module.css';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

type Robot = {
    name: string,
    record: {
        w: string,
        l: string,
    },
    description: string,
    info: {
        [key: string]: string,
    }
}

export default function CurrentRobots() {
    const [robotList, setRobotList] = useState<Robot[]>([]);

    useEffect(() => {
        fetch("/data.json").then(Response => Response.json()).then(data => {
          let newRobotList: Robot[] = []
          data.robots.forEach((robots: Robot) => {
            newRobotList.push(robots);
          });
          setRobotList(newRobotList);
        });
      }, []);

    return (
        <main className='main'>
        <Header />
        <div className={css.robots}>
            <h1>Current Robots</h1>

            <h2>Combat Robots - Antweight (1lb)</h2>
            {/* TODO Image of robot */}
            {(() => {
              return (robotList.map((robot) => {
                return (
                    <div className={css.robot}>
                        <h3>{robot.name}</h3>
                        <h4>W: {robot.record.w}, L: {robot.record.l}</h4>
                        <p className={css.robotDescription}>{robot.description}</p>
                        <div className={css.robotInfo}>
                            {(() => {
                                return (Object.entries(robot.info).map(([key, value]) => {
                                    console.log(key, value);
                                    return (
                                        <p>{key}: {value}</p>
                                    );
                                }));
                            })()}
                        </div>
                    </div>
                );
              }));
            })()}
        </div>
      </main>
    )
}