import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";

import Item from './Item.js';
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

// function returns true if player has enough cookies to purchase an item
const canPurchase = (id, numCookies, setNumCookies) => {
  const buyItem = items.find(item => item.id === id);
  if (buyItem.cost <= numCookies){
    setNumCookies(c => c - buyItem.cost);
    return true;
  }
  return false;
};

// function returns the total of cookies per second of all purchased items
const calculateCookiesPerTick = (purchasedItems) => {
  let total = 0;
  for (const p in purchasedItems){
    const item =  items.find(i => i.id === p);
    const cookiesSec = item.value * purchasedItems[p];
    total = total + cookiesSec;
  }
  return total;
};



//COMPONENT
const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  // focus on first item on mount
  // useEffect(() => {
  //   ref.current.focus();
  // }, []);

  // html page title
  useEffect(() => {
    document.title = `${numCookies} cookies!`;
  }, [numCookies]);

  // adds cookie on C key press
  useEffect(() => {
    const spaceKeyDown = (e) => {
      if (e.code === 'KeyC')
        setNumCookies(c => c + 1);
    };
  
    window.addEventListener('keydown', spaceKeyDown);
    return () => {
      window.removeEventListener('keydown', spaceKeyDown);
    }
  });

  // adds the generated cookies every second
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(c => c + numOfGeneratedCookies);
  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(item => 
          <Item 
            key={item.id} 
            obj={item} 
            purchasedItems={purchasedItems} 
            setPurchasedItems={setPurchasedItems} 
            handleClick={(id) => canPurchase(id, numCookies, setNumCookies)}
            isFirstItem={items.indexOf(item) === 0 ? true : false}
          />
        )}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
