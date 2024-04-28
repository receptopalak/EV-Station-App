import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import { SelectMarkerContext } from "../../Context/SelectMarkerContext";

export default function Markers({ index, place }) {
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  return (
    <View>
      <Marker
        coordinate={{
          latitude: place.location?.latitude,
          longitude: place.location?.longitude,
        }}
        onPress={() => setSelectedMarker(index != 0 ? index : 1)}
      >
        <Image
          source={require("./../../../assets/images/ev-charging.png")}
          style={{ width: 40, height: 60 }}
        />
      </Marker>
    </View>
  );
}
