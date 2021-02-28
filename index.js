import 'react-native-gesture-handler';
import 'react-native-console-time-polyfill';
import './app/ReactotronConfig';
import {AppRegistry} from 'react-native';
import App from './app/App'
import {name as appName} from './app.json';

// if (__DEV__) {
// 	require('./app/ReactotronConfig');
// } else {
// 	console.log = () => {};
// 	console.time = () => {};
// 	console.timeLog = () => {};
// 	console.timeEnd = () => {};
// 	console.warn = () => {};
// 	console.count = () => {};
// 	console.countReset = () => {};
// 	console.error = () => {};
// 	console.info = () => {};
// }

AppRegistry.registerComponent(appName, () => App);
