import { PublicApi, RaycastVehiclePublicApi } from "@react-three/cannon";
import { useEffect, useRef, useState } from "react";

export function useControls(vehicleApi: RaycastVehiclePublicApi, chassisApi: PublicApi) {
  let [controls, setControls] = useState<{[key: string]: boolean}>({ });
  let shiftTimer = useRef<number>(0);
  let lastTimeSeconds = useRef<number>(Date.now()/1000);
  let gear = useRef<number>(1);
  let speed = useRef<number>(0);

  useEffect(() => {
    const keyDownPressHandler = (e: KeyboardEvent) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true}));
    }

    const keyUpPressHandler = (e: KeyboardEvent) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false}));
    }
  
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    }
  }, []);

  useEffect(() => {
    chassisApi.velocity.subscribe((value) => {
      speed.current = Math.sqrt(
        Math.pow(value[0], 2) + Math.pow(value[1], 2) + Math.pow(value[2], 2) 
      );
    });
  }, []);
  useEffect(() => {
    if(!vehicleApi || !chassisApi) return;
    const currentTimeSeconds = Date.now() / 1000;
    const timeStep = currentTimeSeconds - lastTimeSeconds.current;
    lastTimeSeconds.current = currentTimeSeconds;

    const engineForce = 500;
    const maxGears = 5;
    const gears: {'R': number, [key: number]: number} = {
      'R': -4,
      '0': 0,
      '1': 5,
      '2': 9,
      '3': 13,
      '4': 17,
      '5': 22,
    }

    if (shiftTimer.current > 0) {
      shiftTimer.current -= timeStep;
      shiftTimer.current = Math.max(0, shiftTimer.current);
    } 
    else {
      if (controls.s) {
        const power = (gears['R'] - Math.abs(speed.current)) / Math.abs(gears['R']);
        const force = (engineForce / gear.current) * (Math.abs(power) ** 1);
        vehicleApi.applyEngineForce(-force, 2);
        vehicleApi.applyEngineForce(-force, 3);
      }
      else {
        const power = (gears[gear.current] - speed.current) / (gears[gear.current] - gears[gear.current-1]);
        console.log(power);
        if (power < 0.7 && gear.current < maxGears) {
          console.log("Upshift");
          gear.current += 1;
          shiftTimer.current = 0.2;
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }
        else if (power > 1.2 && gear.current > 1) {
          console.log("Downshift");
          gear.current -= 1
          shiftTimer.current = 0.2;
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }
        else if (controls.w) {
          const force = (engineForce / gear.current) * (power ** 1);
          vehicleApi.applyEngineForce(force, 2);
          vehicleApi.applyEngineForce(force, 3);
        }
      }
    }
    console.log("Gear: ", gear.current, " Shift: ", shiftTimer.current);
    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for(let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.arrowdown)  chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    if (controls.arrowup)    chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    if (controls.arrowleft)  chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    if (controls.arrowright) chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
      gear.current = 1;
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
}