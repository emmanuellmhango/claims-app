import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const ClaimHistory = () => {
  const [claims, setClaims] = useState([]);
  const claimsAll = useSelector((state) => state.claims.claims);
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {claims &&
        claims.map((item, index) => {
          return (
            <View key={index}>
              <Text>{item.category}</Text>
              <Text>{item.comment}</Text>
              <Text>{item.latitude}</Text>
              <Text>{item.longitude}</Text>
              <Text>{item.operator}</Text>
              <Text>{item.picture}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default ClaimHistory;
