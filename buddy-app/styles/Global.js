import { StyleSheet } from 'react-native';
import Colors from './Colors.js'

const Global = StyleSheet.create({
    logo: { fontSize: 35,
        color: Colors.darkGray,
        fontFamily: 'Nunito-Black',
        marginBottom: -5,
    },
    logoContainer: {
        borderBottomWidth: 5,
        borderBottomColor: 'black',
    },
})

export default Global