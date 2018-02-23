import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PostsModule } from '../post/posts.module';

@Module({
    controllers: [UsersController],
    components: [UsersService],
    exports: [UsersService],
    imports: [PostsModule]
})
export class UsersModule {}
