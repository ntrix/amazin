import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signout } from 'src/apis/userAPI';
import {
  sidebarBase,
  sidebarCurrencyCreator,
  sidebarUserCreator,
  sidebarSellerCreator,
  sidebarAdminCreator
} from './sidebarTemplate';
import { useShadow } from 'src/hooks/useShadow';
import { shortName } from 'src/utils';
import MenuItem, { NavCategoryAdapter, mapArgsToProps } from '../MenuItem';
import SidebarHeader from './SidebarHeader';
import LoadingOrError from 'src/components/LoadingOrError';
import SidebarLayout from './SidebarLayout';

function SidebarMenu() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state: AppState) => state.productCategoryList);
  const { currency, userInfo } = useShadow();

  const signOutHandler = useCallback(() => dispatch(signout()), [dispatch]);

  const getShortName = useCallback((_s) => shortName(_s), []);

  return (
    <SidebarLayout header={<SidebarHeader userName={getShortName(userInfo?.name)} />}>
      <LoadingOrError statusOf={{ loading, error }} />
      {[
        ...sidebarBase,
        ...(categories?.map(NavCategoryAdapter) || []),
        ...sidebarCurrencyCreator(currency),
        ...sidebarUserCreator(userInfo?.name, signOutHandler),
        ...sidebarSellerCreator(userInfo?.isSeller),
        ...sidebarAdminCreator(userInfo?.isAdmin)
      ].map((args, id) => (
        <MenuItem {...mapArgsToProps(args, id)} />
      ))}
    </SidebarLayout>
  );
}

export default memo(SidebarMenu);
