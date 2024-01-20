import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    main: {
        //flex: 1,
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'contain'
    },
    headline: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 15,
        textAlign: 'center',
        color: '#000000',
    },
    mainBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DB9E7D',
        color: '#000000',
        padding: 15,
        margin: 3,
        width: '75%',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: '10%',
    },
    centerScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnHeadline: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#000000',
    },
    logoutBtn: {
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#5F4331',
        borderRadius: 15,
        marginTop: '45%',
    },
    btnImg: {
        width: 59,
        height: 40,
        resizeMode: 'contain',
        
    },
    thumbnail: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        resizeMode: 'contain',
        borderRadius: 5
    },
    btn: {
        backgroundColor: '#5F4331',
        padding: 5,
        margin: 5,
        textAlign: 'center',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 15
    },
    label: {
        color: '#000000',
        margin: 5,
        paddingLeft: 15
        //textAlign: 'center'
    },
    input: {
        color: '#000000',
        margin: 15,
        padding: 15,
        backgroundColor: '#FEFAEC',
        borderRadius: 15,

    },
    paragraph: {
        margin: 5,
        color: "#000",
        padding: 5,

    },
    card: {
        backgroundColor: '#ffffff8c',
        //padding: 15,
        margin: 5,
        borderRadius: 15,
    },
    pic: {
        width: '100%',
        height: 400,
        margin: 3,
        resizeMode: 'contain',
        borderRadius: 15,
        alignSelf: 'center'
    }
})
