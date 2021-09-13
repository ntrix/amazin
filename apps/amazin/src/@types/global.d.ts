import store, { rootReducer } from 'src/store';
import { RouteComponentProps } from 'react-router';
import * as H from 'history';

declare global {
  type AppState = ReturnType<typeof rootReducer>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  type AppDispatch = typeof store.dispatch;

  type MatchParams = {
    id: string;
    name: string;
  };

  type RouteProps<P> = {
    match: Match<P>;
    location?: H.Location;
    history?: H.History;
    staticContext?: any;
  };

  type Match<P> = {
    params: P;
    isExact?: boolean;
    path?: string;
    url?: string;
  };
}
