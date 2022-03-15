import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from 'src/cats/cats.entity';
import { Repository } from 'typeorm';
import { LoginRequestDto } from './dto/login.request';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Cats) private readonly catsRepository: Repository<Cats>,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    console.debug(email);

    const unauthorizedMessage = '이메일과 비밀번호를 확인해주세요.';

    const cat: Cats = await this.catsRepository.findOne({ where: { email } });
    if (!cat) {
      throw new UnauthorizedException(unauthorizedMessage);
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException(unauthorizedMessage);
    }

    const payload = { email: email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
