import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.services';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(user: any): Promise<any> {
    const existingUser = await this.userService.createOrUpdate(user);
    return existingUser;
  }
}

export default AuthService;
