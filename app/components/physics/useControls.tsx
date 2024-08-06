import { Position } from "@/app/types";
import { PublicApi, RaycastVehiclePublicApi } from "@react-three/cannon";
import { useEffect, useRef, useState } from "react";

export function useControls(vehicleApi: RaycastVehiclePublicApi, chassisApi: PublicApi, startPosition: Position) {
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
    let subscription = chassisApi.velocity.subscribe((value) => {
      speed.current = Math.sqrt(
        Math.pow(value[0], 2) + Math.pow(value[1], 2) + Math.pow(value[2], 2) 
      );
    });
    console.log("Subscribing to velocity");

    return () => {
      subscription();
    }
  });

  
  useEffect(() => {
    const frontSteering = 0.5;
    const backSteering = 0.1; // 0.25 drift?
    const engineForce = 500;
    const shiftTime = 0.2;
    const gears: {'R': number, [key: number]: number} = {
      'R': -0.5,
      '0': 0,
      '1': 1.0,
      '2': 1.7,
      '3': 2.5,
      '4': 3.8,
      '5': 5.0,
    }

    if(!vehicleApi || !chassisApi) return;
    const currentTimeSeconds = Date.now() / 1000;
    const timeStepSeconds = currentTimeSeconds - lastTimeSeconds.current;
    lastTimeSeconds.current = currentTimeSeconds;
    console.log("Time Step Milliseconds", timeStepSeconds*1000);

    const forward = controls.w || controls.arrowup;
    const reverse = controls.s || controls.arrowdown;
    const breaking = controls[" "];
    const left = controls.a || controls.arrowleft;
    const right = controls.d || controls.arrowright;
    const reset = controls.r;

    if (shiftTimer.current > 0) {
      shiftTimer.current -= timeStepSeconds;
      shiftTimer.current = Math.max(0, shiftTimer.current);
    } 
    else {
      if (reverse) {
        const power = (gears['R'] - Math.abs(speed.current)) / Math.abs(gears['R']);
        const force = (engineForce / gear.current) * Math.abs(power);
        vehicleApi.applyEngineForce(-force, 2);
        vehicleApi.applyEngineForce(-force, 3);
      }
      else {
        const power = (gears[gear.current] - speed.current) / (gears[gear.current] - gears[gear.current-1]);
        if (power < 0.1 && gear.current < Object.keys(gears).length-2) { // -2 for 0 and R
          console.log("Upshift");
          gear.current += 1;
          shiftTimer.current = shiftTime;
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }
        else if (power > 1.2 && gear.current > 1) {
          console.log("Downshift");
          gear.current -= 1
          shiftTimer.current = shiftTime;
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }
        else if (forward) {
          const force = (engineForce / gear.current) * power;
          vehicleApi.applyEngineForce(force, 2);
          vehicleApi.applyEngineForce(force, 3);
        }
      }
    }

    if (breaking) {
      vehicleApi.setBrake(3, 2);
      vehicleApi.setBrake(3, 3);
    }
    else {
      vehicleApi.setBrake(0, 2);
      vehicleApi.setBrake(0, 3);
    }
    

    if (!forward && !reverse && !breaking) {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
      vehicleApi.setBrake(1, 2);
      vehicleApi.setBrake(1, 3);
    }
    // if (forward) {
    //   vehicleApi.applyEngineForce(100, 2);
    //   vehicleApi.applyEngineForce(100, 3);
    // }

    if (left) {
      vehicleApi.setSteeringValue(frontSteering, 2);
      vehicleApi.setSteeringValue(frontSteering, 3);
      vehicleApi.setSteeringValue(-backSteering, 0);
      vehicleApi.setSteeringValue(-backSteering, 1);
    } else if (right) {
      vehicleApi.setSteeringValue(-frontSteering, 2);
      vehicleApi.setSteeringValue(-frontSteering, 3);
      vehicleApi.setSteeringValue(backSteering, 0);
      vehicleApi.setSteeringValue(backSteering, 1);
    } else {
      for(let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (reset) {
      chassisApi.position.set(...startPosition);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, Math.PI, 0);
      gear.current = 1;
    }
  }, [controls, vehicleApi, chassisApi, startPosition]);

  return controls;
}