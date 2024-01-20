import { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, Text, View } from "react-native";
import firestore from '@react-native-firebase/firestore';

import { styles } from "../styles";

const Feedback = ({ route, navigation }) => {
    const [data, setData] = useState(null)
    const { user } = route.params;
    
    useEffect(() => {
        firestore()
        .collection('reports')
        .where('user', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(querySnapshot => {
            let temp_arr = []
            querySnapshot.forEach(documentSnapshot => {
                temp_arr.push({
                    id: documentSnapshot.id,
                    type: documentSnapshot.data().type,
                    comment: documentSnapshot.data().comment,
                    image: documentSnapshot.data().image,
                    date: documentSnapshot.data().date,
                })
            });

            setData(temp_arr)
        })
        .catch(err => {
            //
        })
      
    }, [])

    return(<View style={styles.page}>
        <ImageBackground source={require('../assets/bg.jpg')} style={styles.main}>
        {!data && <View style={styles.centerScreen}>
            <Text style={{color: '#000'}}>No Feedback yet, comback after you submit reports..</Text>
        </View>}

        <FlatList
            data={data}
            renderItem={({item}) => <View style={styles.card}>
                <Image source={{uri: `https://firebasestorage.googleapis.com/v0/b/aidro-fd5e7.appspot.com/o/images%2F${item.image}?alt=media`}} style={styles.pic} />
                <View style={{padding: 15}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                        <Text style={styles.paragraph}>{(new Date(item.date).toDateString())}</Text>
                        <Text style={styles.paragraph}>{item.type}</Text>
                    </View>
                    {item.comment && <Text style={styles.paragraph}>Feedback: {item.comment}</Text>}
                    {!item.comment && <Text style={styles.paragraph}>No feedback yet..</Text>}
                </View>
            </View>}
            keyExtractor={item => item.id}
        />
        <View style={{padding: '5%'}}></View>
        </ImageBackground>
    </View>)
}

export default Feedback;