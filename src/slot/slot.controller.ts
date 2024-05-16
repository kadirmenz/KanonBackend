import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SlotService } from './slot.service';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: any;
}

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @UseGuards(JwtAuthGuard)
  @Post('spin')
  async spin(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    return this.slotService.spin(user);
  }
}
