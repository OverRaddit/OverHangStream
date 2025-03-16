import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { User } from './user.decorator';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('kakao')
  async kakaoAuth(@Res() res: Response) {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    console.log('kakaoAuthUrl:', kakaoAuthUrl);
    res.redirect(kakaoAuthUrl);
  }

  @Get('kakao/redirect')
  async kakaoAuthRedirect(@Query('code') code: string) {
    // 인가 코드를 사용하여 카카오 토큰 및 사용자 정보를 가져오는 로직
    const token = await this.userService.getKakaoToken(code);
    const userInfo = await this.userService.getKakaoUserInfo(token);

    // 사용자 정보를 데이터베이스에 저장 또는 조회
    let user = await this.userService.findByKakaoId(userInfo.kakaoId);
    if (!user) {
      user = await this.userService.create(userInfo);
    }

    const accessToken = this.userService.generateAccessToken(user);
    return { accessToken };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@User() user: any) {
    console.log(user);
    return `your kakao id is ${user.kakaoId}`;
  }
}
