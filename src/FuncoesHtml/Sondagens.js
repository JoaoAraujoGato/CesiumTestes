import React from "react"

export default function Sondagens() {
    return (
        <div style={{color: "#fffefe", fontSize: "15px"}}>
            <table>
                <tbody>
                    <tr>
                        <td>Transparência</td>
                        <td>
                            <input type="checkbox" value="false" data-bind="checked: translucencyEnabled"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Fade por distância</td>
                        <td>
                            <input type="checkbox" value="true" data-bind="checked: fadeByDistance"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Alfa</td>
                        <td>
                            <input type="range" min="0.0" max="1.0" step="0.1"
                                data-bind="value: alpha, valueUpdate: 'input'"/>
                            <input type="text" size="5" data-bind="value: alpha"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}