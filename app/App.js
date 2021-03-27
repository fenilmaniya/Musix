import React, { useState, useEffect } from 'react';
import AppContainer from './appContainer';
import { appStart } from './actions/app';
import { Provider } from 'react-redux';
import store from './lib/createStore';
import OfflineNotice from './lib/OfflineNotice';

import { PlayerContext } from './player';
import { BackHandler } from 'react-native';

function App() {

  const [player, setPlayer]=useState();
  
  useEffect(() => {
    store.dispatch(appStart());
  }, []);

  return (
    <Provider store={store}>
      <PlayerContext.Provider
        value={{
          player: player,
          setPlayer: setPlayer
        }}
      >
        <AppContainer style={{flex: 1}} /> 
        <OfflineNotice />
      </PlayerContext.Provider>
    </Provider>
  );
};

export default App;
