import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const PhotoViewScreen = (props) => {
    // const uri = props.navigation.getParam("uri");
     const {uri, width, height} = props.route.params;
    return (
        <View style={styles.screen}>
            <Image source={{uri:uri}} style={styles.image}/>
        </View>
    )
}

export default PhotoViewScreen

const styles = StyleSheet.create({
    screen: {flex: 1},
    image: {
        height: "100%",
        width: "100%"
    }
},
)
