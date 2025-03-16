import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

interface KakaoUserResponse {
  id: number;
  connected_at: string;
  // kakao_account: {
  //   email: string;
  // };
  properties: {
    nickname: string;
    profile_image: string;
  };
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByKakaoId(kakaoId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { kakaoId } });
  }

  async getKakaoToken(code: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    // Todo.이 부분 configService에서 가져오도록 수정
    params.append('client_id', process.env.KAKAO_CLIENT_ID);
    params.append('redirect_uri', process.env.KAKAO_REDIRECT_URI);
    // params.append('scope', 'account_email,gender');
    params.append('code', code);

    const response = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data.access_token;
  }

  async getKakaoUserInfo(token: string): Promise<Partial<User>> {
    const response = await axios.get<KakaoUserResponse>(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      kakaoId: response.data.id.toString(),
      // email: response.data.kakao_account.email,
      nickname: response.data.properties.nickname,
      profileImage: response.data.properties.profile_image,
    };
  }

  generateAccessToken(user: User): string {
    const payload = { userId: user.id, kakaoId: user.kakaoId };
    return this.jwtService.sign(payload);
  }
}
