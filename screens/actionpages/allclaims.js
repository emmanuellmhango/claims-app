import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/styles";

const AllClaims = (props) => {
  const navigation = useNavigation();
  const { claims } = props;
  const viewOnMap = (claim) => {
    navigation.navigate("ViewMap", { claim: claim });
  };
  return (
    <View style={styles.modalFly}>
      <Text style={styles.flyTitle}>Recent Claims</Text>
      <View style={styles.flyContainer}>
        <ScrollView>
          {claims &&
            claims.map((claim, index) => {
              return (
                <TouchableOpacity onPress={() => viewOnMap(claim)} key={index}>
                  <View style={styles.flyItemContainer}>
                    <View style={styles.flyItem}>
                      <View style={styles.flyImageContainer}>
                        <Image
                          source={{ uri: claim.pictures[0] }}
                          style={styles.flyImage}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.flyTextContainer}>
                        <Text style={styles.flyText}>
                          {claim.comment.slice(0, 20)}
                        </Text>
                        <Text style={styles.flyTextClaims}>
                          {claim.category} | {claim.operator}
                        </Text>
                        <Text style={styles.flyTextClaims}>{claim.date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default AllClaims;
