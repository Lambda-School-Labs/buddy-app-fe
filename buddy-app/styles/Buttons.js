import { StyleSheet } from 'react-native';
import Colors from './Colors.js'

const Buttons = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    text: {
        fontSize: 15,
        fontFamily: 'Nunito-Regular',
        color: Colors.darkGray
    },
    primary: {
        backgroundColor: Colors.purple,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: Colors.purple,
    },
    secondary: {
        borderWidth: 1,
        borderColor: Colors.darkGray,
    },
    textAuth: {
        fontSize: 18
    },
    textPrimary: {
        color: '#FFF',
    },
    container: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
    }
})

export default Buttons;