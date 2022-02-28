import { Room } from "../rooms/model/rooms";

export type PlayType = 'boardgame' | 'rpg' | 'figurine' | 'escapegame' | 'other';

export interface Game {
    id?: string;
    name?: string;
    type?: string;
    description?: string;
    playerCount?: number;
    durationInMinutes?: number;
    minimalAge?: number;
}

export interface Player {
    name?: string;
}

export interface Play {
    id?: string;
    game?: string;
    type?: PlayType;
    room?: string;
    date?: string;
    playerCount?: number;
    players?: Player[];
    description?: string;
}
