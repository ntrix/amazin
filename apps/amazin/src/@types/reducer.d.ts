import store, { rootReducer } from 'src/store';

declare global {
  type AppState = ReturnType<typeof rootReducer>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  type AppDispatch = typeof store.dispatch;
}
