import store, { rootReducer } from 'src/store';
import { RouteComponentProps } from 'react-router';
import * as H from 'history';
import { ObjectID } from 'mongodb';
declare global {
  type AppState = ReturnType<typeof rootReducer>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  type AppDispatch = typeof store.dispatch;

  type MatchParams = {
    id: string;
    name: string;
  };

  type Match<P> = {
    params: P;
    isExact?: boolean;
    path: string;
    url?: string;
  };

  type RouteProps<P> = {
    match: Match<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
  };

  type RenderProps = RouteComponentProps<any>;

  type RouterProps = {
    path: string;
    exact?: boolean;
    component?: React.ComponentType<RenderProps> | React.ComponentType<any> | any;
    render?: (props: RenderProps) => React.ReactNode | React.ComponentType<RenderProps>;
    children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  };

  type MatchProp = Match<MatchParams>;

  type HistoryProp = H.History;

  type LocationProp = H.Location;

  type IDType = ObjectID;
}
