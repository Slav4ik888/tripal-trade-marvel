
// BOARD

export type Board = Array<number | Character>;

// CHARACTERS

export type JSONResponseCharacters = {
  data?   : Characters;
  errors? : Array<{ message: string}>;
}

export interface Marvel {
  characters: Character[]
}

export type Characters = Character[];

type CharacterId = number;
type Attacks = Array<number | Hits>;

export interface Character {
  id            : CharacterId;
  name          : string;
  description   : string;
  thumbnail     : Thumbnail; 
  resourceURI   : string;
  wiki          : string;
  urlCharacters : string;
  attacks       : Attacks;
  values        : Values;
}

export interface Thumbnail {
  path: string;
}
export interface Values {
  top    : number;
  right  : number;
  bottom : number;
  left   : number;
}

// COMPUTER

export interface QueryGameParams {
  hands         : Hands;
  currentPlayer : CurrentPlayer;
  board         : Board; 
  move          : QueryMove;
};

export interface Hands {
  p1: Characters;
  p2: Characters;
}

export type CurrentPlayer = 'p1' | 'p2';
export type Hits = number[];

export interface QueryMove {
  id       : CharacterId;
  hits     : Hits;
  position : number;
}

export interface ResGame {
  beaten   : number[];
  board    : ResBoard;
  move     : ResMove;
  oldBoard : Board;
  rate     : number;
}
export type ResBoard = Array<number | ResMove>;

export interface ResMove {
  id       : CharacterId;
  hits     : Hits;
  holder   : CurrentPlayer;
  owner    : CurrentPlayer;
  poke     : Poke;
  position : number;
  rate     : number;
}

interface Poke {
  id            : CharacterId;
  attacks       : Attacks;
  description   : string;
  name          : string;
  resourceURI   : string;
  thumbnail     : Thumbnail; 
  urlCharacters : string;
  values        : Values;
  wiki          : string;
}
