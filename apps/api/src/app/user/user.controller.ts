import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ManageUserDto } from '@open-bike/lib';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Get(':id')
    getById(@Param('id') id: number){
        return this.userService.getById(id)
    }

    @Get()
    async findAll(){
        return await this.userService.findAll()
    }

    @Post()
    create(@Body() user: ManageUserDto){
        return this.userService.createUser(user)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() user : ManageUserDto) {
      return this.userService.update(+id, user);
    }  

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
