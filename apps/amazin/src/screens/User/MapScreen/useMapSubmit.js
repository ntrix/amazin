import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { userAddressMapActions } from 'src/slice/UserSlice';
import { Storage } from 'src/utils';
import { KEY } from 'src/constants';

export function useMapSubmit(setInfo, setError) {
  const history = useHistory();
  const dispatch = useDispatch();

  const onConfirm = (placeRef, { lat, lng }) => {
    const places = placeRef.current.getPlaces();

    if (places?.length !== 1) return setError('Please enter your address');

    const { formatted_address: address, name, vicinity, id: googleAddressId } = places[0];
    dispatch(userAddressMapActions._CONFIRM({ lat, lng, address, name, vicinity, googleAddressId }));

    setInfo('location selected successfully.');
    return history.push('/shipping');
  };

  const redirectBack = () => history.push(Storage[KEY.HISTORY] || '/');

  return { onConfirm, redirectBack };
}
