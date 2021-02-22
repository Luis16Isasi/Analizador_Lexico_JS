import React from 'react';

import { DivOutput, ContentOutputDiv, List, Li } from './styledComponent';

const TextOutputArr = ({ text, data }) => {
    const renderOutputs = data.map((identificador, index) => {
        if (identificador) {
            return (
                <Li key={index}>
                    <p style={{ margin: '0px' }}>
                        {identificador} <b>:</b> {'Identificador'}
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

export default React.memo(TextOutputArr);
