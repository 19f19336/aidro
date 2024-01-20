import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen'

import {styles} from '../styles';
import {useEffect, useState} from 'react';

const LoginScreen = ({navigation}) => {
  const [userType, setUserType] = useState('user');
  const [msg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  const handleLogin = () => {
    setErrorMsg(null)
    if(email !== '' && password !== ''){
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                //console.log('User account created & signed in!');
            })
            .catch(error => {
                setErrorMsg("wrong email or password.")
          });
    } else {
        setErrorMsg("Please enter you email and password.")
    }
  };

  return (
    <ScrollView style={styles.page}>
      <ImageBackground source={require('../assets/bg.jpg')} style={styles.main}>
        <View
          style={{
            marginTop: '25%',
            width: '65%',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../assets/aidrologo.png')} style={styles.thumbnail} />
          <Text style={{color: '#000000', textAlign: 'center', fontSize: 28, margin: 5}}>Aidro</Text>
          <Text style={styles.label}>E-Mail</Text>
          <TextInput style={styles.input} onChangeText={setEmail} value={email} />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} onChangeText={setPassword} value={password} />

          <View style={styles.label}>
            <Text style={{color: '#000'}}>{msg}</Text>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={{color: '#ffffff', textAlign: 'center'}}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 5,
              margin: 15,
            }}
            onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                textDecorationLine: 'underline',
                fontSize: 17,
              }}>
              Register New Account
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default LoginScreen;
