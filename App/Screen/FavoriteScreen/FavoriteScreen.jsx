import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Utils/Colors";
import { app } from "../../Utils/FirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import PlaceItem from "../HomeScreen/PlaceItem";
export default function FavoriteScreen() {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  const { user } = useUser();

  useEffect(() => {
    user && getFav();
  }, [user]);
  const getFav = async () => {
    setLoading(true);
    setFavList([]);
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavList((favList) => [...favList, doc.data()]);
      setLoading(false);
    });
  };

  return (
    <View style={{ marginBottom: 50 }}>
      <Text style={{ padding: 10, fontFamily: "outfit-medium", fontSize: 30 }}>
        My Favorite{" "}
        <Text
          style={{
            padding: 10,
            fontFamily: "outfit-medium",
            fontSize: 30,
            color: Colors.ACTIVE,
          }}
        >
          Station
        </Text>
      </Text>

      {!favList && (
        <View
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          <Text style={{ fontFamily: "outfit", marginTop: 5 }}>Loading...</Text>
        </View>
      )}
      <FlatList
        data={favList}
        onRefresh={() => getFav()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem
              place={item?.place}
              isFav={true}
              markedFav={() => getFav()}
            />
          </View>
        )}
      />
    </View>
  );
}
