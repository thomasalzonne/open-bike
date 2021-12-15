import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ManageUserDto } from '@open-bike/lib';
import { AdminGuard } from '../auth/admin.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Get(':id')
    getById(@Param('id') id: number){
        return this.userService.getById(id)
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Get()
    async findAll(){
        return await this.userService.findAll()
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post()
    create(@Body() user: ManageUserDto){
        return this.userService.createUser(user)
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Patch(':id')
    update(@Param('id') id: number, @Body() user : ManageUserDto) {
      return this.userService.update(+id, user);
    }  

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
