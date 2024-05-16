import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { SlotModule } from './slot/slot.module';
import { User } from './users/user.entity';
import ormconfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UsersModule,
    GamesModule,
    SlotModule,
  ],
})
export class AppModule {}
