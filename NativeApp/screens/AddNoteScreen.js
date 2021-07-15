import React, {useState} from 'react'
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native'

import * as Clipboard from 'expo-clipboard';
import { useSelector } from 'react-redux';

import {firestore,TIMESTAMP} from "../config"

const AddNoteScreen = (props) => {
    const user = useSelector(state => state.user);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setNote(text);
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
        console.log(note);
        const ref = await firestore.collection('notesDepo').add(note);
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
            <TextInput style={styles.input} multiline autoFocus keyboardType="default" autoCapitalize="sentences" numberOfLines={5} maxLength={120} value={text} onChangeText={handleChange}/>
            <View style={styles.button}>    
            <Button title="Last Copied Text" onPress={fetchCopiedText} disabled={isLoading}  />
            </View ><View style={styles.button}>
            <Button title="Add Note" onPress={handleSubmit} disabled={isLoading} />
            </View>
        </View>
    )
}

export default AddNoteScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10
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