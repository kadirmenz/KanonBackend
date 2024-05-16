import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(username: string, email: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      coins: 20,
      favoriteGames: JSON.stringify([]),
    });
    return this.usersRepository.save(newUser);
  }

  async addFavoriteGame(userId: number, gameId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (user) {
      const favoriteGames = JSON.parse(user.favoriteGames || '[]');
      favoriteGames.push(gameId);
      user.favoriteGames = JSON.stringify([...new Set(favoriteGames)]);
      return this.usersRepository.save(user);
    }
    throw new Error('User not found');
  }

  async removeFavoriteGame(userId: number, gameId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (user) {
      const favoriteGames = JSON.parse(user.favoriteGames || '[]');
      user.favoriteGames = JSON.stringify(favoriteGames.filter(id => id !== gameId));
      return this.usersRepository.save(user);
    }
    throw new Error('User not found');
  }

  async getFavoriteGames(userId: number): Promise<string[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return JSON.parse(user.favoriteGames || '[]');
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUserCoins(userId: number, coins: number): Promise<void> {
    await this.usersRepository.update(userId, { coins });
  }
}
