import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.register(dto);

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 86400000, // 1 day in milliseconds
      path: '/',
    });

    return user;
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.login(dto);

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 86400000, // 1 day in milliseconds
      path: '/',
    });

    return user;
  }
}
