import React, {useState, useEffect, useRef} from 'react';

import {StyleSheet, Text, View, Alert} from 'react-native';

import {Audio} from 'expo-av';
import LottieView from 'lottie-react-native';
import {IconButton} from 'react-native-paper';
const AudioScreen = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [recording, setRecording] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [audioURI, setAudioURI] = useState(null);
  const visualizerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const {status} = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const {recording} = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      setRecording(recording);
      visualizerRef.current.play();
    } catch (err) {
      Alert.alert('Failed to start recording', err.message);
      console.log(err);
    }
  };
  const stopRecording = async () => {
    visualizerRef.current.pause();
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioURI(uri);
    setRecording(null);
  };

  const cancelRecord = () => {
    setAudioURI(null);
    setPlaying(null);
    visualizerRef.current.reset();
  };

  const finishRecording = playbackStatus => {
    if (!playbackStatus.didJustFinish) return;
    visualizerRef.current.reset();
    setPlaying(null);
  };

  const playRecording = async () => {
    visualizerRef.current.play();
    try {
      const {sound} = await Audio.Sound.createAsync({uri: audioURI});
      setPlaying(sound);
      sound.setOnPlaybackStatusUpdate(finishRecording);
      sound.playAsync();
    } catch (err) {
      Alert.alert('Failed to play recording', err.message);
    }
  };
  const pauseRecording = async () => {
    visualizerRef.current.pause();
    setPlaying(null);
    await playing.pauseAsync();
  };

  const saveRecording = async () => {
    if (playing) await playing.unloadAsync();
    props.navigation.navigate('Docs', {uri: audioURI, type: 'Audio'});
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <LottieView
          ref={visualizerRef}
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../assets/lottie/audioVisualizer.json')}
          loop
        />
      </View>
      <View style={{...styles.container, ...styles.border}}>
        {!audioURI ? (
          <IconButton
            color={recording ? 'red' : 'green'}
            icon={recording ? 'stop-circle' : 'record-circle'}
            size={60}
            onPress={recording ? stopRecording : startRecording}
          />
        ) : (
          <View style={styles.buttonAction}>
            <IconButton icon="restart" size={40} onPress={cancelRecord} />
            <IconButton
              icon={playing ? 'pause-circle' : 'play-circle'}
              size={60}
              onPress={playing ? pauseRecording : playRecording}
            />
            <IconButton icon="check-bold" size={40} onPress={saveRecording} />
          </View>
        )}
      </View>
    </View>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonAction: {
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  border: {
    borderWidth: 0,
    borderColor: 'black',
    borderTopWidth: 2,
  },
});
