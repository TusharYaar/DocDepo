import React from 'react'
import { StyleSheet, Text, View,Image,  useWindowDimensions } from 'react-native'

const PhotoViewScreen = (props) => {
    // const uri = props.navigation.getParam("uri");
    const cameraStyle = {
        width: useWindowDimensions().width,
        height: (useWindowDimensions().width / 3) * 4,
      };
     const {uri, width, height} = props.route.params;
    return (
        <View style={styles.screen}>
            <Image source={{uri:uri}} style={{...styles.image,...cameraStyle}}/>
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
