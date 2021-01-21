import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {printLocation} from '../../services/weatherService';

const SunScreen = () => {
  useEffect(() => {
    printLocation();
  });

  return (
    <>
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default SunScreen;
