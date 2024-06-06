import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req): string {
    const userData = req.user;

    return `
      <h1>Perfil do Usuário</h1>
      <p>Nome: ${userData.displayName}</p>
      <p>Email: ${userData.emails[0]?.value || 'Email não disponível'}</p>
      <img src="${userData.photos[0]?.value || 'Foto de perfil não disponível'}" alt="Foto de Perfil" width="100">
    `;
  }
}
