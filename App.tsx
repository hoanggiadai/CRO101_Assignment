import { Button, Image, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './src/views/HomeScreen';
import Splash from './src/views/Splash';
import LoginScreen from './src/views/LoginScreen';
import Register from './src/views/Register';
import DescriptionScreen from './src/views/DescriptionScreen';
import CartScreen from './src/views/CartScreen';
import FavoritesScreen from './src/views/FavoritesScreen';
import ContactScreen from './src/views/ContactScreen';
import Payment from './src/views/Payment';

// Tạo các navigator
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name='MyDrawer'
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerLeft: () => (
            <Button
              onPress={() => navigation.toggleDrawer()}
              title="Menu"
              color="#000"
            />
          ),
        })}
      />
      <Stack.Screen
        name='Splash'
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Description'
        component={DescriptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Pay'
        component={Payment}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

// Header cho menu
const MyHeader = () => {
  return (
    <View style={{ height: 150, width: '100%', justifyContent: 'center' }}>
      <Image source={require('./src/img/logo_fpoly.png')} style={{ width: 210, height: 70, resizeMode: 'center', alignSelf: 'center' }} />
      <View style={{ width: '90%', height: 1, alignSelf: 'center', backgroundColor: 'black', bottom: 0, position: 'absolute' }}></View>
    </View>
  )
}

// Nội dung menu tùy chỉnh
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <MyHeader />
      <DrawerItemList {...props} />
      <DrawerItem label="Đăng Xuất" onPress={() => {
        props.navigation.replace('Login') // Đăng xuất và chuyển đến màn hình đăng nhập
      }} />
    </DrawerContentScrollView>
  );
}

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName='Home' drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name='Favorites' component={FavoritesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name='Cart' component={CartScreen} options={{ headerShown: false }} />
      <Drawer.Screen name='Contact' component={ContactScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}

// App
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({});