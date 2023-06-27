import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../styles/styles";

const DashBoard = ({ navigation }) => {
  const claimsAll = useSelector((state) => state.claims.claims);
  const [location, setLocation] = useState(null);
  const [claims, setClaims] = useState(null);
  const defaultZoomLevel = 0.01;
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [weeklyClaims, setWeeklyClaims] = useState("");
  const [topCategory, setTopCategory] = useState("");

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    if (claimsAll) {
      convertKeysToString(claimsAll);
      findMostOccurringCategory(claimsAll);
    }
  }, []);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

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
    setWeeklyClaims(`Weekly Claims: ${transformedData.length}`);
    setClaims(transformedData);
  };

  const findMostOccurringCategory = (data) => {
    const categoryCounts = data.reduce((counts, item) => {
      const { category } = item;
      counts[category] = (counts[category] || 0) + 1;
      return counts;
    }, {});

    let maxCount = 0;
    let mostOccurringCategory = null;

    for (const category in categoryCounts) {
      if (categoryCounts[category] > maxCount) {
        maxCount = categoryCounts[category];
        mostOccurringCategory = category;
      }
    }
    setTopCategory(`Top Category: ${mostOccurringCategory || "--"}`);
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
    navigation.navigate("MakeClaim");
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text>{/* */}</Text>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={styles.rightIconContainer}>
            <TouchableOpacity onPress={openModal}>
              <Ionicons
                name="md-menu-sharp"
                size={28}
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
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
            onMapReady={handleMapLoad}
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
        {/* Bottom analytics modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modal}>
            <View style={styles.analytics}>
              <MaterialCommunityIcons
                name="google-analytics"
                size={28}
                style={styles.analyticsIcon}
              />
              <TextInput style={styles.inputModal} value={weeklyClaims} />
            </View>
            <View style={styles.topCategory}>
              <Ionicons
                name="ios-grid-outline"
                size={28}
                style={styles.analyticsIcon}
              />
              <TextInput style={styles.inputModal} value={topCategory} />
            </View>
          </View>
        </Modal>
        {/* Sticky flying modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalFly}>
            <Text style={styles.flyTitle}>Claims History</Text>
            <View style={styles.flyContainer}>
              <ScrollView>
                <View style={styles.flyItem}>
                  <View style={styles.flyImageContainer}>
                    <Image
                      source={require("../../assets/image_uploads/pothole.jpg")}
                      style={styles.flyImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.flyTextContainer}>
                    <Text style={styles.flyText}>Broken water pipe</Text>
                    <Text style={styles.flyText}>10/10/2021</Text>
                  </View>
                </View>
                <View style={styles.flyItem}>
                  <View style={styles.flyImageContainer}>
                    <Image
                      source={require("../../assets/image_uploads/pothole.jpg")}
                      style={styles.flyImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.flyTextContainer}>
                    <Text style={styles.flyText}>Broken water pipe</Text>
                    <Text style={styles.flyText}>10/10/2021</Text>
                  </View>
                </View>
                <View style={styles.flyItem}>
                  <View style={styles.flyImageContainer}>
                    <Image
                      source={require("../../assets/image_uploads/pothole.jpg")}
                      style={styles.flyImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.flyTextContainer}>
                    <Text style={styles.flyText}>Broken water pipe</Text>
                    <Text style={styles.flyText}>10/10/2021</Text>
                  </View>
                </View>
                <View style={styles.flyItem}>
                  <View style={styles.flyImageContainer}>
                    <Image
                      source={require("../../assets/image_uploads/pothole.jpg")}
                      style={styles.flyImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.flyTextContainer}>
                    <Text style={styles.flyText}>Broken water pipe</Text>
                    <Text style={styles.flyText}>10/10/2021</Text>
                  </View>
                </View>
                <View style={styles.flyItem}>
                  <View style={styles.flyImageContainer}>
                    <Image
                      source={require("../../assets/image_uploads/pothole.jpg")}
                      style={styles.flyImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.flyTextContainer}>
                    <Text style={styles.flyText}>Broken water pipe</Text>
                    <Text style={styles.flyText}>10/10/2021</Text>
                  </View>
                </View>
                <View style={styles.flyItem}>
                  <View style={styles.flyImageContainer}>
                    <Image
                      source={require("../../assets/image_uploads/pothole.jpg")}
                      style={styles.flyImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.flyTextContainer}>
                    <Text style={styles.flyText}>Broken water pipe</Text>
                    <Text style={styles.flyText}>10/10/2021</Text>
                  </View>
                </View>
                <View style={styles.flyItem}>
                  <View style={styles.flyImageContainer}>
                    <Image
                      source={require("../../assets/image_uploads/pothole.jpg")}
                      style={styles.flyImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.flyTextContainer}>
                    <Text style={styles.flyText}>Broken water pipe</Text>
                    <Text style={styles.flyText}>10/10/2021</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>

      {isMapLoaded && (
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddButtonPress}
          >
            <Ionicons name="add-circle" size={60} style={styles.addArrow} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DashBoard;
