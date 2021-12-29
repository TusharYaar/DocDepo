import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';

const IconButton = props => {
  const {colors} = useTheme();
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={props.style}>
        <Icon
          name={props.icon}
          size={props.size ? props.size : 24}
          color={props.color || colors.text}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default IconButton;
