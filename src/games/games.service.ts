import { Injectable } from '@nestjs/common';
import gameData from './game-data.json';

@Injectable()
export class GamesService {
  getGames() {
    return gameData;
  }
}
