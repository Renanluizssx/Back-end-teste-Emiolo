import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createOrUpdate(user: Partial<User>): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ email: user.email }, user, {
        new: true,
        upsert: true,
      })
      .exec();
  }
}
