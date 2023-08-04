import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { GetCurrentUserId } from '../../common/decorators';
import { CreatePostCommentInput } from './dto/create-post-comment.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createWorkoutPost(
    @GetCurrentUserId() userId: number,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postService.create(+userId, createPostInput);
  }

  @Query(() => [Post], { name: 'post' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  likeWorkoutPost(
    @GetCurrentUserId() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.postService.like(userId, id);
  }

  @Mutation(() => Post)
  createWorkoutPostComment(
    @GetCurrentUserId() userId: number,
    @Args('createPostCommentInput')
    createPostCommentInput: CreatePostCommentInput,
  ) {
    return this.postService.createComment(userId, createPostCommentInput);
  }

  @Mutation(() => Post)
  updateWorkoutPost(
    @GetCurrentUserId() userId: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(userId, updatePostInput);
  }

  @Mutation(() => Post)
  deleteWorkoutPost(
    @GetCurrentUserId() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.postService.remove(+userId, id);
  }
}
