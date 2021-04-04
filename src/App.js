import React, {useState} from "react";
import './App.css';
import {main} from "./utils/main";
import {xmlFormatter} from "./utils/xml-formatter";
import {MyGraph} from "./graph";

export const App = () => {
    let data = {
        config: {},
        parents: {},
    };
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const onButtonClick = () => {
        data = xmlFormatter(document.getElementById("textarea").value);
        const {nodes, edges} = main(data.config, data.parents);
        setNodes(nodes);
        setEdges(edges);
    };

    return (
        <div style={{display: 'flex'}}>
            <textarea name="textarea" id="textarea"
                      cols="30" rows="10" placeholder="Введите данные в формате xml,
                      нажмите на кнопку Построить граф,
                      затем на рамку рядом со шкалой масштаба, чтобы увидеть построенный граф"/>
            <button onClick={onButtonClick}
                    style={{height: '70px', alignSelf: 'flex-end', marginBottom: '10px', cursor: 'pointer'}}>
                Построить граф
            </button>
            <MyGraph data={{nodes, edges}}/>
        </div>
    );
};
