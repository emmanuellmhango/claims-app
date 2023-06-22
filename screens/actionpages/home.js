import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { View, Text } from "react-native";
import { styles } from "../../styles/styles";

const Home = () => {
  const [location, setLocation] = useState(null);
  const defaultZoomLevel = 0.01;
  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  };

  return (
    <View style={styles.wrapper}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: defaultZoomLevel,
            longitudeDelta: defaultZoomLevel,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="My Location"
          />
        </MapView>
      ) : (
        <Text style={styles.mapLoading}>Loading...</Text>
      )}
    </View>
  );
};

export default Home;
