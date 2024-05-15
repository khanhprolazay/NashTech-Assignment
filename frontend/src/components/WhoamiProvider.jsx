import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInformation } from '../app/slices/user.slice';

export default function WhoamiProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInformation());
  }, []);

  return children;
}
