import React, {useState} from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

import * as Clipboard from 'expo-clipboard';
const AddNoteScreen = (props) => {
    const [note, setNote] = useState('');
    
    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setNote(text);
      };
    const handleChange = (text) => {
        setNote(text);
    }
    return (
        <View style={styles.screen}>
            <TextInput style={styles.input} multiline autoFocus keyboardType="default" autoCapitalize="sentences" numberOfLines={5} maxLength={120} value={note} onChangeText={handleChange}/>
            <View style={styles.button}>    
            <Button title="Last Copied Text" onPress={fetchCopiedText}  />
            </View ><View style={styles.button}>
            <Button title="Add Note" onPress={()=>{}} />
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