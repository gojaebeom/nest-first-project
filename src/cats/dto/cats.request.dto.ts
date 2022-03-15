import { PickType } from '@nestjs/swagger';
import { Cats } from '../cats.entity';

export class CatRequestDto extends PickType(Cats, [
  'email',
  'password',
  'name',
] as const) {}
