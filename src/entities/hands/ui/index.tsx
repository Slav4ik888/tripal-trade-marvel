import React, { useState } from 'react';
import Card from '../../card/ui';
import { Characters } from '../../types';
import cn from 'classnames';
import s from './index.module.css';


type Side = 'left' | 'right'

type Props = {
  side       : Side;
  characters : Characters;
  onClick?   : (idx: number) => void;
}


function Hands({ side, characters, onClick }: Props) {
  const [activeId, setActiveId] = useState<number>();
  const handlerClick = (id: number) => {
    console.log(id);
    setActiveId(id);
    onClick && onClick(id);
  };

  
  return (
    <div className={s.root}>
      {
        characters.map((item, i) => <Card
          key       = { item.id}
          id        = {item.id}
          image     = {item.thumbnail?.path}
          values    = {item.attacks?.[1] as number[]}
          className={cn(s.card, s[side], {
            [s.active]: item.id === activeId
          })}
          onClick   = {handlerClick}
        />)
      }
    </div>
  )
}

export default Hands
