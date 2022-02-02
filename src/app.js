import React, { useState } from "react";
import { Cartesian3, createWorldTerrain, Ion, IonResource } from "cesium";
import { Viewer, Entity, Cesium3DTileset, CameraFlyTo } from "resium";
import "./App.css";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmFiNmE5Yi1hYmMxLTQ4MTYtOTFmYy0zOGVhNzg1MDgzODgiLCJpZCI6Nzc4MTcsImlhdCI6MTY0MTk5ODQ1NH0.aqwcpB-mIgcH5dRPxFYWsAOgNsZVW9mNxPMpFcf23Sk";
  
  export default function App() {
    const terrainProvider = createWorldTerrain();
    const positionBrasil = Cartesian3.fromDegrees(-45.9387, -17.9302, 20000000.0);
    const positionBarragem8 = Cartesian3.fromDegrees(-46.907051, -19.681241, 5000.0);
    const positionCapimBranco = Cartesian3.fromDegrees(-44.073327, -20.108577, 2000.0);
    const [posicaoCamera, setPosicaoCamera] = useState(positionBrasil);

    function handleClick(destination) {
      setPosicaoCamera(destination);
    }

    return (
    <div className="baseMap3D">
      <Viewer
        className="ViewerMap"
        full
        terrainProvider={terrainProvider}
      >
        <CameraFlyTo destination={posicaoCamera} /> 
        <Cesium3DTileset url={IonResource.fromAssetId(751563)} />
      </Viewer>
      <div className="baseInputs">
        <select>
          <option selected onClick={()=> handleClick(positionBrasil)}>Selecione uma Obra</option>
          <option onClick={()=> handleClick(positionBarragem8)}>Barragem 8</option>
          <option onClick={()=> handleClick(positionCapimBranco)}>Nuvem de Pontos</option>
        </select>
        {/* <button onClick={()=> handleClick(positionBrasil)}>Brasil</button> */}
        {/* <button onClick={()=> handleClick(positionBarragem8)}>Barragem 8</button> */}
        {/* <button onClick={()=> handleClick(positionCapimBranco)}>Nuvem de Pontos</button> */}
      </div>
    </div>
  );
}
