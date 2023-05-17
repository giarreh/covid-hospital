import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

export default function EditRoomScreen({ route }) {
  const { item, data } = route.params;
  const roomID = item.item.id;
  const [NewPatientID, setNewPatientID] = useState("");
  const [NewRoomName, setNewRoomName] = useState("");
  const [NewRoomNumber, setNewRoomNumber] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [patients, setPatients] = useState([]);
  const [room, setRoom] = useState({});
  const roomsCollectionRef = collection(db, "rooms");

  useEffect(() => {
    let all_patients, all_rooms;
    const fetchPatients = async () => {
      const patientCollectionRef = collection(db, "patients");
      const datas = await getDocs(patientCollectionRef);
      all_patients = datas.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    };
    fetchPatients();
    const fetchRooms = async () => {
      const datas = await getDocs(roomsCollectionRef);
      all_rooms = datas.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const noRooms = all_patients.filter(
        (val) =>
          !all_rooms
            .filter((val) => val.patientID != "")
            .map((val) => val.patientID)
            .includes(val.id)
      );
      const currRoom = all_rooms.filter((val) => val.id == roomID);
      setRoom(currRoom);
      if (Object.keys(data).length !== 0) {
        setPatients([data, ...noRooms]);
      } else {
        setPatients([...noRooms]);
      }
      setNewRoomNumber(String(currRoom[0].roomNumber));
      setNewRoomName(currRoom[0].roomName);
    };
    fetchRooms();
  }, []);

  const updateRoom = async () => {
    const roomCollectionRef = doc(db, "rooms", item.item.id);
    await updateDoc(roomCollectionRef, {
      roomName: NewRoomName,
      roomNumber: NewRoomNumber,
      patientID: selectedValue.id,
    });
  };

  const removePatient = async () => {
    const roomCollectionRef = doc(db, "rooms", item.item.id);
    await updateDoc(roomCollectionRef, {
      roomName: NewRoomName,
      roomNumber: NewRoomNumber,
      patientID: "",
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {patients.map((patient) => {
            return (
              <Picker.Item
                style={styles.text_2}
                label={patient.fName + " " + patient.lName}
                value={patient}
                key={patient.id}
              />
            );
          })}
        </Picker>
        <Text style={styles.text}>Room name</Text>
        <TextInput
          placeholder="Room name"
          value={NewRoomName}
          onChangeText={(text) => setNewRoomName(text)}
          style={styles.input}
        />
        <Text style={styles.text}>Room number</Text>
        <TextInput
          placeholder="Room number"
          value={NewRoomNumber}
          onChangeText={(text) => setNewRoomNumber(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => updateRoom()} style={styles.button}>
          <Text style={styles.buttonText}>Update Room</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removePatient()} style={styles.button}>
          <Text style={styles.buttonText}>Remove Patient</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
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
    textAlign: "center",
    fontSize: 26,
    color: "white",
    paddingTop: 15,
  },
  text_2: {
    textAlign: "center",
    fontSize: 26,
    color: "white",
    backgroundColor: "#21242D",
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