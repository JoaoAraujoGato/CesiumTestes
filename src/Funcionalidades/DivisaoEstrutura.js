import React from "react";

export default function DivisaoEstrutura() {

    return (
        <>
            <div style={{color: "#fffefe", fontSize: "15px"}}>
                {/* <h1 style={{color: "#fffefe"}}>Divisao da Estrutura</h1> */}
                <label for="select-faixa-divisaoEstrutura">Selecione uma Faixa</label>
                    <select id="select-faixa-divisaoEstrutura" style={{marginBottom: "5px"}}>
                        <option value="0">Todas Faixas</option>
                    </select>
                    <br/>
                    <label for="select-area-divisaoEstrutura">Selecione uma Área </label>
                    <select id="select-area-divisaoEstrutura" style={{marginBottom: "5px"}}>
                        <option value="0">Todas Áreas</option>
                    </select>
                    <br/>
                    <label for="checkCamadaDivisaoEstrutura">Todas as Camadas</label>
                    <input type="checkbox" id="checkCamadaDivisaoEstrutura" checked/>
                    <input type="number" id="numeracaoCamadaDivisaoEstrutura" value="1" min="1" max="410" disabled="true"
                        style={{width: "55px", marginLeft: "10px", marginBottom: "5px"}}/>
                    <div class="Texto" style={{display: "flex", flexDirection: "row"}}>
                        <p>Maciço Terroso</p>
                        <p id="FaixaLegendaDivisao">| _ </p>
                        <p id="AreaLegendaDivisao">| _ </p>
                        <p>| Camada</p>
                        <p id="CamadaLegendaDivisao">_ </p>
                    </div>
                    <div id="CheckBoxDivisoes">
                        <tbody>
                            <tr>
                                <td>Esconder divisões não selecionados</td>
                                <td><input type="checkbox" value="false" data-bind="checked: divisaoEstruturaCheckBox"/></td>
                            </tr>
                        </tbody>
                    </div>
            </div>
        </>
    );
}