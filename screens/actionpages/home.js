import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../styles/styles";

const Home = () => {
  const claimsAll = useSelector((state) => state.claims.claims);
  const [location, setLocation] = useState(null);
  const [claims, setClaims] = useState(null);
  const defaultZoomLevel = 0.01;
  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    if (claimsAll) {
      convertKeysToString(claimsAll);
    }
  }, []);

  const convertKeysToString = (data) => {
    const transformedData = data.map((item) => {
      const { category, comment, location, operator, picture } = item;
      return {
        [category]: category,
        [comment]: comment,
        ...location,
        [operator]: operator,
        picture: picture,
      };
    });

    setClaims(transformedData);
  };

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  };
  console.log(claims);
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
          {claims &&
            Object.values(claims).map((claim, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: claim.latitude,
                  longitude: claim.longitude,
                }}
                title={claim.title}
              />
            ))}
        </MapView>
      ) : (
        <View style={styles.mapLoading}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default Home;
