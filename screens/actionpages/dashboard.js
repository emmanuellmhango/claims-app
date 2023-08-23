import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchClaims } from "../../state/fetchClaims";
import { addClaim } from "../../state/addClaimSlice";
import { styles } from "../../styles/styles";

const DashBoard = ({ navigation }) => {
  const dispatch = useDispatch();
  const claimsAll = useSelector((state) => state.claims.claims);
  const { user } = useSelector((state) => state.user);
  const [weeklyClaims, setWeeklyClaims] = useState("");
  const [topCategory, setTopCategory] = useState("");

  const viewOnMap = (claim) => {
    navigation.navigate("ViewMap", { claim: claim });
  };

  useEffect(() => {
    const fetchClaimsByUser = async () => {
      const response = await fetchClaims(user.id);
      if (response !== null) {
        dispatch(addClaim(response));
      }
    };
    fetchClaimsByUser();
  }, []);

  console.log(claimsAll);

  useEffect(() => {
    if (claimsAll) {
      findMostOccurringCategory(claimsAll);
    } else {
      setWeeklyClaims(`Weekly Claims: 0`);
      setTopCategory(`Top Category: --`);
    }
  }, [claimsAll]);

  const handleAddButtonPress = () => {
    navigation.navigate("ClaimOne");
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
    setWeeklyClaims(`Weekly Claims: ${data.length}`);
    setTopCategory(`Top Category: ${mostOccurringCategory || "--"}`);
  };

  const openModal = () => {
    navigation.navigate("Explore");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About</Text>
          <Text style={styles.headerTitleActive}>Home</Text>
          <View style={styles.rightIconContainer}>
            <TouchableOpacity onPress={openModal}>
              <Text style={styles.headerTitle}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.cameraIcon}>
        <TouchableOpacity onPress={handleAddButtonPress}>
          <Ionicons name="camera" style={styles.cameraIconStyling} />
        </TouchableOpacity>
      </View>
      <View style={styles.claimsContainer}>
        {claimsAll?.length < 1 ||
          (claimsAll === null && (
            <View style={styles.NoContentFlyItemContainer}>
              <Text style={styles.NoClaimsFlyText}>No Claims Yet</Text>
            </View>
          ))}
        {claimsAll?.length > 0 && (
          <View style={styles.modalFly}>
            <Text style={styles.flyTitle}>Recent Claims</Text>
            <View style={styles.flyContainer}>
              <ScrollView>
                {claimsAll &&
                  claimsAll.map((claim, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => viewOnMap(claim)}
                        key={index}
                      >
                        <View style={styles.flyItemContainer}>
                          <View style={styles.flyItem}>
                            <View style={styles.flyImageContainer}>
                              {/* <Image
                                source={{ uri: claim.pictures[0] }}
                                style={styles.flyImage}
                                resizeMode="contain"
                              /> */}
                              <Text>IMG</Text>
                            </View>
                            <View style={styles.flyTextContainer}>
                              <Text style={styles.flyText}>
                                {claim.comment.slice(0, 20)}
                              </Text>
                              <Text style={styles.flyTextClaims}>
                                {claim.category} | {claim.operator}
                              </Text>
                              <Text style={styles.flyTextClaims}>
                                {claim.date}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        )}
      </View>
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
        <View style={styles.topCategory}>
          <View style={styles.instructionsView}>
            <Text style={styles.instruction}>
              To make a claim, press the Taget button
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashBoard;
