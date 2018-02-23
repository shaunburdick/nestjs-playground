import {
  Module,
  MiddlewaresConsumer,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { UsersModule } from './user/users.module';
import { PostsModule } from './post/posts.module';
import { GraphQLResolverModule } from './graphqlResolver/graphql.module';
import { UsersService } from './user/users.service';
import { User, UserDto } from './user/interfaces/user.interface' ;
import { Post, PostDto, Comment, CommentDto } from './post/interfaces/post.interface';
import { PostsService } from './post/posts.service';
import * as faker from 'faker';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GraphQLModule,
    GraphQLResolverModule
  ],
  components: [],
})
export class ApplicationModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService
  ) {}

  configure(consumer: MiddlewaresConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    this.populateDB();

    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }

  private async populateDB(): Promise<void> {
    const users: { [id: string]: User } = {};
    const posts: { [id: string]: Post } = {};

    for (let x = 0; x < 10; x++) {
      const user = await this.usersService.create({
        name: `${faker.name.firstName()} ${faker.hacker.noun()}`,
        email: faker.internet.email()
      });
      users[user.id] = user;

      for (let y = 0; y < 50; y++) {
        const post = await this.postsService.create({
          authorId: user.id,
          name: faker.hacker.ingverb(),
          body: faker.lorem.paragraphs(3)
        });
        posts[post.id] = post;
      }
    }

    for (const post of Object.values(posts)) {
      for (const commenter of Object.values(users)) {
        if (Math.random() * 10 > 5) {
          await this.postsService.addComment(post.id, {
            authorId: commenter.id,
            body: faker.hacker.phrase()
          });
        }
      }
    }
  }
}
