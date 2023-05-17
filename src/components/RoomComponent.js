import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
} from "firebase/firestore";

export default function RoomComponent(props) {
  const { item } = props;
  const [patient, setPatient] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPatient = async () => {
      if (item.item.patientID != "") {
        const docRef = doc(db, "patients", item.item.patientID.trim());
        const data = await getDoc(docRef);
        setPatient({ ...data.data(), id: data.id });
      }
    };
    fetchPatient();
  }, []);

  return (
    <View>
      <TouchableOpacity
      style={styles.button}
        onPress={() => {
          navigation.navigate("Room", { data: patient, room: item });
        }}
      >
        <Text style={styles.text}>
          {item.item.roomName}: Patient: {patient.lName}, {patient.fName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  room: {
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "80%",
  },
  text: {
    fontSize: 16,
    padding: 5,
    color: "white",
    textAlign: "center",
  },
  text_title: {
    fontSize: 35,
    padding: 5,
    color: "white",
    textAlign: "center",
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});