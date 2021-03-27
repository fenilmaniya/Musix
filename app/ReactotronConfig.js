/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga'

const scriptURL = NativeModules.SourceCode.scriptURL;
const scriptHostname = scriptURL.split('://')[1].split(':')[0];

Reactotron.setAsyncStorageHandler(AsyncStorage);
Reactotron.configure({
    name: 'MPlayer',
    host: scriptHostname
})
Reactotron.useReactNative({
    asyncStorage: { ignore: ['secret'] }
});
Reactotron.use(reduxPlugin())
Reactotron.use(sagaPlugin())

if (__DEV__) {
    Reactotron.connect()
    Reactotron.clear()
}

Reactotron.onCustomCommand('test', () => console.tron.log('Reactotron is working...'))

console.tron = Reactotron

// Running on android device
// $ adb reverse tcp:9090 tcp:9090
Reactotron.clear();
// console.warn = Reactotron.log;
// console.log = Reactotron.log;
console.disableYellowBox = true;
