import React, { useEffect } from 'react';
import AppContainer from './appContainer';
import { appStart } from './actions/app';
import { Provider } from 'react-redux';
import store from './lib/createStore';
import OfflineNotice from './lib/OfflineNotice';

function App() {

  useEffect(() => {
    store.dispatch(appStart());
  }, []);

  return (
    <Provider store={store}>
      <AppContainer style={{flex: 1}} /> 
      <OfflineNotice />
    </Provider>
  );
};

export default App;
