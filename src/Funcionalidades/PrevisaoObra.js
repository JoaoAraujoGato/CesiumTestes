import React from "react";
import { BoxGraphics, Entity, Viewer, EntityDescription } from "resium";
import { Color, Cartesian3, Transforms, HeadingPitchRoll, Math } from "cesium";

export default function PrevisaoObra() {
    const E = -46.907369406658;
    const N = -19.680735396426;
    const height = 1080;

    var position = Cartesian3.fromDegrees(-46.907051, -19.681241, 5000.0);
    var azimute = 27.15;
    var orientation = Transforms.headingPitchRollQuaternion(
        position,
        new HeadingPitchRoll(
            Math.toRadians(azimute),
            Math.toRadians(0.0),
            Math.toRadians(0.0)
            )
    )

    var entidades = [
        {
            name: "Teste 1",
            description: "Entidade Box de Teste 1",
            position: Cartesian3.fromDegrees(E, N, height),
            orientation: orientation,
            material: Color.RED,
            dimensions: new Cartesian3(100.0, 900.0, 5.0),
        },
        {
            name: "Teste 2",
            description: "Entidade Box de Teste 2",
            position: Cartesian3.fromDegrees(E, N, height+5),
            orientation: orientation,
            material: Color.BLUE,
            dimensions: new Cartesian3(90.0, 800.0, 5.0),
        },
        {
            name: "Teste 3",
            description: "Entidade Box de Teste 3",
            position: Cartesian3.fromDegrees(E, N, height+10),
            orientation: orientation,
            material: Color.BURLYWOOD,
            dimensions: new Cartesian3(80.0, 700.0, 5.0),
        },
        {
            name: "Teste 4",
            description: "Entidade Box de Teste 4",
            position: Cartesian3.fromDegrees(E, N, height+15),
            orientation: orientation,
            material: Color.YELLOW,
            dimensions: new Cartesian3(70.0, 600.0, 5.0),
        },
        {
            name: "Teste 5",
            description: "Entidade Box de Teste 5",
            position: Cartesian3.fromDegrees(E, N, height+20),
            orientation: orientation,
            material: Color.GREEN,
            dimensions: new Cartesian3(60.0, 500.0, 5.0),
        },
        {
            name: "Teste 6",
            description: "Entidade Box de Teste 6",
            position: Cartesian3.fromDegrees(E, N, height+25),
            orientation: orientation,
            material: Color.YELLOWGREEN,
            dimensions: new Cartesian3(50.0, 400.0, 5.0),
        },
    ]

    console.log(entidades[0].dimensions, "TESTE")
    var obj={
        nome: 'João Araujo',
        idade: 23,
        email: 'joao.araujo@gmail.com',
        cargo: 'estagiário',
        observacao: 'teste aqui esta dando certo'
    }

    // Outra forma que nao consegui fazer funcionar
    const entities = Object.values(entidades).map((e, index) => {
        // console.log(e.orientation)
        return (
            <Entity 
                name={e.name}
                position={Cartesian3.fromDegrees(E, N, height+(index)*5)}
                orientation={e.orientation}
            >
                <EntityDescription>
                    <table style={{border:"1px solid"}}>
                        <caption>Maciço Terroso X</caption>
                        {Object.entries(obj).map((entrada)=>(
                            <tr>
                                <th>{entrada[0]}</th>
                                <td>{entrada[1]}</td>
                            </tr>
                        ))}
                    </table>
            </EntityDescription>
                <BoxGraphics show={true} fill={true} outline={true} outlineColor={Color.WHITE} material={Color.fromAlpha(Color.WHITE, 0.1)} dimensions={e.dimensions}/>
            </Entity>
        );
    });

    return (
        <div>
            {entities}
            <div style={{color: "#fffefe", fontSize: "15px"}}>
                <h3>Previsão de Obra</h3>
            </div>
        </div>
    );
}
