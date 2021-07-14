import React ,{useState} from 'react';
import { StyleSheet, Text, View, TextInput,Button ,ActivityIndicator,StatusBar,Platform} from 'react-native';

import {auth} from "../config";

import { useDispatch } from 'react-redux';
import {loginUser} from "../store/actions/user";

import Header from "../components/Header";
import Body from "../components/Body";
const LoginScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("tusharagrawal16@rediffmail.com");
    const [password, setPassword] = useState("agrawal11");
    const [isLoading, setLoading] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
       try {
        await auth.signInWithEmailAndPassword(email, password);
        const  resData = await auth.currentUser.toJSON();
        const data = {
            expirationTime:resData.stsTokenManager.expirationTime,
            accessToken:resData.stsTokenManager.accessToken,
            email:  resData.email,
            apiKey: resData.apiKey,
            uid: resData.uid
        }
        dispatch(loginUser(data));
    } catch (err) {
        console.log(err.message);
        setLoading(false);      
    }
    }
    return (
        <View style={styles.screen}>
            <Header>Login</Header>
            <View style={styles.container}>
                <Body>Email</Body>
                <TextInput style={styles.input} value={email} onChangeText={(text) => {setEmail(text)}}/>
                <Body>Password</Body>
                <TextInput style={styles.input} value={password} onChangeText={(text) => {setPassword(text)}}/>
            </View>
            <View>
           { isLoading ? <ActivityIndicator color="black" size="large"/> : <Button title="Login" onPress={handleLogin} />
           } 
           </View>
            </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    },
    input: {
        marginVertical: 12,
        borderWidth: 1,
        width: "100%",
        padding: 10,
        fontSize: 20,
        fontFamily: "Manrope_400Regular"
      },
    container: {
        marginVertical: 40,

    }
})
