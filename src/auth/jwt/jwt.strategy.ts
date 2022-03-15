import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cats } from 'src/cats/cats.entity';
import { Repository } from 'typeorm';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Cats) private readonly catsRepository: Repository<Cats>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload): Promise<Cats> {
    console.debug(payload);
    const cat = await this.catsRepository.findOne({
      select: ['email', 'name', 'createdAt', 'updatedAt', 'imgUrl'],
      where: { id: payload.sub },
    });
    if (!cat) {
      throw new UnauthorizedException('접근 오류');
    }
    return cat;
  }
}
