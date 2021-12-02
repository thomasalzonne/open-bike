import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ManageUserDto } from '@open-bike/lib';


@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

    }
    createUser(user : ManageUserDto){
        return this.usersRepository.insert(user)
    }
    findAll(){
        return this.usersRepository.find();
    }
    
    getById(id: number) {
        return this.usersRepository.findOne(id);
    }

    update(id: number, user){
        return this.usersRepository.update(id,user)
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
