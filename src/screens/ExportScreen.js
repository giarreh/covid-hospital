import { useNavigation } from "@react-navigation/native";
import { Platform } from 'react-native';

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import * as FileSystem from "expo-file-system";

const ExportScreen = () => {
  const navigation = useNavigation();

  const [patients, setPatients] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const patientCollectionRef = collection(db, "patients");
  const measurementsCollectionRef = collection(db, "measurements");

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getDocs(patientCollectionRef);
      const all_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPatients(all_data);
    };
    fetchPatients();
  }, []);

  const downloadData = async () => {
  try {
    if (!selectedValue) {
      alert("Please select a patient.");
      return;
    }

    const measurement_data = await getDocs(
      query(measurementsCollectionRef, where("patientID", "==", selectedValue.id))
    );

    const measurements = measurement_data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const fileContent = JSON.stringify(measurements);
    const fileName = `${new Date().toISOString().split("T")[0]}-${selectedValue.id}.json`;

    const directory = Platform.OS === 'android'
      ? `${FileSystem.documentDirectory}exports/`
      : FileSystem.documentDirectory;

    const filePath = `${directory}${fileName}`;

    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    await FileSystem.writeAsStringAsync(filePath, fileContent);

    console.log("File written successfully:", filePath);
    console.log("File Content: ", '\n', fileContent);
    alert("Success! Data exported.");
  } catch (error) {
    console.error("Error exporting data:", error);
    alert("An error occurred while exporting data.");
  }
};

  return (
    <View>
      <Text style={styles.text}>Choose a patient</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {patients.map((patient) => {
          return (
            <Picker.Item
              style={styles.text_2}
              label={patient.fName+ " " + patient.lName}
              value={patient}
              key={patient.id}
            />
          );
        })}
      </Picker>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => downloadData()} style={styles.button}>
        <Text style={styles.buttonText}>Export data</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExportScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  calendar: {
    width: "10%",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 26,
    color: "white",
    paddingTop: 10,
  },
  text_2: {
    textAlign: "center",
    fontSize: 26,
    color: "white",
    backgroundColor: "#21242D",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
