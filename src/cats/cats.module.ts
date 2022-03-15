import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './cats.controller';
import { Cats } from './cats.entity';
import { CatsService } from './cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cats]), AuthModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
