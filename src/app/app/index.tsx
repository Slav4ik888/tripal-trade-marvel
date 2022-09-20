import React, { useEffect, useState } from 'react';
import Card from '../../entities/card/ui';
import Hands from '../../entities/hands/ui';
import { JSONResponseCharacters, Characters, Character, Board, QueryGameParams, ResMove, ResGame, QueryMove, Hits } from '../../entities/types';
import s from './index.module.css';

  
const newBoard = () => [...new Array(9)].fill(0);

function App() {
  const
    [board , setBoard]          = useState<Board>(() => newBoard()),
    [enemy , setEnemy]          = useState<Characters>([]),
    [player, setPlayer]         = useState<Characters>([]),
    [selectedId, setSelectedId] = useState<number | null>(null);


  useEffect(() => {
    const getPlayerCard = async () => {
      const responsePlayer = await fetch(`http://localhost:3004/api/v1/marvel/create`);
      const { data: characters }: JSONResponseCharacters = await responsePlayer.json();

      const responseEnemy = await fetch(`http://localhost:3004/api/v1/marvel/game/start`, {
        method : 'POST',
        body   : JSON.stringify({ characters })
      });
      const { data: enemy }: JSONResponseCharacters = await responseEnemy.json();
      setEnemy(enemy as unknown as Characters);
      setPlayer(characters as unknown as Characters);
    };

    getPlayerCard();
  }, []);
  
  const getCard = (): Character | number => player.find(item => item.id === selectedId) || 0;

  const handlerBoardClick = async (idx: number) => {
    let params: QueryGameParams = {
      hands: {
        p1: player,
        p2: enemy
      },
      currentPlayer: `p1`,
      board,
      move: {} as QueryMove
    };

    const choiceCard = getCard() as Character;
    if (choiceCard) {
      params.move = {
        id       : choiceCard.id,
        hits     : choiceCard.attacks[1] as Hits,
        position : idx + 1
      }
    }

    setBoard(prev => {
      if (choiceCard) {
        const copy = [...prev];
        copy[idx] = choiceCard;
        return copy;
      }
      return prev
    });
    setPlayer(prev => [...prev.filter(it => it.id !== selectedId)]);
    setSelectedId(null);

    const responseGame = await fetch(`http://localhost:3004/api/v1/marvel/game`, {
      method : `POST`,
      body   : JSON.stringify(params)
    });
    const nextStep: ResGame = await responseGame.json();
    console.log('nextStep: ', nextStep);

    setEnemy(prev => prev.filter(it => it.id !== nextStep.move.poke.id));

    setBoard(nextStep.board.map(it => typeof it === 'object' ? nextStep.move.poke : it))
  };

  const handlerHandsClick = (id: number) => setSelectedId(id);

  return (
    <div className={s.root}>
      <Hands side='left' characters={enemy} />

      <div className={s.board}>
        {
          board.map((item, i) => {
            if (typeof item === 'object') {
              return <Card
                key       = {i}
                id        = {item.id}
                image     = {item.thumbnail?.path}
                values    = {item.attacks?.[1] as number[]}
                className = {s.plateCard}
              />
            }

            else return <div
              key       = {i}
              className = {s.plate}
              onClick   = {() => handlerBoardClick(i)}
            >
              {i}
            </div>
          })
        }
      </div>

      <Hands
        side       = 'right'
        characters = {player}
        onClick    = {handlerHandsClick}
      />
    </div>
  );
}

export default App;
