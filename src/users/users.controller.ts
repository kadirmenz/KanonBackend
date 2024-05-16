import { Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: any;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest) {
    const user = await this.usersService.findById(req.user.id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite/:gameId')
  async addFavorite(@Req() req, @Param('gameId') gameId: string) {
    const userId = req.user.id;
    Logger.log(req)

    return this.usersService.addFavoriteGame(userId, gameId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorite/:gameId')
  async removeFavorite(@Req() req, @Param('gameId') gameId: string) {
    const userId = req.user.id;
    Logger.log(req)
    return this.usersService.removeFavoriteGame(userId, gameId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@Req() req) {
    Logger.log(req)
    return this.usersService.getFavoriteGames(req.user.id);
  }
}
