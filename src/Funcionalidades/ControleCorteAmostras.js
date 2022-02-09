import React from "react"

export default function Amostras() {
    return (
        <div style={{color: "#fffefe", fontSize: "15px"}}>
            <div>Controles de corte de seção horizontal</div>
            <div>
                <select id="select-divisoes-ControleCorte">
                    <option>Selecione uma Divisão</option>
                </select>
            </div>
            <table>
                <thead>
                    <td>Elevação (m) </td>
                    <td>Camada</td>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="number" id="elevacao-camada" min="900" max="1200" step="0.2"
                                style={{width: "93px"}}/>
                        </td>
                        <td>
                            <input type="number" id="numeracao-camada" min="0" max="410" style={{width: "93px"}}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="CheckBoxControleCorte">
                <tbody>
                    <tr>
                        <td>Esconder divisões não selecionados</td>
                        <td><input type="checkbox" value="false" data-bind="checked: controleCorteCheck"/></td>
                    </tr>
                </tbody>
            </div>
        </div>
    );
}