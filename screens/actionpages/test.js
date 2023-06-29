{
  claim && (
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
        title={claim.category}
        description={claim.operator}
        callout={{
          style: {
            width: 100,
            height: 100,
          },
        }}
      >
        <MapView.Callout>
          <View style={styles.calloutContainer}>
            <View style={styles.imagesClaimSubmitContainer}>
              <View style={styles.imagesClaimSubmit}>
                <Image
                  source={{ uri: claim.pictures[0] }}
                  style={styles.capturedImageClaim}
                  resizeMode="contain"
                />
              </View>
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
  );
}
