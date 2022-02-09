import React from "react"

export default function Heatmap() {
    return (
        <div style={{color: "#fffefe", fontSize: "15px"}}>
            <label for="select-faixa-heatmap">Selecione uma Faixa</label>
            <select id="select-faixa-heatmap" style={{marginBottom: "5px"}}>
                <option value="0">Todas Faixas</option>
            </select>
            <br/>
            <label for="select-area-heatmap">Selecione uma Área </label>
            <select id="select-area-heatmap" style={{marginBottom: "5px"}}>
                <option value="0">Todas Áreas</option>
            </select>
            <br/>
            <label for="checkCamadaHeatmap">Todas as Camadas</label>
            <input type="checkbox" id="checkCamadaHeatmap" checked/>
            <input type="number" id="numeracaoCamadaHeatmap" value="1" min="1" max="410" disabled="true"
                style={{width: "55px", marginLeft: "10px", marginBottom: "5px"}}/>
            <div class="Texto" style={{display: "flex", flexDirection: "row"}}>
                <p>Maciço Terroso</p>
                <p id="FaixaLegenda">| _ </p>
                <p id="AreaLegenda">| _ </p>
                <p>| Camada</p>
                <p id="CamadaLegenda">_ </p>
            </div>
            <select id="select-heatmap-parametro" style={{marginBottom: "5px"}}>
                <option value="0">Selecione um Parâmetro</option>
            </select>
            <br/>
            <tbody>
                <div class="checkBoxHeatMap">
                    <div>
                        <tr>
                            <td>Transparência</td>
                            <td>
                                <input type="checkbox" value="false" data-bind="checked: translucencyEnabled"/>
                            </td>
                        </tr>
                    </div>
                    <div>
                        <tr>
                            <td>Exibição por Bastões</td>
                            <td>
                                <input type="checkbox" value="false" data-bind="checked: exibicaoBastao"/>
                            </td>
                        </tr>
                    </div>
                </div>
            </tbody>
            <div class='div-geral-legenda'>
                <div class='legenda-titulo'>Valor do Parâmetro</div>
                <div class='escala-legenda' style={{display: "flex", flexDirection: "column"}}>
                    <div class="gradiente1" style={{marginTop: "5px", minHeight: "25px", background: "linear-gradient(to right, #0510FA, #1392E6, #11E6B3, #00FA0C, #FAF000, #FF6B04, #E61200)"}}></div>
                    <div class="ValoresEscala" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div>
                            <p id="FaixaDeCor1">0%</p>
                        </div>
                        <div>
                            <p id="FaixaDeCor2">100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}