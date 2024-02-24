import React from 'react'
import { Graphviz } from 'graphviz-react';

function Automata({ entrada }) {
    const generateDot = (entrada) => {
        const dot = `digraph {
          rankdir=LR;
          ${entrada.split("").join(" -> ")}
        }`;
        return dot;
      };
    
      return <Graphviz dot={generateDot(entrada)} />;
    
}

export default Automata