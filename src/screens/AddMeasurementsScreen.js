import { useNavigation } from "@react-navigation/native";
import React, {useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import {Entypo, FontAwesome, FontAwesome5,} from '@expo/vector-icons';

const AddMeasurementsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const [heartrate, setHeartrate] = useState();
  const [oxygenlvl, setOxygenlvl] = useState();
  const [breathrate, setBreathrate] = useState();
  const { Timestamp } = require("firebase/firestore");

  const AddMeasurements = async () => {
    const measurementsCollectionRef = collection(db, "measurements");
    Timestamp.fromDate(new Date());
    const result = await addDoc(measurementsCollectionRef, {
      heartRate: heartrate,
      oxygenSatLvl: oxygenlvl,
      breathRate: breathrate,
      patientID: data.id,
      date: Timestamp.now(),
    }).then(
      Keyboard.dismiss()
    )
    if(result){
      navigation.navigate("Room", { data: data });
      alert("Measurements added successfully");
    }
  };

  return (
    <View style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>

        <Text style={styles.text_title}>Adding measurements for: {data.fName}, {data.lName}</Text>

        <Text style={styles.text}><FontAwesome name="heartbeat" size={26} color="red" /> Heart Rate</Text>
        <TextInput
          placeholder="Heart Rate"
          value={heartrate}
          onChangeText={(text) => setHeartrate(text)}
          style={styles.input}
        />

        <Text style={styles.text}><Entypo name="air" size={26} color="blue"/> Oxygen Saturation Level</Text>
        <TextInput
          placeholder="Oxygen Saturation Level"
          value={oxygenlvl}
          onChangeText={(text) => setOxygenlvl(text)}
          style={styles.input}
        />

        <Text style={styles.text}> <FontAwesome5 name="lungs" size={24} color="pink" /> Breath Rate</Text>
        <TextInput
          placeholder="Breath Rate"
          value={breathrate}
          onChangeText={(text) => setBreathrate(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={AddMeasurements} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
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
    fontSize: 20,
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

export default AddMeasurementsScreen;
