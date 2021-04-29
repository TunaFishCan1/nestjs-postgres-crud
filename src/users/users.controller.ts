import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('readAll')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post('create')
  addUser(@Body() userdata): string {
    this.userService.insert(userdata.id, userdata.lastName, userdata.firstName);
    return `Created a user with ID#${userdata.id}`;
  }
  @Get('readOne/:id')
  findOne(@Param('id') userId: string): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Delete('delete/:id')
  delete(@Param('id') userId: string): string {
    this.userService.remove(userId);
    return `Deleted a user with ID#${userId}`;
  }
  @Patch('update/:id')
  update(@Param('id') userId: number, @Body() userInfo): string {
    this.userService.update(userId, userInfo.firstName, userInfo.lastName);
    return `Updated a user with ID#${userId}`;
  }
}
