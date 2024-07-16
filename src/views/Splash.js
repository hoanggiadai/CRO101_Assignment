import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = ({ navigation }) => {
    setTimeout(() => {
        navigation.replace('Login')
    }, 3000);
    return (
        <View style={styles.container}>
            <Image source={require('../img/logo_fpoly.png')} style={styles.logo_fpoly} resizeMode='center' />
            <Image source={require('../img/anh_nen.png')} style={styles.anh_nen} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
        padding: 15
    },
    anh_nen: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginTop: 210
    },
    logo_fpoly: {
        width: 150,
        height: 50,

    }
})