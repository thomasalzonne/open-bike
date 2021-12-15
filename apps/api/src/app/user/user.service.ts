import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, of } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ManageUserDto } from '@open-bike/lib';


@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

    }
    createUser(user : ManageUserDto){
        return from(this.usersRepository.insert(user))
    }
    findAll(){
        return from(this.usersRepository.find());
    }
    
    getById(id: number) {
        return from(this.usersRepository.findOne(id));
    }

    getByEmail(email: string) {
        return from(this.usersRepository.findOne({ email }));
    }

    update(id: number, user){
        return from(this.usersRepository.update(id,user));
    }

    remove(id: number) {
        return from(this.usersRepository.delete(id));
    }
}
