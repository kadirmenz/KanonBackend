import { Controller, Get, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getGames() {
    return this.gamesService.getGames();
  }
}
