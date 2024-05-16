import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserById(id: number): Promise<any> {
    const user = await this.usersService.findById(id);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string): Promise<{ username: string; access_token: string; coins: number }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      username: user.username,
      coins: user.coins,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, email: string, password: string): Promise<{ username: string; access_token: string; coins: number;}> {
    Logger.log(password+" is password")
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser(username, email, hashedPassword);
    const payload = { email: newUser.email, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
      username: newUser.username,
      coins: newUser.coins,
    };
  }
}
