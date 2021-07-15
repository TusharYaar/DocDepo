import React , {useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import IconButton from "../components/IconButton";

import {firestore} from "../config"

import { useSelector,useDispatch } from 'react-redux';
const DocsDashboard = (props) => {

    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector((state) => state.user.uid);
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const fetchDocsFromFirestore = useCallback(async () => {
      setIsLoading(true);
      try {
        
        const querySnapshot = await firestore
        .collection("docsDepo")
        .where("user", "==", userId)
        .get();
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, ...doc.data() });
        });
        // dispatch(addMultipleNotes(arr));
        console.log(arr);
        setIsLoading(false);
      }
      catch(err) {
        console.error(err.message);
      }
    }, [firestore,dispatch,userId]);
  
    useEffect(() => {
      fetchDocsFromFirestore();
    }, [fetchDocsFromFirestore]);
  

    return (
        <View>
            <Text>This is Docs dashboard</Text>
        </View>
    )
}

export default DocsDashboard

const styles = StyleSheet.create({
    drawerIcon: {marginLeft: 10}
})


export const docsScreenOptions = ({ navigation, route }) => {
    return { 
        title: "Docs" ,
        headerLeft: () => (
            <IconButton
              onPress={() => navigation.toggleDrawer()}
              icon="menu"
              iconIos="ios-menu-sharp"
              style={styles.drawerIcon}
              color="black"
            />
          ),
    }
}