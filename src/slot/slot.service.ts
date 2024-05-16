import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SlotService {
  constructor(private readonly usersService: UsersService) {}

  async spin(user: any) {
    Logger.log(user)
    if (!user || !user.username) {
      throw new Error('User information is missing');
    }

    // Implement slot machine logic here
    const result = this.generateSlotResult();
    const coinsWon = this.calculateWinnings(result);

    // Update user's coins
    const updatedCoins = user.coins + coinsWon - 1; // Subtract 1 coin for the spin
    await this.usersService.updateUserCoins(user.id, updatedCoins);

    // Return the result and updated coins
    return { result, coins: updatedCoins };
  }

  private generateSlotResult() {
    const reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"];
    const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"];
    const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];

    const spin1 = reel1[Math.floor(Math.random() * reel1.length)];
    const spin2 = reel2[Math.floor(Math.random() * reel2.length)];
    const spin3 = reel3[Math.floor(Math.random() * reel3.length)];

    return [spin1, spin2, spin3];
  }

  private calculateWinnings(result: string[]) {
    if (result[0] === result[1] && result[1] === result[2]) {
      if (result[0] === 'cherry') return 50;
      if (result[0] === 'apple') return 20;
      if (result[0] === 'banana') return 15;
      if (result[0] === 'lemon') return 3;
    }
    if (result[0] === result[1] || result[1] === result[2]) {
      if (result[1] === 'cherry') return 40;
      if (result[1] === 'apple') return 10;
      if (result[1] === 'banana') return 5;
    }
    return 0;
  }
}
