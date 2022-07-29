import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { usePlane } from "@react-three/cannon"
import grass from "../../../assets/3drendering/grass.jpg"

const Floor = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  const texture = useTexture(grass)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
    {/*   <meshStandardMaterial map={texture} map-repeat={[240, 240]} color="green" /> */}
         <meshPhongMaterial attach="material" color="#4f9bc4" />

    </mesh>
  )
}

export default Floor;
