import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatResponseDto } from './dto/cats.response.dto';

// @UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    console.debug('current cat request');
    throw new HttpException('test', 403);
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
  logIn() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '사진 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
