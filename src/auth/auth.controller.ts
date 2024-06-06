import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.services';
import { UserService } from '../user/user.services';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request, @Res() res: Response) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = {
      email: req.user['email'],
      firstName: req.user['firstName'],
      lastName: req.user['lastName'],
      picture: req.user['picture'],
      accessToken: req.user['accessToken'],
    };

    await this.userService.createOrUpdate(user);

    res.clearCookie('connect.sid', { path: '/' });

    res.redirect('/auth/google/login');
  }
  @Get('users')
  async getUsers(@Res() res: Response) {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get('google/login')
  googleLoginRedirect(@Res() res: Response) {
    res.send(
      '<html><body><h1>Usuário já Logado</h1><br><p style="font-family: Arial; width: 20%;">Para logar outro usuário, por favor limpe seus cookies e dados do navegador e inicie login novamente.',
    );
  }
}
