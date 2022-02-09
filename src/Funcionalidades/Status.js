import React from "react"

export default function Status() {
    return (
        <div style={{color: "#fffefe", fontSize: "15px"}}>
            <div>
                <input type="radio" id="statusCamada" name="statusAmostraCamada" value="statusCamada"/>
                <label for="statusCamada">Status Camada</label>
                <br/>
                <input type="radio" id="statusAmostra" name="statusAmostraCamada" value="statusAmostra"/>
                <label for="statusAmostra">Status Amostra</label>
            </div>
            <div>
                <label for="select-faixa-status">Selecione uma Faixa</label>
                <select id="select-faixa-status" style={{marginBottom: "5px"}}>
                    <option value="0">Todas Faixas</option>
                </select>
                <br/>
                <label for="select-area-status">Selecione uma Área </label>
                <select id="select-area-status" style={{marginBottom: "5px"}}>
                    <option value="0">Todas Áreas</option>
                </select>
                <br/>
                <label for="checkCamadaStatus">Todas as Camadas</label>
                <input type="checkbox" id="checkCamadaStatus" checked/>
                <input type="number" id="numeracaoCamadaStatus" value="1" min="1" max="410" disabled="true"
                    style={{width: "55px", marginLeft: "10px", marginBottom: "5px"}}/>
            </div>
            <div>
                <label for="selectStatusTipo">Selecione um Status</label>
                <select id="selectStatusTipo" style={{marginBottom: "5px"}}>
                    <option id="TodosStatus" value="All">Todos</option>
                    <option id="statusAprovado" value="Aprovada">Aprovada</option>
                    <option id="statusReprovado" value="Reprovada">Reprovada</option>
                </select>
            </div>
            <div class='LegendaStatus'>
                <div class='TituloLegendaStatus'>Legenda</div>
                <div class='escalaLegenda'>
                    <ul class='labels' style={{display: "flex", flexDirection: "column"}}>
                        <li style={{display: "flex", flexDirection: "row"}}><div style={{height: "16px", width: "30px", background: "#338105"}}></div>Aprovado</li>
                        <li style={{display: "flex", flexDirection: "row"}}><div style={{height: "16px", width: "30px",background: "#FA423B"}}></div>Reprovado</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}