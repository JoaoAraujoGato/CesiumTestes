import React, { useState } from "react";
import { Cartesian3,Color, createWorldTerrain, Ion, IonResource } from "cesium";
import { Viewer, Entity, Cesium3DTileset, CameraFlyTo, PolygonGraphics, CorridorGraphics } from "resium";
import "./App.css";
// O Token a gente coloca no .ENV depois.
  
export default function App() {
  //Criação de terreno 3D
  Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmFiNmE5Yi1hYmMxLTQ4MTYtOTFmYy0zOGVhNzg1MDgzODgiLCJpZCI6Nzc4MTcsImlhdCI6MTY0MTk5ODQ1NH0.aqwcpB-mIgcH5dRPxFYWsAOgNsZVW9mNxPMpFcf23Sk"
  const terrainProvider = createWorldTerrain();

  const Brasil = {
    position: Cartesian3.fromDegrees(-45.9387, -17.9302, 20000000.0),
    name: "Brasil"
  };
  const Barragem8 = {
    position: Cartesian3.fromDegrees(-46.907051, -19.681241, 5000.0), 
    name: "Barragem 8"
  };
  const CapimBranco = {
    position: Cartesian3.fromDegrees(-44.073327, -20.108577, 3000.0), 
    name: "Capim Branco"
  };

  const [posicaoCamera, setPosicaoCamera] = useState(Barragem8.position);

  function handleClick(destination) {
    setPosicaoCamera(destination);
  }
  const blocos = [
    {
      coordenadaBase: [
        {
          E:-46.906927257432614,
          N:-19.677826576338152,
          Z: 1075,
        },
        {
          E:-46.90965484970198,
          N:-19.68346872149166,
          Z: 1075,
        },
        {
          E:-46.90786556920421,
          N:-19.683998888295155,
          Z: 1075,
        },
        {
          E:-46.90576556920421,
          N:-19.681398888295155,
          Z: 1075,
        },
        {
          E:-46.90586556920421,
          N:-19.680098888295155,
          Z: 1075,
        },
        {
          E:-46.905255170191015,
          N:-19.678479926142008,
          Z: 1075,
        },
      ],
      coordenadaTopo: [
        {
          E:-46.90682707947468,
          N:-19.678285535135557,
          Z: 1105,
        },
        {
          E:-46.909338063250594,
          N:-19.683165375313023,
          Z: 1105,
        },
        {
          E:-46.908105037715995,
          N:-19.683508392597954,
          Z: 1105,
        },
        {
          E:-46.906005037715995,
          N:-19.681308392597954,
          Z: 1105,
        },
        {
          E:-46.906105037715995,
          N:-19.680008392597954,
          Z: 1105,
        },
        {
          E:-46.90574535824787,
          N:-19.67868701355677,
          Z: 1105,
        },
      ]
    },
    {
      coordenadaBase: [
        {
          E:-46.90682707947468,
          N:-19.678285535135557,
          Z: 1108,
        },
        {
          E:-46.90930107447468,
          N:-19.68306872149166,
          Z: 1108,
        },
        {
          E:-46.90845156920421,
          N:-19.683358888295155,
          Z: 1108,
        },
        {
          E:-46.906235170191015,
          N:-19.678529926142008,
          Z: 1108,
        },
      ],
      coordenadaTopo:  [
        {
          E:-46.90683707947468,
          N:-19.678885535135557,
          Z: 1120,
        },
        {
          E:-46.90891156920421,
          N:-19.68276872149166,
          Z: 1120,
        },
        {
          E:-46.90871156920421,
          N:-19.68276872149166,
          Z: 1120,
        },
        {
          E:-46.90673707947468,
          N:-19.678925535135557,
          Z: 1120,
        },
      ]
    }
  ];
  // Uma obra pode possuir varios blocos
  // um bloco possui camada.coordenadas.length entidades laterais + entidade Topo
    return (
    <div className="baseMap3D">
      <Viewer
        className="ViewerMap"
        full
        terrainProvider={terrainProvider}
      >
        {criarBlocos(blocos)}
        <CameraFlyTo destination={posicaoCamera} duration={3}/>
        <Cesium3DTileset url={IonResource.fromAssetId(751563)} />
      </Viewer>
    </div>
  );
}

function getCoordenadasArray(coordenada){
  const arrayCoordenada = [];
  coordenada.forEach((coordenada)=>{
    arrayCoordenada.push(coordenada.E, coordenada.N, coordenada.Z);
  })
  return arrayCoordenada;
}

function getInfosBlocos(blocos){
  return blocos.map((bloco)=>{
    const { coordenadaBase, coordenadaTopo } = bloco;
    if(coordenadaBase.length !== coordenadaTopo.length) 
      return null;
    let contador = 0;
    console.log(getCoordenadasArray(coordenadaTopo))
    const entidades = [{
      hierarchy: Cartesian3.fromDegreesArrayHeights(getCoordenadasArray(coordenadaTopo)),
      height: coordenadaTopo[0].height,
      extrudedHeight: coordenadaTopo[0].height,
      material: Color.BURLYWOOD,
    }];
    let hierarchy;
    do{
      if(contador !== coordenadaTopo.length-1){
        hierarchy= Cartesian3.fromDegreesArrayHeights([
          coordenadaBase[contador].E, coordenadaBase[contador].N, coordenadaBase[contador].Z,
          coordenadaBase[contador+1].E, coordenadaBase[contador+1].N, coordenadaBase[contador+1].Z,
          coordenadaTopo[contador+1].E, coordenadaTopo[contador+1].N, coordenadaTopo[contador+1].Z,
          coordenadaTopo[contador].E, coordenadaTopo[contador].N, coordenadaTopo[contador].Z,
        ])
      }else{
        hierarchy= Cartesian3.fromDegreesArrayHeights([
          coordenadaBase[contador].E, coordenadaBase[contador].N, coordenadaBase[contador].Z,
          coordenadaBase[0].E, coordenadaBase[0].N, coordenadaBase[0].Z,
          coordenadaTopo[0].E, coordenadaTopo[0].N, coordenadaTopo[0].Z,
          coordenadaTopo[contador].E, coordenadaTopo[contador].N, coordenadaTopo[contador].Z,
        ])
      }
      entidades.push({
        hierarchy: hierarchy,
        height: coordenadaBase[0].Z,
        extrudedHeight: coordenadaBase[0].Z,
        material: Color.BURLYWOOD,
      })
      contador=contador+1;
    } while (contador < coordenadaTopo.length);
    return entidades
  })
}

function criarBlocos(blocos){
  return getInfosBlocos(blocos).map((bloco) => {
    console.log("bloco", bloco)
    return bloco.map((entidade) => (
      <>
        <Entity name="Teste">
          <PolygonGraphics
            hierarchy={entidade.hierarchy}
            height={entidade.height}
            extrudedHeight={entidade.extrudedHeight}
            perPositionHeight
            material={entidade.material}
            outlineColor={Color.BLACK}
            outline
            />
        </Entity>
      </>
    ))
  })
}