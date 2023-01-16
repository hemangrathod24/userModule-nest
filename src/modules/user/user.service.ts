import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  
  /*
  create(createUserDto: CreateUserDto): Promise<User> {
    const users = this.repo.create(cr eateUserDto);

    return this.repo.save(users);
  }   
*/

async create(createUserDto: CreateUserDto): Promise<User> {
  const userName = await this.findOne(createUserDto.userName);

  if (userName) {
    throw new BadRequestException('ohh ho User already Exist! Use Other One');
  } 
  const users = this.repo.create(createUserDto);
  return this.repo.save(users);
}


  findAll(userName: string): Promise<User[]> {
    return this.repo.find({ where: { userName } });
  }

  // findOneById(id: number): Promise<User> {

  //   if(!id)
  //   { 
  //       return null;
  //   }  
  //   return this.repo.findOneBy({ id });
  // }

  findOne(userName: string): Promise<User> {
    if (!userName) {
      return null;
    }
    return this.repo.findOneBy({ userName });
    
  }

  async update(userName: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userName);
    if(!user)
            {
                throw new NotFoundException;
            }
            Object.assign(user,updateUserDto);
            return this.repo.save(user);
  }

  async remove(userName: string)
  {
      const user = await this.findOne(userName);
      if(!user)
      {
          throw new NotFoundException;
      }
      return this.repo.remove(user);
  }
}

