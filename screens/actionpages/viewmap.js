import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../../styles/styles";

const ViewMap = ({ route }) => {
  const { claim } = route.params;
  const defaultZoomLevel = 0.01;
  return (
    <View style={styles.wrapper}>
      <View style={styles.mapContainerClaim}>
        {claim && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: claim.location.latitude,
              longitude: claim.location.longitude,
              latitudeDelta: defaultZoomLevel,
              longitudeDelta: defaultZoomLevel,
            }}
          >
            <Marker
              coordinate={{
                latitude: claim.location.latitude,
                longitude: claim.location.longitude,
              }}
              pinColor={"purple"}
            >
              <MapView.Callout
                tooltip={true}
                style={{
                  zIndex: 10,
                }}
              >
                <View style={styles.calloutContainer}>
                  <View style={styles.imagesClaimSubmitContainer}>
                    {claim &&
                      claim.pictures.map((image, index) => {
                        return (
                          <View style={styles.imagesClaimSubmit} key={index}>
                            <Text
                              style={{
                                height: 200,
                                position: "relative",
                                bottom: 40,
                              }}
                            >
                              <Image
                                style={styles.capturedImageClaimMap}
                                source={{ uri: image }}
                                resizeMode="contain"
                              />
                            </Text>
                          </View>
                        );
                      })}
                  </View>
                  <View style={styles.markerGoup}>
                    <Text style={styles.textLeftClaimMarker}>Category :</Text>
                    <TextInput
                      style={styles.inputModalClaimMarker}
                      value={claim.category}
                    />
                  </View>
                  <View style={styles.markerGoup}>
                    <Text style={styles.textLeftClaimMarker}>Operator :</Text>
                    <TextInput
                      style={styles.inputModalClaimMarker}
                      value={claim.operator}
                    />
                  </View>
                  <View style={styles.markerGoup}>
                    <Text style={styles.textLeftClaimMarker}>Date :</Text>
                    <TextInput
                      style={styles.inputModalClaimMarker}
                      value={claim.date.slice(0, 10)}
                    />
                  </View>
                  <TextInput
                    style={styles.inputModalClaimComment}
                    value={claim.comment.slice(0, 100)}
                  />
                </View>
              </MapView.Callout>
            </Marker>
          </MapView>
        )}
      </View>
    </View>
  );
};

export default ViewMap;
