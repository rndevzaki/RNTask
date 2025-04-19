import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from '../screens/SignInScreen';
 import MovieListScreen from '../screens/MovieListScreen';
import SignupScreen from '../screens/SignUpScreen';
import MovieDetailScreen from '../screens/MovieDetail';
import { RootStackParamList } from '../utils/types';


const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="MovieListScreen" component={MovieListScreen} />
  </Tab.Navigator>
);

const Navigation = () => {

  return (
    <NavigationContainer>
     
        <AppStack.Navigator screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300
        }}>
             <AppStack.Screen name="SignInScreen" component={SignInScreen} />
          <AppStack.Screen name="AppTabs" component={AppTabs} />
          <AppStack.Screen name="SignupScreen" component={SignupScreen} />
          <AppStack.Screen name="MovieDetail" component={MovieDetailScreen} />
        </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;