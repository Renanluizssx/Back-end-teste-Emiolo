import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createOrUpdate(user: any): Promise<User> {
    console.log('User Data:', user); // Log dos dados do usuário
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      console.log('Updating Existing User:', existingUser);
      existingUser.firstName = user.firstName;
      existingUser.lastName = user.lastName;
      existingUser.picture = user.picture;
      existingUser.accessToken = user.accessToken;
      const updatedUser = await existingUser.save();
      console.log('User Updated:', updatedUser);
      return updatedUser;
    } else {
      console.log('Creating New User');
      const newUser = new this.userModel(user);
      const savedUser = await newUser.save();
      console.log('New User Created:', savedUser);
      return savedUser;
    }
  }

  async findAll(): Promise<User[]> {
    console.log('Finding all users');
    const users = await this.userModel.find().exec();
    console.log('All Users:', users);
    return users;
  }
}
