import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useContext } from "react";
import MapViewStyle from "./../../Utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";
import Markers from "./Markers";

export default function AppMapView({ placeList }) {
  const { location, setLocation } = useContext(UserLocationContext);

  return (
    location?.latitude && (
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={false}
          customMapStyle={MapViewStyle}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
          >
            <Image
              source={require("./../../../assets/images/car-marker.png")}
              style={{ width: 60, height: 60 }}
            />
          </Marker>

          {placeList &&
            placeList.map(
              (item, index) =>
                item && <Markers key={index} place={item} index={index} />
            )}
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
