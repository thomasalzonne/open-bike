import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    credentialsAreValid(email: string, password: string) {
        return this.userService.getByEmail(email).pipe(
            map(user => !!user && user.password === password ? user : false)
        )
    }
}
