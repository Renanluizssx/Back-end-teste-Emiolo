import { Controller, Get, Req, HttpStatus, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
