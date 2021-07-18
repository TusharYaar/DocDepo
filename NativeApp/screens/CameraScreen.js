import React, { useState, useEffect,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from '@react-navigation/native';
import { Button,IconButton, ActivityIndicator } from "react-native-paper";

import {PinchGestureHandler } from 'react-native-gesture-handler'

import Header from "../components/Header";
const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading]= useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState({value: Camera.Constants.FlashMode.off,icon: "flash-off"});
  const [whiteBalance, setWhiteBalance] = useState({value: Camera.Constants.WhiteBalance.auto,icon: "white-balance-auto"});

  const [zoom,setZoom] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const cameraStyle = {
    width: useWindowDimensions().width,
    height: (useWindowDimensions().width / 3) * 4,
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    });
    return unsubscribe;
  }, [navigation]);

  if (hasPermission === null || !isFocused) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // Camera Actions
  // Take Picture
   const takePicture = async () => {
    if (cameraRef && cameraReady) {
    setIsLoading(true);
    const { uri, width, height } = await cameraRef.current.takePictureAsync();
    setIsLoading(false);
    navigation.navigate("PhotoView",{uri, width, height});
    }
  };

  // Flip Camera
  const flipCamera = () => {
    setType(type === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front);
  }

  // Flash 
  const toggleFlash = () => {
    switch (flash.value) {
      case Camera.Constants.FlashMode.off: 
      setFlash({value: Camera.Constants.FlashMode.on,icon: "flash"}); 
      break;
      case Camera.Constants.FlashMode.on:
        setFlash({value: Camera.Constants.FlashMode.torch,icon: "flashlight"});
        break;
      case Camera.Constants.FlashMode.torch:
        setFlash({value: Camera.Constants.FlashMode.auto,icon: "flash-auto"});
      break;
      case Camera.Constants.FlashMode.auto:
        setFlash({value: Camera.Constants.FlashMode.off,icon: "flash-off"});
      break;
    }
  }
  // Zoom
  const handleZoom = (event) => {
    let zoomLevel = event.nativeEvent.scale < 1 ? zoom - 0.01 : zoom + 0.01
    zoomLevel = zoomLevel < 0 ? 0 : zoomLevel;
    zoomLevel = zoomLevel > 1 ? 1 : zoomLevel;
    setZoom(zoomLevel);
  }
  const resetZoom = () => {
    setZoom(0);
  }

  // White balance
  const handleWhiteBalance = () => {
    switch (whiteBalance.value)  {
      case Camera.Constants.WhiteBalance.auto:
        setWhiteBalance({value: Camera.Constants.WhiteBalance.incandescent,icon: "white-balance-incandescent"});
      break;
      case Camera.Constants.WhiteBalance.incandescent:
        setWhiteBalance({value: Camera.Constants.WhiteBalance.sunny,icon: "white-balance-sunny"});
      break;
      case Camera.Constants.WhiteBalance.sunny:
        setWhiteBalance({value: Camera.Constants.WhiteBalance.cloudy,icon: "weather-cloudy"});
      break;
      case Camera.Constants.WhiteBalance.cloudy:
        setWhiteBalance({value: Camera.Constants.WhiteBalance.fluorescent,icon: "white-balance-iridescent"});
      break;
      case Camera.Constants.WhiteBalance.fluorescent:
        setWhiteBalance({value: Camera.Constants.WhiteBalance.auto,icon: "white-balance-auto"});
      break;
    } 

  }

  return (
    <View style={styles.screen}>
      <PinchGestureHandler onGestureEvent={handleZoom} >
        <View style={styles.background}>
      <Camera
        style={{ ...styles.camera, ...cameraStyle}}
        type={type}
        flashMode={flash.value}
        autoFocus="on"
        zoom={zoom}
        whiteBalance={whiteBalance.value}
        onCameraReady={() => {
          setCameraReady(true);
        }}
        ratio="4:3"
        ref={cameraRef}
        >
      </Camera>
      </View>
    </PinchGestureHandler>
      <View>
        <View style={styles.buttonActions}>
          <IconButton onPress={flipCamera} icon={type === Camera.Constants.Type.back ? "camera-rear" : "camera-front"} />
          <IconButton onPress={toggleFlash} icon={flash.icon} />
          <IconButton onPress={handleWhiteBalance} icon={whiteBalance.icon} />
          <Button onPress={resetZoom} mode={Platform.OS === "android" ? "contained" : "text"}>{(1 + zoom*9).toFixed(1)}</Button>
        </View>
      </View>
        <View style={styles.pictureButton}>
        {isLoading ? <ActivityIndicator animating={true} size={56}/> : <IconButton icon="camera" onPress={takePicture} size={40}/>}
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  background: {
    backgroundColor: "orange"
  },
  pictureButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CameraScreen;
