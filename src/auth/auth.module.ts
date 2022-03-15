import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from 'src/cats/cats.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Cats]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
