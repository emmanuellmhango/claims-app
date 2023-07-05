import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchClaims } from "../../state/fetchClaims";
import { addClaim } from "../../state/addClaimSlice";
import { styles } from "../../styles/styles";
import AllClaims from "./allclaims";

const DashBoard = ({ navigation }) => {
  const dispatch = useDispatch();
  const claimsAll = useSelector((state) => state.claims.claims);
  const { user } = useSelector((state) => state.user);
  const [weeklyClaims, setWeeklyClaims] = useState("");
  const [topCategory, setTopCategory] = useState("");

  useEffect(() => {
    const fetchClaimsByUser = async () => {
      const claims = await fetchClaims(user.id);
      dispatch(addClaim(claims));
    };
    fetchClaimsByUser();
  }, []);

  useEffect(() => {
    if (claimsAll) {
      findMostOccurringCategory(claimsAll);
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
        {claimsAll?.length < 1 || claimsAll === null ? (
          <View style={styles.NoContentFlyItemContainer}>
            <Text style={styles.NoClaimsFlyText}>No Claims Yet</Text>
          </View>
        ) : (
          <AllClaims claims={claimsAll} />
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
