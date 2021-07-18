import React from 'react'
import { StyleSheet, Text, ScrollView,Image, View, useWindowDimensions } from 'react-native'

import {Button} from 'react-native-paper';
const PhotoViewScreen = (props) => {
    // const uri = props.navigation.getParam("uri");
    const {uri, width, height} = props.route.params;

    const cameraStyle = {
        width: useWindowDimensions().width,
        height: (useWindowDimensions().width / 3) * 4,
      };
    return (
        <ScrollView style={styles.screen}>
            <Image source={{uri:uri}} style={{...styles.image,...cameraStyle}}/>
            <View style={styles.temp}></View>
            <Button onPress={()=>{
    props.navigation.navigate("Camera",{uri, width, height});
            }
            }>Go Back</Button>
        </ScrollView>
    )
}

export default PhotoViewScreen

const styles = StyleSheet.create({
    screen: {flex: 1},
    image: {
        height: "100%",
        width: "100%"
    },
},
)
