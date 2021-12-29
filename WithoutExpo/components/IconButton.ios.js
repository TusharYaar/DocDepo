import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const IconButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={props.style}>
        <Icon
          name={props.iconIos}
          size={props.size ? props.size : 24}
          color={props.color}
        />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
