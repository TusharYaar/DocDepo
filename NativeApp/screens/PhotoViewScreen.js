import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
} from "react-native";

import { Button } from "react-native-paper";

import { firestore, storage, TIMESTAMP } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { addDoc } from "../store/actions/docs";



const PhotoViewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { uri, width, height } = props.route.params;
  const userId = useSelector((state) => state.user.uid);
  const userEmail = useSelector((state) => state.user.email);
  const name = "SomeImage.jpg";
  const dispatch = useDispatch();
  const cameraStyle = {
    width: useWindowDimensions().width,
    height: (useWindowDimensions().width / 3) * 4,
  };
  const uploadPhoto = async () => {
    setIsLoading(true);
      try{
            const fileRef = storage.child(`${userId}/${name}`);
            const uploadTask = await fileRef.put(uri);
         const fileUrl = await uploadTask.ref.getDownloadURL();
            const doc = {
          name: name,
          url: fileUrl,
          user: userId,
          createdAt: TIMESTAMP.now(),
          userEmail: userEmail,
          path: `${userId}/${name}`,
          type: "image",
        };
        const ref = await firestore.collection("docsDepo").add(doc);
        dispatch(addDoc({ id: ref.id, ...doc }));
          props.navigation.navigate("Docs");
      }
      catch(err){
        setIsLoading(false);
      }
  }
  return (
    <View style={styles.screen}>
      <Image
        source={{ uri: uri }}
        style={{ ...styles.image, ...cameraStyle }}
      />
      <View style={styles.temp}></View>
      <Button
        onPress={() => {
          props.navigation.navigate("Camera");
        }}
      >
        Go Back
      </Button>
      <Button disabled={isLoading} onPress={uploadPhoto}> 
          Upload Picture
      </Button>
    </View>
  );
};

export default PhotoViewScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  image: {
    height: "100%",
    width: "100%",
  },
});
