import { lazy } from 'react';

import { Route, Switch } from 'src/routes/SuspenseRoute';
const DealScreen: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Product/DealScreen'));
const SearchScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Product/SearchScreen')
);

export default function SearchRoutes() {
  return (
    <Switch>
      <Route path="/deal" component={DealScreen} exact />
      <Route path="/deal/category/:category/order/:order/pageNumber/:pageNumber" component={DealScreen} exact />
      <Route path="/search/name/:name?" component={SearchScreen} exact />
      <Route path="/search/category/:category" component={SearchScreen} exact />
      <Route path="/search/category/:category/order/:order" component={SearchScreen} exact />
      <Route path="/search/category/:category/name/:name" component={SearchScreen} exact />
      <Route
        path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
        component={SearchScreen}
        exact
      />
    </Switch>
  );
}
