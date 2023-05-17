import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  limit,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
const RoomScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data, room } = route.params ?? {};
  if (data) {
    const [measurements, setMeasurements] = useState([]);

    useEffect(() => {
      const fetchMeasurements = async () => {
        if (data.id) {
          const measurementsCollectionRef = collection(db, "measurements");
          const newData = await getDocs(
            query(
              measurementsCollectionRef,
              orderBy("date", "desc"),
              where("patientID", "==", data.id),
              limit(1)
            )
          );
          setMeasurements(
            newData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      };
      fetchMeasurements();
    }, []);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.textTitle}>
          {data.fName} {data.lName}
        </Text>
        <Text style={styles.text}>
          <FontAwesome name="heartbeat" size={26} color="red" />
          Heart rate: {measurements.map((el) => el.heartRate).toString()}
        </Text>

        <Text style={styles.text}>
          <Entypo name="air" size={26} color="blue" />
          Oxygen Saturation Level:{" "}
          {measurements.map((el) => el.oxygenSatLvl).toString()}
        </Text>
        
        <Text style={styles.text}>
        <FontAwesome5 name="lungs" size={24} color="pink" /> Breath Rate:{" "}
          {measurements.map((el) => el.breathRate).toString()}
        </Text>

        <Text style={styles.text}>
          {" "}
          Last time edited:{" "}
          {measurements.map((el) =>
            new Date(el.date.toDate())
              .toLocaleTimeString("no-NO", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(/(:\d{2}| [AP]M)$/, "")
          )}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("DetailedRoom", { data: data });
          }}
        >
          <Text style={styles.buttonText}>View Detailed information</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("AddMeasurements", { data: data });
          }}
        >
          <Text style={styles.buttonText}>Add Measurements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("EditRoomScreen", { item: room, data: data });
          }}
        >
          <Text style={styles.buttonText}>Edit details</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return <Text style={styles.text}>No rooms selected</Text>;
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    marginBottom: 15,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 15,
    color:"white"
  },
  text: {
    fontSize: 16,
    padding: 10,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
    marginLeft: 75,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
export default RoomScreen;
