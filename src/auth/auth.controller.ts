import { Controller, Post, Body, Logger, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    Logger.log('Login request body:', loginDto);
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    Logger.log('Register request body:', registerDto);
    if (!registerDto.username || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Missing required fields');
    }
    return this.authService.register(registerDto.username, registerDto.email, registerDto.password);
  }
}
