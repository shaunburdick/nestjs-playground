import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
    controllers: [UsersController],
    components: [UsersService, UsersResolver],
    exports: [UsersService]
})
export class UsersModule {}