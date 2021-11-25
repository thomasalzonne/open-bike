import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

    }
    getByEmail(email: string) {
        return from(this.usersRepository.findOne({ email }))
    }
}
