import { View, Text, FlatList } from "react-native";
import React from "react";

export default function PlacesListView({ placeList }) {
  console.log("**", placeList);

  return (
    <View>
      <FlatList
        data={placeList}
        renderItem={({ item, index }) => (
          <View>
            <Text>{index}</Text>
          </View>
        )}
      />
    </View>
  );
}
