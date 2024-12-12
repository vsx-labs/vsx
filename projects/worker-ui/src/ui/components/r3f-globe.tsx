import R3fGlobe from 'r3f-globe';
import { useMemo, useCallback } from "react";

export const ExampleGlobe = () => {
    const N = 300;

    const gData = useMemo(() => [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() / 3,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    })), [N]);

    return <R3fGlobe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={gData}
        pointAltitude="size"
        pointColor="color"
        onHover={useCallback((...args) => console.log('hover', ...args), [])}
        onClick={useCallback((...args) => console.log('click', ...args), [])}
    />;

};
