import React, { useState } from "react";
import { Cartesian3, createWorldTerrain, Ion, IonResource } from "cesium";
import { Viewer, Entity, Cesium3DTileset, CameraFlyTo } from "resium";
import "./App.css";
import PrevisaoFunction from "./Funcionalidades/PrevisaoObra";
import DivisaoFunction from "./Funcionalidades/DivisaoEstrutura";
import AmostrasFunction from "./Funcionalidades/ControleCorteAmostras";
import SondagensFunction from "./Funcionalidades/Sondagens";
import HeatmapFunction from "./Funcionalidades/Heatmap";
import StatusFunction from "./Funcionalidades/Status";

// O Token a gente coloca no .ENV depois.
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmFiNmE5Yi1hYmMxLTQ4MTYtOTFmYy0zOGVhNzg1MDgzODgiLCJpZCI6Nzc4MTcsImlhdCI6MTY0MTk5ODQ1NH0.aqwcpB-mIgcH5dRPxFYWsAOgNsZVW9mNxPMpFcf23Sk";
  
export default function App() {
  //Criação de terreno 3D
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
    position: Cartesian3.fromDegrees(-44.073327, -20.108577, 2000.0), 
    name: "Capim Branco"
  };

  const [posicaoCamera, setPosicaoCamera] = useState(Brasil.position);
  const [selectDeFuncoes, setSelectDeFuncoes] = useState("none"); // Controla se exibe ou nao as funções (none-> nao exibe; block -> exibe)
  const [funcaoEscolhida, setFuncaoEscolhida] = useState("");

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
        <CameraFlyTo destination={posicaoCamera} duration={1}/> 
        <Cesium3DTileset url={IonResource.fromAssetId(751563)} />
        {funcaoEscolhida == "previsaoObra" && ( <PrevisaoFunction/> )}
        {funcaoEscolhida == "divisaoEstrutura" && ( <DivisaoFunction/> )}
        {funcaoEscolhida == "controleCorteAmostras" && ( <AmostrasFunction/> )}
        {funcaoEscolhida == "Sondagens" && ( <SondagensFunction/> )}          
        {funcaoEscolhida == "Heatmap" && ( <HeatmapFunction/> )}
        {funcaoEscolhida == "Status" && ( <StatusFunction/> )}
      </Viewer>
      <div className="CssInputs">
        <div className="baseInputs">
          <select className="SelectObra">
            <option onClick={()=> { handleClick(Brasil.position), setSelectDeFuncoes("none"), setFuncaoEscolhida("") }}>Selecione uma Obra</option>
            <option onClick={()=> { handleClick(Barragem8.position), setSelectDeFuncoes("block"), setFuncaoEscolhida("previsaoObra") }}>Barragem 8</option>
            <option onClick={()=> { handleClick(CapimBranco.position), setSelectDeFuncoes("none"), setFuncaoEscolhida("") }}>Capim Branco</option>
          </select>
          <select className="SelctFuncoes" style={{display: selectDeFuncoes}}>
            <option onClick={(e)=>{e.preventDefault(); setFuncaoEscolhida(e.target.value)}} value="previsaoObra">Previsão de Obra</option>
            <option onClick={(e)=>{e.preventDefault(); setFuncaoEscolhida(e.target.value)}} value="divisaoEstrutura">Divisão da Estrutra - Área e Subáreas </option>
            <option onClick={(e)=>{e.preventDefault(); setFuncaoEscolhida(e.target.value)}} value="controleCorteAmostras">Amostras</option>
            <option onClick={(e)=>{e.preventDefault(); setFuncaoEscolhida(e.target.value)}} value="Sondagens">Sondagens</option>
            <option onClick={(e)=>{e.preventDefault(); setFuncaoEscolhida(e.target.value)}} value="Heatmap">Heatmap</option>
            <option onClick={(e)=>{e.preventDefault(); setFuncaoEscolhida(e.target.value)}} value="Status">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
}


// Aqui temos o codigo que vai ler 
// var uploadControl = document.getElementById("dataToUpload");
// uploadControl.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const [file] = document.getElementById("fileHandle").files;
//     readFileAsText(file, "windows-1252")
//         .then((txt) => window.Papa.parse(txt, { header: true }))
//         .then((json) => dataUpload.raiseEvent(json.data))
//         .catch((err) => console.error(err));