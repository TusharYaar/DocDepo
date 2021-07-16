import React, {useState} from 'react'
import { StyleSheet, View,  Alert, Platform } from 'react-native'

import {TextInput,Button} from 'react-native-paper'

import * as Clipboard from 'expo-clipboard';
import { useSelector, useDispatch } from 'react-redux';
import {addNote} from "../store/actions/notes";

import {firestore,TIMESTAMP} from "../config"

const AddNoteScreen = (props) => {
    const user = useSelector(state => state.user);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setText(text);
      };
    const handleChange = (text) => {
        setText(text);
    }
    const handleSubmit = async () => {
    try {
        setIsLoading(true);
        const note = {
            text: text,
            user: user.uid,
            userEmail: user.email,
            isImportant: false,
            createdAt: TIMESTAMP.now(),
        };
        const ref = await firestore.collection('notesDepo').add(note);
        dispatch(addNote({ id: ref.id, ...note }));
        props.navigation.goBack();
    }
    catch (err) {
        setIsLoading(false);
        Alert.alert("Error", err.message,[{
            text: "Ok",
            style: "cancel",
          },]);
    }
    }
    return (
        <View style={styles.screen}>
            <TextInput label="Note" type="flat" multiline autoFocus keyboardType="default" autoCapitalize="sentences" numberOfLines={5} maxLength={120} value={text} onChangeText={handleChange}/>
            <View style={styles.button}>    
            <Button title="" onPress={fetchCopiedText} disabled={isLoading} mode={Platform.OS === "android" ? "contained" : "text"}>Last Copied Text</Button>
            </View ><View style={styles.button}>
            <Button title="Add Note" mode={Platform.OS === "android" ? "contained" : "text"} onPress={handleSubmit} disabled={isLoading  || text.length < 3 || text.length > 120}>Add Note </Button>
            </View>
        </View>
    )
}

export default AddNoteScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20
    }, input: {
        marginVertical: 12,
        borderWidth: 1,
        width: "100%",
        padding: 10,
        fontSize: 20,
        fontFamily: "Manrope_400Regular",
      },
      button: {
          margin: 10,
      }
})
;

export const addNoteScreenOptions = ({ navigation, route }) => {
    return { 
        title: "Add A Note" ,
    }
}