import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

interface ProviderPRops {
  children: any;
}

//create provider to store redux data in full application
const Providers = ({ children }: ProviderPRops) => {
  return <Provider store={store}>{children}</Provider>;
};
export default Providers;
