import { FlatList, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import GetLocation from 'react-native-get-location'
import {launchCamera} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { styles } from "../styles"
import { useState } from "react"

const ReportScreen = ({ route, navigation }) => {
    const [show, setShow] = useState(false)
    const [msg, setErrorMsg] = useState('')
    const [governorate, setGovernornate] = useState('Muscat')
    const [address, setAddress] = useState('')
    const [pic, setPic] = useState(null)
    const [image, setImage] = useState('default.jpg')
    const [location, setLocation] = useState(null)
    const [priority, setPriority] = useState('Low')
    const [note, setNote] = useState('')
    const { reportType, user } = route.params;

    const governoratesList = [
        'Muscat',
        'Ad Dakhiliyah',
        'Ad Dakhiliyah',
        'Ad Dhahirah',
        'Al Batinah North',
        'Al Batinah South',
        'Al Buraymi',
        'Al Wusta',
        'Ash Sharqiyah North',
        'Ash Sharqiyah South',
        'Dhofar',
        'Musandam'
    ]
    
    const getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            if(location){
                setLocation({lat: location.latitude, lon: location.longitude})
            } else {
                setErrorMsg("Error while trying to access location, try again...")
            }
        })
        .catch(error => {
            setErrorMsg("Error while trying to access location, try again...")
        })
    }

    const getPhoto = () => {
        
        launchCamera({
            mediaType: 'photo',
            videoQuality: 'medium',
        }, res => {
            let tempImg = Date.now()+'.jpg'
            const reference = storage().ref('images/'+tempImg);
            setImage(tempImg)
            
            if(res.assets){
                setPic(res.assets[0].uri)
                reference.putFile(res.assets[0].uri)
                .then(res => {
                    //console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                setErrorMsg("Failed to get image please try again...")
            }
        });
    }

    const handleReport = () => {
        const reoprt = {
            type: reportType,
            governorate: governorate,
            address: address,
            image: image,
            location: location,
            priority: priority,
            note: note,
            user: user.uid,
            date: Date.now()
        }

        if(address !== ''){
            firestore()
                .collection('reports')
                .add(reoprt)
                .then(() => {
                    navigation.navigate("Home")
                });
        } else {
            setErrorMsg("Enter the Address.")
        }
    }

    return (<ScrollView>
        <ImageBackground source={require('../assets/bg.jpg')} style={styles.main}>

        {show && <View 
            style={{
                width: '100%', 
                height: '100%', 
                backgroundColor: '#0000008c', 
                zIndex: 1, 
                position: 'absolute'
            }}
        >
        <View
            style={{
                backgroundColor: '#ffffff',
                padding: 15,
                margin: 5,
                width: '60%',
                alignSelf: 'center',
                marginTop: '25%',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 15
            }}
        >
            <Text style={{color: "#000", textAlign: 'center'}}>Choose the governorate</Text>
            {governoratesList && governoratesList.map((item, index) => <TouchableOpacity 
                key={'gv-'+index} 
                style={styles.card} 
                onPress={() => {
                    setShow(false)
                    setGovernornate(item)
                }}
            >
                <Text style={{color: '#000', textAlign: 'center'}}>{item}</Text>
            </TouchableOpacity>)}
        </View>
        </View>}
        <Text style={styles.headline}>{reportType}</Text>

        <Text style={styles.label}>Choose the governorate</Text>
        <TouchableOpacity 
            onPress={()=> setShow(!show)}
        >
            <TextInput
                style={styles.input}
                value={governorate}
                editable={false}
            />
        </TouchableOpacity>
        <Text style={styles.label}>Address</Text>
        <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Address"
        />
        <Text style={styles.label}>Priority</Text>

        <View style={{
                //flex: 1,
                flexDirection: 'row',
                margin: 15,
                alignSelf: 'center'
            }}>
            <TouchableOpacity 
                style={{
                    backgroundColor: priority === 'Low'?"#5F4331":"#ffffff",
                    padding: 5,
                    width: '25%',
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderWidth: 1,
                    borderColor: '#5F4331',
                }}
                onPress={() => setPriority('Low')}
            >
                <Text style={{color: priority === 'Low'?'#fff':'#5F4331', textAlign: 'center'}}>Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: priority === 'High'?"#5F4331":"#ffffff",
                    padding: 5,
                    width: '25%',
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    borderWidth: 1,
                    borderColor: '#5F4331'
                }}
                onPress={() => setPriority('High')}
            >
                <Text style={{color: priority === 'High'?'#ffffff':'#5F4331', textAlign: 'center'}}>High</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.label}>Note</Text>

        <TextInput
            style={styles.input}
            onChangeText={setNote}
            value={note}
            multiline={true}
            placeholder="Note"
        />

<View style={{flexDirection: 'row'}}>
            <View style={{width: '48%'}}>
                <Text style={styles.label}>Picture of the problem</Text>
                {pic && <Text style={styles.label}>Image upload successfully.</Text>}

                {/* <Image source={{uri: pic}} style={styles.thumbnail} /> */}

                <TouchableOpacity
                    style={styles.btn}
                    onPress={getPhoto}
                >
                    <Text style={{color: '#ffffff', textAlign: 'center'}}>Capture</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '48%'}}>
                <Text style={styles.label}>Problem Location</Text>
                {location && <Text style={{color: '#000000', textAlign: 'center'}}>Location is aquired: {location.lat + ', '+location.lon}</Text>}
                <TouchableOpacity
                    style={styles.btn}
                    onPress={getLocation}
                >
                    <Text style={{color: '#ffffff', textAlign: 'center'}}>Get Location</Text>
                </TouchableOpacity>
            </View>
        </View>

        <Text style={{
            color: '#000', 
            margin: 3, 
            textAlign: 'center'
        }}>{msg}</Text>

        <TouchableOpacity
            style={styles.btn}
            onPress={handleReport}
        >
            <Text style={{color: '#ffffff', textAlign: 'center'}}>Send</Text>
        </TouchableOpacity>

        {/* <View style={{padding: '15%'}}></View> */}
        </ImageBackground>
    </ScrollView>)
}

export default ReportScreen