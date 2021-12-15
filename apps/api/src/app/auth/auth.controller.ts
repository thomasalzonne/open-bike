import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private jwtService: JwtService, private userService: UserService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        const token = await this.jwtService.signAsync({ id: req.user.id })
        return { token };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    @HttpCode(200)
    async me(@Request() req) {
        return this.userService.getById(req.user.id)
    }


}
