import React from 'react';
import styled from 'styled-components';
import { DivOutput, ContentOutputDiv } from './styledComponent';

const List = styled.ul`
    position: relative;
    top: -15px;
`;

const Li = styled.li`
    display: flex;
    flex-flow: nowrap column;
    position: relative;
    margin: 10px;
    left: -45px;
    padding: 0px;
    width: 114%;
`;
const Identificador = ({ text, data }) => {
    const renderOutputs = data.map((componentLexico, index) => {
        if (componentLexico) {
            return (
                <Li key={index}>
                    <p style={{ margin: '0px' }}>
                        {componentLexico.item} <b>:</b> {componentLexico.value}
                    </p>
                </Li>
            );
        } else return null;
    });
    return (
        <ContentOutputDiv>
            <p>
                <b>|</b> {text}: {data.length}
            </p>
            <DivOutput>
                <List>{renderOutputs}</List>
            </DivOutput>
        </ContentOutputDiv>
    );
};

export default React.memo(Identificador);
