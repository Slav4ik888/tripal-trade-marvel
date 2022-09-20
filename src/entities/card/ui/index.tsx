import React, { FC } from 'react';
import cn from 'classnames';
import s from './index.module.css';



const isBigValue = (idx: number, value: number) => idx === 0 && value > 9 || idx === 2 && value > 9;


interface Props {
  id         : number;
  image      : string;
  values     : number[];
  className? : string;
  onClick?   : (id: number) => void;
}

const Card: FC<Props> = ({ id, image, values, className, onClick }) => {
  
  const handlerClick = () => onClick && onClick(id);

  return (
    <div
      className = {cn(s.root, className)}
      style     = {{ backgroundImage: `url(${image})` }}
      onClick   = {handlerClick}
    >
      <div className={s.values}>
        {
          values?.map((item, i) => <div
            key={i}
            className={cn(s.value, { [s.bigValue]: isBigValue(i, item) })}
          >
            {item}
          </div>)
        }
      </div>
    </div>
  );
}

export default Card;
