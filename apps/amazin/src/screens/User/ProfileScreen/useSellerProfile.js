import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useSellerProfile() {
  const { user } = useSelector((state) => state.userDetails);
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  useEffect(() => {
    if (!user || !user.seller) return;
    setSellerName(user.seller.name);
    setSellerLogo(user.seller.logo);
    setSellerDescription(user.seller.description);
  }, [user]);

  return { sellerName, setSellerName, sellerLogo, setSellerLogo, sellerDescription, setSellerDescription };
}
