import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    controllers: [PostsController],
    components: [PostsService],
    exports: [PostsService]
})
export class PostsModule {}
