import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createOrUpdate(user: any): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      existingUser.firstName = user.firstName;
      existingUser.lastName = user.lastName;
      existingUser.picture = user.picture;
      existingUser.accessToken = user.accessToken;
      const updatedUser = await existingUser.save();
      return updatedUser;
    } else {
      const newUser = new this.userModel(user);
      const savedUser = await newUser.save();
      return savedUser;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    return users;
  }
}
