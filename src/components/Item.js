import React from 'react';
import styled from 'styled-components';

const Item = ({obj, owned, handleClick}) => {
    const {name, id, cost, value} = obj;
    handleClick('Not Lenzo');
    return (
        <button>
            <Name>{name}</Name>
            <Id>{id}</Id>
            <Cost>{cost}</Cost>
            <Value>{value}</Value>
            <Owned>{owned}</Owned>
        </button>
    );

};

const Name = styled.div `
    color: blue;
`;

const Cost = styled.div `
    color: red;
`;

const Id = styled.div `
    color: green;
`;

const Value = styled.div `
    color: orange;
`;

const Owned = styled.div `
    color: purple;
`;



export default Item;