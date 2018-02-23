import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsResolver, CommentsResolver } from './posts.resolver';
import { UsersModule } from '../user/users.module';

@Module({
    imports: [UsersModule],
    controllers: [PostsController],
    components: [PostsService, PostsResolver, CommentsResolver],
    exports: [PostsService]
})
export class PostsModule {}
