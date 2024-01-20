import { useState } from "react";
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { styles } from "../styles";

const Register = ({ route, navigation }) => {
    const [msg, setErrorMsg] = useState(null);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRPassword] = useState('');

    const handleRgeister = () => {
        setErrorMsg(null)
        if(password !== rpassword ) {
            setErrorMsg("Password are not matched")
        } else if(mobile.length < 7){
          setErrorMsg("Enter a valid mobile number")
        } else if(!email.includes('@') || !email.includes('.')){
          setErrorMsg("Enter a valid email address")
        } else if(name !== '' && email !== '' && password !== ''){
            auth()
              .createUserWithEmailAndPassword(email, password)
              .then(res => {
                console.log(res.user.uid);
                
                firestore()
                .collection('users')
                .doc(res.user.uid)
                .set({
                  name: name,
                  email: email,
                  mobile: mobile,
                  userType: 'user'
                })
                .then(() => {
                  //console.log('User added!');
                });
                
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  setErrorMsg('That email address is already in use!');
                } else if (error.code === 'auth/invalid-email') {
                  setErrorMsg('That email address is invalid!');
                } else {
                    setErrorMsg("Something went wrong, try again!");
                }
              });
        } else {
            setErrorMsg("Please enter all required fields")
        }
    };
    
    return(<ScrollView style={styles.page}>
      <ImageBackground source={require('../assets/bg.jpg')} style={styles.main}>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Full Name" />
        <Text style={styles.label}>Mobile</Text>
        <TextInput style={styles.input} onChangeText={setMobile} value={mobile} placeholder="Mobile Number" />
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="E-mail Address" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="Password" />
        <Text style={styles.label}>Repeat Password</Text>
        <TextInput style={styles.input} onChangeText={setRPassword} value={rpassword} secureTextEntry={true} placeholder="Confirm Password" />

        <View style={styles.label}>
            <Text style={{color: '#000'}}>{msg}</Text>
        </View>

        <TouchableOpacity
            style={styles.btn}
            onPress={handleRgeister}
        >
            <Text style={{color: '#fff', textAlign: 'center'}}>Register</Text>
        </TouchableOpacity>
    </ImageBackground>
  </ScrollView>)
}

export default Register;