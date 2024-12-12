import { useCallback, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { TrackballControls } from '@react-three/drei';
import R3fForceGraph from 'r3f-forcegraph';
import * as gData from '../../../data/miserables.json';

const GraphViz = () => {
    const fgRef = useRef(null);
    useFrame(() => {
        return fgRef.current.tickFrame();
    });

    return <R3fForceGraph
        ref={fgRef}
        graphData={gData}
        nodeAutoColorBy="group"
        linkDirectionalParticles="value"
        linkDirectionalParticleWidth={0.9}
        onNodeHover={useCallback((node: unknown) => node && console.log(node), [])}
    />;
}

export const Scene = () => {
    return <div style={{ height: window.innerHeight }}>
        <Canvas camera={{ position: [0, 0, 400], far: 4000 }}>
            <TrackballControls />
            <color attach="background" args={[0, 0, 0.01]} />
            <ambientLight intensity={Math.PI} />
            <directionalLight intensity={0.6 * Math.PI} />
            <GraphViz />
        </Canvas>
    </div>;
};