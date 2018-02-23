import { Module } from '@nestjs/common';
import { UsersModule } from '../user/users.module';
import { PostsModule } from '../post/posts.module';
import { UsersResolver } from './users.resolver';
import { PostsResolver, CommentsResolver } from './posts.resolver';

@Module({
    imports: [PostsModule, UsersModule],
    components: [UsersResolver, PostsResolver, CommentsResolver]
})
export class GraphQLResolverModule {}
