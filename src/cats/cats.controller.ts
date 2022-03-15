import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decoraters/user.decorator';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatResponseDto } from './dto/cats.response.dto';

// @UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    console.debug(cat);

    return cat;
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: CatResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: '실패',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(@Body() data: LoginRequestDto) {
    return await this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '사진 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
