import { useEffect, useState } from "react";
import { Alert, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';

import { styles } from "../styles";

const ReportsList = ({ route, navigation }) => {
    const [data, setData] = useState(null)
    const [update, setUpdate] = useState(Date.now())
    const { user } = route.params;

    useEffect(() => {
        firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
            firestore()
            .collection('reports')
            .where('type', '==', doc.data().section)
            .orderBy('date', 'desc')
            .get()
            .then(querySnapshot => {
                let temp_arr = []
                querySnapshot.forEach(documentSnapshot => {
                    temp_arr.push({
                        id: documentSnapshot.id,
                        type: documentSnapshot.data().type,
                        address: documentSnapshot.data().address,
                        image: documentSnapshot.data().image,
                        fixed: documentSnapshot.data().fixed,
                        priority: documentSnapshot.data().priority,
                        date: documentSnapshot.data().date
                    })
                });

                setData(temp_arr)
            })
            .catch(err => {
                //
            })
        })
      
    }, [update])

    const handleDelete = (item) => {
        Alert.alert('Report Removal', 'Are you sure you want to delete this report?', [
            {
              text: 'Cancel',
              //onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => {
                firestore()
                .collection('reports')
                .doc(item)
                .delete()
                .then(() => {
                    setUpdate(Date.now())
                })
                .catch(() => {
                    Alert.alert("Something went wrong...")
                })
            }},
        ]);
    }

    return(<View style={styles.page}>
      <ImageBackground source={require('../assets/bg.jpg')} style={styles.main}>
        {!data && <View style={styles.centerScreen}>
            <Text style={{color: '#000'}}>There are no reports submitted yet!</Text>
        </View>}
        
        <FlatList
            style={{paddingBottom: '5%'}}
            data={data}
            renderItem={({item}) => <View style={styles.card}>
                <Image source={{uri: `https://firebasestorage.googleapis.com/v0/b/aidro-fd5e7.appspot.com/o/images%2F${item.image}?alt=media`}} style={styles.pic} />
                <View style={{padding: 15}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                        <Text style={styles.paragraph}>{(new Date(item.date).toDateString())}</Text>
                        <Text style={styles.paragraph}>Priority: {item.priority}</Text>
                    </View>
                    <Text style={styles.paragraph}>{item.address}</Text>
                    <Text style={styles.paragraph}>Condition: {item.fixed?"Fixed":"Unfixed"}</Text>
                    <View style={{flexDirection: 'row', padding: 3, alignSelf: 'center'}}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Details', {item: item.id})}>
                            <Text style={{color: '#fff', textAlign: 'center'}}>View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => handleDelete(item.id)}>
                            <Text style={{color: '#fff', textAlign: 'center'}}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>}
            keyExtractor={item => item.id}
        />
        <View style={{padding: '5%'}}></View>
        </ImageBackground>
    </View>)
}

export default ReportsList;