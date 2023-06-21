import React from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { styles } from '../../styles/styles';

const MakeClaim = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView style={styles.map} />
    </View>
  );
};

export default MakeClaim;