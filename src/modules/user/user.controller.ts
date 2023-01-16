import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({type: User})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({type: User, isArray: true})
  @ApiNotFoundResponse()
  @ApiQuery({name: 'email', required: true})
  @Get()
  findAll(@Query('email') userName: string) {
    return this.userService.findAll(userName);
  }

  @ApiOkResponse({type: User, description: 'find user by username'})
  @ApiNotFoundResponse()
  @Get('/:userName')
  async findUser(@Param('userName') userName: string) {
    const user = await this.userService.findOne(userName);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }



  // @Get('/:id')
  //   async findUserById(@Param('id') id: string)
  //   {
  //       const user = await this.userService.findOneById(parseInt(id));
  //       if(!user)
  //       {
  //           throw new NotFoundException('user not found');
  //       }
  //       return user;
  //   }

  @Patch('/:userName')
  update(@Param('userName') userName: string, @Body() body: UpdateUserDto) {
    return this.userService.update(userName, body);
  }

  @Delete('/:userName')
  removeUser(@Param('userName') userName: string)
  {
      return this.userService.remove(userName);
      
  }
}



//

//created modules of user , R&D in PGAdmin4 , created Api for create user , find user and working on sign in user

// created modules of cart , R&D in PGAdmin4, Created Api for Add to cart , delete product from cart