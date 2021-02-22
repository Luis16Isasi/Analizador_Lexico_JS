import React, { useState } from 'react';
import TextOutputObj from './components/TextOutputObj';
import CadenaNumber from './components/CadenaNumber';
import Identificador from './components/Identificador';
import Normalize from 'react-normalize';
import Swal from 'sweetalert2';

//importamos fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBroom } from '@fortawesome/free-solid-svg-icons';
import styled, { createGlobalStyle } from 'styled-components';
import palabrasReservadas from './palabrasReservadas';
import {
  ContentDiv,
  Form,
  ContentDivButton,
  Button,
} from './components/styledComponent';

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'Roboto', sans-serif;
    background-color: #EDE6FA;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ContentOutputs = styled.div`
  display: flex;
  justify-content: space-around;
  flex-flow: wrap row;
  align-items: center;
  /* background-color: #e6d520; */
`;

function App() {
  const [sentence, setSentence] = useState('');
  const [palabraReservada, setPalabraReservada] = useState([]);
  const [identificador, setIdentificador] = useState([]);
  const [cadena, setCadena] = useState([]);
  const [numero, setNumero] = useState([]);
  const [operadorRelacional, setOperadorRelacional] = useState([]);
  const [operadorArimetico, setOperadorAritmetico] = useState([]);
  const [delimitador, setDelimitador] = useState([]);

  //creamos nuevos arrays para cada type
  let arrPalabraReservada = [];
  let arrRelacional = [];
  let arrAritmetico = [];
  let arrDelimitador = [];

  const evaluarSentence = e => {
    e.preventDefault();
    if (!sentence) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La sentencia no ha sido escrita...',
      });
    }

    let newSentence = sentence;

    //LAMAMMOS A NUESTRO METODO PARA EXTRAER Y ELIMNAR LAS CADENAS DE NUESTRO STRING
    newSentence = extraerEliminarCadena(newSentence);

    //LAMAMOS A NUESTRO METODO PARA EXTRAER Y ELIMINAR LOS IDENTIFICADORES DE NUESTRO STRING
    newSentence = extraerEliminarIdentificador(newSentence);

    //LAMAMOS A NUESTRO METODO PARA EXTRAER Y ELIMINAR LOS NUMEROS DE NUESTRO STRING
    newSentence = extraerEliminarNumero(newSentence);
    //unimos nuestro string para analizar ahora nuestros componentes lexicos
    newSentence = newSentence.split(' ').join('');

    for (let i = 0; i < palabrasReservadas.length; i++) {
      //buscamos el item de cada objeto de nuestra palabrasReservadas
      if (newSentence.indexOf(palabrasReservadas[i].item) !== -1) {
        //lo agregamos al array correspondiente con nuestro metodo
        agregarObjType(palabrasReservadas[i]);
        //AGREGAR UN ID DINAMICO
        // agregarObjType({
        //   ...palabrasReservadas[i],
        //   id: `${i}-${palabrasReservadas[i].item}`
        // });
        //ahora lo eliminamos del nuestro str
        newSentence = newSentence.replace(palabrasReservadas[i].item, '');
        i = 0;
      }
    }
    //renderizamos nuestros ouputs actulizando nuestro states
    setPalabraReservada(arrPalabraReservada);
    setOperadorRelacional(arrRelacional);
    setOperadorAritmetico(arrAritmetico);
    setDelimitador(arrDelimitador);
  };

  const agregarObjType = palabra_reservada => {
    switch (palabra_reservada.type) {
      case 'palabraReservada':
        arrPalabraReservada.push(palabra_reservada);
        break;
      case 'delimitador':
        arrDelimitador.push(palabra_reservada);
        break;
      case 'relacional':
        arrRelacional.push(palabra_reservada);
        break;
      case 'aritmetico':
        arrAritmetico.push(palabra_reservada);
        break;
      default:
        break;
    }
  };

  const clearInput = () => {
    let input = document.querySelector('#inputText');
    input.value = '';
    setSentence('');
    setCadena([]);
    setNumero([]);
    setIdentificador([]);
    setPalabraReservada([]);
    setOperadorRelacional([]);
    setOperadorAritmetico([]);
    setDelimitador([]);
  };
  const extraerEliminarNumero = newSentence => {
    //obtenemos todos los numeros del string
    let arrNumero = [];
    arrNumero = arrNumero.concat(newSentence.match(/(\d+)/g));

    //eliminamos todos los numeros del string
    arrNumero.forEach(numero => {
      newSentence = newSentence.replace(numero, '');
    });
    setNumero(arrNumero);
    return newSentence;
  };

  const extraerEliminarCadena = newSentence => {
    //creamos un array y extraemos todas las cadenas de comillas dobles o comillas simples
    // para luego insertarlas, ese mismo array lo recorremos para elimnarlas de string
    let arrCadena = [];

    arrCadena = arrCadena.concat(
      newSentence.match(/'([\w\s!#$%&"()*+,-.·/\[\]{}@:;=?^_`|~]*)'/g)
    );
    arrCadena = arrCadena.concat(
      newSentence.match(/"([\w\s!#$%&'()*+,-.·/\[\]{}@:;=?^_`|~]*)"/g)
    );
    //eliminamos cada cadena reconocida del string
    arrCadena.forEach(cadena => {
      newSentence = newSentence.replace(cadena, '');
    });
    setCadena(arrCadena);
    return newSentence;
  };

  const extraerEliminarIdentificador = newSentence => {
    let cont = 0;
    //declaramos nuestra expresion regular
    let expresionIdentificador = /(const|let|var)\s+\w+/gi;
    let existencia = newSentence.search(expresionIdentificador);
    //si hay una existencia de declaracion de variable, la extraemos
    let arrayIdentificador = [];
    if (existencia !== -1) {
      //extraemos las posibles expresiones, esta nos devuelve un array
      let expIdentificador = newSentence.match(expresionIdentificador);
      let newIdentificador;
      expIdentificador.forEach(expresion => {
        //extraemos el identificador
        newIdentificador = expresion.split(' ');
        newIdentificador.splice(0, 1);
        newIdentificador = newIdentificador.join(' ').replace(' ', '');

        //verificamos que no sea un componente lexico
        for (let i = 0; i < palabrasReservadas.length; i++) {
          if (newIdentificador === palabrasReservadas[i].item) cont++;
        }
        //añadimos el identificador a un array para luego actualizar mi state solo si no es componente lexico
        //lo borramos del string a analizar
        if (cont === 0) {
          arrayIdentificador.push(newIdentificador);
          newSentence = newSentence.replace(newIdentificador, '');
        }
      });
      cont = 0;
    }
    setIdentificador(arrayIdentificador);
    return newSentence;
  };

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <ContentDiv>
        <Form onSubmit={e => evaluarSentence}>
          <textarea
            id='inputText'
            placeholder='Escribe una sentencia...'
            onChange={e => setSentence(e.target.value)}
          />
          <ContentDivButton>
            <Button type='submit' onClick={evaluarSentence}>
              <FontAwesomeIcon icon={faArrowUp} />
              <p>Analizar</p>
            </Button>
            <Button type='button' onClick={clearInput}>
              <FontAwesomeIcon icon={faBroom} />
              <p>Limpiar</p>
            </Button>
          </ContentDivButton>
        </Form>
        <ContentOutputs>
          <TextOutputObj text='Palabras reservadas' data={palabraReservada} />
          <Identificador text='Identificadores' data={identificador} />
          <CadenaNumber
            text='Cadenas y Números'
            cadena={cadena}
            numero={numero}
          />
          <TextOutputObj
            text='Operadores Relacionales'
            data={operadorRelacional}
          />
          <TextOutputObj
            text='Operadores Arimeticos'
            data={operadorArimetico}
          />
          <TextOutputObj text='Delimitadores' data={delimitador} />
        </ContentOutputs>
      </ContentDiv>
    </>
  );
}

export default App;
