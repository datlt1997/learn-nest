import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'test1',
      email: 'test1@gmail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'test2',
      email: 'test2@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'test3',
      email: 'test3@gmail.com',
      role: 'CUSTOMER',
    },
    {
      id: 4,
      name: 'test4',
      email: 'test4@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'test5',
      email: 'test5@gmail.com',
      role: 'CUSTOMER',
    },
  ];

  findAll(role?: 'INTERN' | 'CUSTOMER' | 'ADMIN') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role == role);
      if (roleArray.length == 0)
        throw new NotFoundException('User role not found');

      return roleArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHIghestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHIghestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id == id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id != id);
    return removeUser;
  }
}
