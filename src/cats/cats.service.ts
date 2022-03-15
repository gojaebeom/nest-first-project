import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cats } from './cats.entity';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatResponseDto } from './dto/cats.response.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats) private readonly catsRepository: Repository<Cats>,
  ) {}

  async signUp(body: CatRequestDto): Promise<CatResponseDto> {
    console.debug(body);
    const { email, name, password } = body;
    const cat: Cats = new Cats();
    cat.email = email;
    cat.name = name;

    const catData = await this.catsRepository.findOne({ where: { email } });
    if (catData) {
      throw new UnauthorizedException('이미 가입된 고양이입니다!');
    }

    const saltOrRounds = 10;
    const hashPassworld = await bcrypt.hash(password, saltOrRounds);
    cat.password = hashPassworld;

    const createCatData = await this.catsRepository.save(cat);

    return new CatResponseDto(
      createCatData.id,
      createCatData.email,
      createCatData.name,
      createCatData.createdAt,
      createCatData.updatedAt,
    );
  }
}
