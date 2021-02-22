import React from 'react';

import { DivOutput, ContentOutputDiv, List, Li } from './styledComponent';

const CadenaNumber = ({ text, cadena, numero }) => {
  let resultados = 0;

  const renderOutputCadena = cadena.map((cadena, index) => {
    if (cadena) {
      resultados++;
      return (
        <Li key={index}>
          <p style={{ margin: '0px' }}>
            {cadena} <b>:</b> {'Cadena'}
          </p>
        </Li>
      );
    } else return null;
  });

  const renderOutputNumber = numero.map((numero, index) => {
    if (numero) {
      resultados++;
      return (
        <Li key={index}>
          <p style={{ margin: '0px' }}>
            {numero} <b>:</b> {'Numero'}
          </p>
        </Li>
      );
    } else return null;
  });

  return (
    <ContentOutputDiv>
      <p>
        <b>|</b> {text}: {resultados}
      </p>
      <DivOutput>
        <List>{renderOutputCadena}</List>
        <List>{renderOutputNumber}</List>
      </DivOutput>
    </ContentOutputDiv>
  );
};

export default React.memo(CadenaNumber);
