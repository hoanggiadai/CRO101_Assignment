/**
 * @format
 */

import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Splash from './src/views/Splash';
import LoginScreen from './src/views/LoginScreen';
import Register from './src/views/Register';
import HomeScreen from './src/views/HomeScreen';
import FavoritesScreen from './src/views/FavoritesScreen';
import DescriptionScreen from './src/views/DescriptionScreen';
import CartScreen from './src/views/CartScreen';
import ContactScreen from './src/views/ContactScreen';

AppRegistry.registerComponent(appName, () => App);
