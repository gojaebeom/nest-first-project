import { Cats } from '../cats.entity';

export class CatResponseDto extends Cats {
  constructor(
    id: number,
    email: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
