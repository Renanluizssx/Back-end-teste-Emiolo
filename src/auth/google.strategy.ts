import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '971452794794-2geitv52naf12m1vqtbo4jm0ppl9ov9f.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080',
      scope: ['renanluizssx@gmail.com', 'renanluizssx'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    return done(null, profile);
  }
}
