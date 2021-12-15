import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    credentialsAreValid(email: string, password: string) {
        return this.userService.getByEmail(email).pipe(
            tap(user => console.log(user)),
            map(user => !!user && user.password === password ? user : false)
        ).toPromise()
    }
}
