import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

import { UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('instrument') instrument: string,
    @Body('isAdmin') isAdmin: boolean = false,
  ) {
    const user = await this.usersService.create(
      username,
      password,
      instrument,
      isAdmin,
    );
    return { message: 'User created', userId: user._id };
  }

  // PROTECTED ROUTE EXAMPLE
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
