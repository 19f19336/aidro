import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import HomeScreen from './screens/Home';
import ReportScreen from './screens/Report';
import Feedback from './screens/Feedback';
import ReportsList from './screens/ReportsList';
import CompletedReportsList from './screens/CompletedReportsList';
import Details from './screens/Details';
import LoginScreen from './screens/Login';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (<SafeAreaProvider>
      <StatusBar
        backgroundColor="#da9d7c"
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: true, title: 'New Account'}} name="Register" component={Register} />
        </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>);
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="#d5d5b7"
      />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} initialParams={{user: user}} />
        <Stack.Screen options={{headerShown: true, title: 'Feedback'}} name="Feedback" component={Feedback} initialParams={{user: user}} />
        <Stack.Screen options={{headerShown: true, title: 'Reposts List'}} name="ReportsList" component={ReportsList} initialParams={{user: user}} />
        <Stack.Screen options={{headerShown: true, title: 'Completed Reposts List'}} name="CompletedReportsList" component={CompletedReportsList} initialParams={{user: user}} />
        <Stack.Screen options={{headerShown: true, title: 'Report'}} name="Report" component={ReportScreen} initialParams={{user: user}} />
        <Stack.Screen options={{headerShown: true, title: 'Details'}} name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>);
}

export default App;