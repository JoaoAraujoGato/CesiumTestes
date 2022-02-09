import React from "react";
import { BoxGraphics, Entity, Viewer } from "resium";
import { Color, Cartesian3 } from "cesium";

export default function PrevisaoObra() {
    const E = -46.907369406658;
    const N = -19.680735396426;
    const height = 1300;
    return (
        <>
            <Entity 
                name="Teste"
                description="Entidade Box de teste"
                position={Cartesian3.fromDegrees(E, N, height)}
            >
                <BoxGraphics material={Color.RED} dimensions={new Cartesian3(400.0, 300.0, 100.0)}/>
            </Entity>
            <div style={{color: "#fffefe", fontSize: "15px"}}>
                <h3>Previsão de Obra</h3>
            </div>
        </>
    );
}