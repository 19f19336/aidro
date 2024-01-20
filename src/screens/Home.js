import {
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen'

import {styles} from '../styles';
import { useEffect, useState } from 'react';

const HomeScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState('user')
  const [name, setName] = useState('')
  const { user } = route.params;

  useEffect(() => {
    firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      SplashScreen.hide()
      setLoading(false)
      setUserType(doc.data().userType)
      setName(doc.data().name)
    })
    .catch(() => {
      SplashScreen.hide()
      setLoading(false)
    })
  }, [])

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        //
      });
  }

  return (
    <ScrollView style={{flex: 1}}>
      <ImageBackground source={require('../assets/bg.jpg')} style={styles.main}>
        <Text style={styles.headline}>Aidro</Text>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.btnHeadline}>Welcome, {name}</Text>
        </View>

        {!loading && userType === 'admin' && <TouchableOpacity
          style={styles.mainBtn}
          onPress={() =>
            navigation.navigate('ReportsList')
          }>
          <View>
            <Text style={styles.btnHeadline}>Reports</Text>
            <Text style={{color: '#000'}}>List of submitted reports</Text>
          </View>
          <Image source={require('../assets/feedback.png')} style={styles.btnImg} />
        </TouchableOpacity>}

        {!loading && userType === 'admin' && <TouchableOpacity
          style={styles.mainBtn}
          onPress={() =>
            navigation.navigate('CompletedReportsList')
          }>
          <View>
            <Text style={styles.btnHeadline}>Completed Reports</Text>
            <Text style={{color: '#000'}}>List of reports that are marked as fixed.</Text>
          </View>
          <Image source={require('../assets/feedback.png')} style={styles.btnImg} />
        </TouchableOpacity>}

        {!loading && userType === 'user' && <>
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() =>
            navigation.navigate('Report', {reportType: 'Pothole'})
          }>
          <View>
            <Text style={styles.btnHeadline}>New Report</Text>
            <Text style={{color: '#000'}}>Potholes in the road</Text>
          </View>
          <Image source={require('../assets/road.png')} style={styles.btnImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() =>
            navigation.navigate('Report', {reportType: 'Lighting'})
          }>
          <View>
            <Text style={styles.btnHeadline}>New Report</Text>
            <Text style={{color: '#000'}}>Lighting the road</Text>
          </View>
          <Image
            source={require('../assets/light.png')}
            style={styles.btnImg}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate('Feedback')}>
          <View>
            <Text style={styles.btnHeadline}>Feedback</Text>
            <Text style={{color: '#000'}}>Check feedback for your reports</Text>
          </View>
          <Image
            source={require('../assets/feedback.png')}
            style={styles.btnImg}
          />
        </TouchableOpacity>

        </>}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{color: '#ffffff'}}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

export default HomeScreen;
