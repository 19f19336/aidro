import { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';

import { styles } from "../styles";

const Details = ({ route, navigation }) => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState(null)
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState('')
    const [msg, setErrorMsg] = useState('')
    const [updated, setUpdated] = useState(Date.now())
    const { item } = route.params;

    const handleComment = () => {
        if(comment !== ''){
            firestore()
            .collection('reports')
            .doc(item)
            .update({
                comment: comment,
            })
            .then(() => {
                setShow(false)
            });
        } else {
            setErrorMsg('Please enter the comment text.')
        }
    }

    useEffect(() => {
        firestore()
        .collection('reports')
        .doc(item)
        .get()
        .then(querySnapshot => {
            setData(querySnapshot.data())
            if(querySnapshot.data().comment){
                setComment(querySnapshot.data().comment)
            }

            firestore()
            .collection('users')
            .doc(querySnapshot.data().user)
            .get()
            .then(doc => {
                setShow(false)
                setUser(doc.data())
            })
            .catch(err => {
                setShow(false)
                //
            })
        })
        .catch(err => {
            //
        })
      
    }, [updated])

    const markasfixed = () => {
        Alert.alert("Confirm", "Are you sure to mark this as fixed?", 
        [
            {
                text: 'No',
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    firestore()
                    .collection('reports')
                    .doc(item)
                    .update({
                        fixed: true,
                    })
                    .then(() => {
                        setUpdated(Date.now())
                    })
                    .catch(err => {
                        Alert.alert ("Error", 'Please enter the comment text.')
                    })
                }
            }
          ],
        )
        

    }

    return(<ScrollView>
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
                backgroundColor: '#ffffff8c',
                padding: 15,
                margin: 5,
                width: '60%',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: '25%',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 15
            }}
        >
            <Text style={styles.paragraph}>Send Comment</Text>
            <TextInput 
                style={{...styles.input, ...{width: '100%'}}} 
                multiline={true} 
                onChangeText={setComment}
                value={comment}
                placeholder="Enter your feedback"
            />
            <Text style={{color: '#000', textAlign: 'center'}}>{msg}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 3}}>
                <TouchableOpacity style={styles.btn} onPress={handleComment}>
                    <Text style={{color: '#ffffff', textAlign: 'center'}}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => setShow(false)}>
                    <Text style={{color: '#ffffff', textAlign: 'center'}}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>}
      {/* <ImageBackground source={require('../assets/bg.jpg')} style={styles.main}> */}
        {(data && user) && <View style={{padding: 15}}>
        {user && <>    
        <Image source={{uri: `https://firebasestorage.googleapis.com/v0/b/aidro-fd5e7.appspot.com/o/images%2F${data.image}?alt=media`}} style={styles.pic} />
        <Text style={styles.paragraph}>Name: {user.name}</Text>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text style={styles.paragraph}>Mobile: {user.mobile}</Text>
            <Text style={styles.paragraph}>E-mail: {user.email}</Text>
        </View>
        </>}
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text style={styles.paragraph}>Priority: {data.priority}</Text>

            <Text style={styles.paragraph}>Governorate: {data.governorate}</Text>
        </View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text style={styles.paragraph}>Address: {data.address}</Text>
            <Text style={styles.paragraph}>Condition: {data.fixed?"Fixed":"Unfixed"}</Text>
        </View>
        <TouchableOpacity
            style={styles.btn}
            onPress={() => Linking.openURL('https://maps.google.com/?q='+data.location.lat+','+data.location.lon)}
        >
            <Text style={{color: '#fff', textAlign: 'center'}}>Open on Google Maps</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>Note: </Text>
        <Text style={styles.paragraph}>{data.note}</Text>
        <Text style={styles.paragraph}>Feedback: {data.comment?data.comment:"No feedback yet.."
        }</Text>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5
        }}>
            <TouchableOpacity style={styles.btn} onPress={() => setShow(true)}>
                <Text style={{color: '#ffffff', textAlign: 'center'}}>Add Feedback</Text>
            </TouchableOpacity>
            {!data.fixed && <TouchableOpacity style={styles.btn} onPress={markasfixed}>
                <Text style={{color: '#ffffff', textAlign: 'center'}}>Mark As Fixed</Text>
            </TouchableOpacity>}
        </View>
        </View>}

        <View style={{padding: '5%'}}></View>
        {/* </ImageBackground> */}
    </ScrollView>)
}

export default Details;