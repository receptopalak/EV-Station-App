import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { UserLocationContext } from "../../Context/UserLocationContext";
import GlobalApi from "../../Utils/GlobalApi";
import PlacesListView from "./PlacesListView";
import { SelectMarkerContext } from "../../Context/SelectMarkerContext";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState();

  useEffect(() => {
    console.log("effect", location);
    location && GetNearByPlaces();
  }, [location]);

  const GetNearByPlaces = () => {
    console.log("log in nearby");
    var data = JSON.stringify({
      includedTypes: ["electric_vehicle_charging_station"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    });

    GlobalApi.NewNearByPlace(data)
      .then((resp) => {
        console.log("Nearby");
        console.log(JSON.stringify(resp.data));
        setPlaceList(resp.data?.places);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View>
        <View style={styles.headerContainer}>
          <Header />
          <SearchBar
            searchedLocation={(location) =>
              setLocation({
                latitude: location.lat,
                longitude: location.lng,
              })
            }
            style={{ zIndex: 20 }}
          />
        </View>
        {placeList && <AppMapView placeList={placeList} />}
        <View style={styles.placeListContainer}>
          {placeList && <PlacesListView placeList={placeList} />}
        </View>
      </View>
    </SelectMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 20,
    padding: 10,
    width: "100%",
  },
  placeListContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 15,
    width: "100%",
  },
});
