import React from "react";
import { Cartesian3, Color, Ion, IonResource } from "cesium";
import { Viewer, Entity, Cesium3DTileset } from "resium";
import "./App.css";

// export default function App() {
//   return (
//     <Viewer full>
//       <Entity
//         name="Tokyo"
//         position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
//         point={{ pixelSize: 10, color: Color.WHITE }}
//         description="hoge"
//       />
//     </Viewer>
//   );
// }

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmFiNmE5Yi1hYmMxLTQ4MTYtOTFmYy0zOGVhNzg1MDgzODgiLCJpZCI6Nzc4MTcsImlhdCI6MTY0MTk5ODQ1NH0.aqwcpB-mIgcH5dRPxFYWsAOgNsZVW9mNxPMpFcf23Sk";

export default function App() {
  let viewer; // This will be raw Cesium's Viewer object.

  const handleReady = (tileset) => {
    if (viewer) {
      viewer.zoomTo(tileset);
    }
  };

  return (
    <div className="Tudo">

      <Viewer
        className="ViewerMap"
        full
        ref={(e) => {
          viewer = e && e.cesiumElement;
        }}
      >
        <Cesium3DTileset
          url={IonResource.fromAssetId(751563)}
          onReady={handleReady}
        />
      </Viewer>
      <div className="Teste">
        <input
          placeholder="Nome"
        />
        <input
          placeholder="Endereço"
        />
        <input
          type="email"
          placeholder="E-mail"
              />
      </div>
    </div>
  );
}
