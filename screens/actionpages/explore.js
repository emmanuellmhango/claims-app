import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/styles";

const Explore = ({ navigation }) => {
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

  const handleAddButtonPress = () => {
    navigation.navigate("ClaimOne");
  };
  const openHome = () => {
    navigation.navigate("Dashboard");
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About</Text>
          <TouchableOpacity onPress={openHome}>
            <Text style={styles.headerTitle}>Home</Text>
          </TouchableOpacity>
          <View style={styles.rightIconContainer}>
            <Text style={styles.headerTitleActive}>Explore</Text>
          </View>
        </View>
      </View>
      <View style={styles.cameraIcon}>
        <TouchableOpacity onPress={handleAddButtonPress}>
          <Ionicons name="camera" style={styles.cameraIconStyling} />
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
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
    </View>
  );
};

export default Explore;
