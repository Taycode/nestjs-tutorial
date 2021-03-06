import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @ApiQuery({ name: 'name', required: false })
  @ApiNotFoundResponse()
  @Get()
  getUsers(@Query('name') name: string): User[] {
    return this.userService.findAll(name);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ type: User })
  @Post('/create')
  createUser(@Body() body: CreateUserDto): User {
    return this.userService.createUser(body);
  }
}
