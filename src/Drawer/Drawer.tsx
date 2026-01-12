import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Drawer = (props: Props) => {
    return (
        <View style={styles.container}>
            <Image source={require('../source/png/user.png')} style={{ width: 50, height: 50 }} />
        </View>
    )
}

export default Drawer

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#8dc4f1ff',
        zIndex: -99
    }
})