import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local'))
    @Post('')
    async login(@Request() req) {
        return req.user;
    }
}
