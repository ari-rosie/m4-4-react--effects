import React from 'react';
import styled from 'styled-components';

const Item = ({obj, purchasedItems, setPurchasedItems, handleClick}) => {
    const {name, id, cost, value} = obj;

    return (
        <button onClick={(e) => handleClick(id) ? setPurchasedItems({...purchasedItems, [id]: purchasedItems[id] + 1}) : console.log('Not enough cookies!')}>
            <Name>{name}</Name>
            <Id>{id}</Id>
            <Cost>{cost}</Cost>
            <Value>{value}</Value>
            <Owned>{purchasedItems[id]}</Owned>
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