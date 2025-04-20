import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getToken } from '../services/auth';
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
    {/* Add more screens like Favorites if needed */}
  </Tab.Navigator>
);

const SplashScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getToken();
        setUserToken(token);
      } catch (error) {
        console.error('Token check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300
        }}
        initialRouteName={userToken?'AppTabs':'SignInScreen'}
      >
            <AppStack.Screen name="AppTabs" component={AppTabs} />
            <AppStack.Screen name="MovieDetail" component={MovieDetailScreen} />
            <AppStack.Screen name="SignInScreen" component={SignInScreen} />
            <AppStack.Screen name="SignupScreen" component={SignupScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;