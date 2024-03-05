import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from '@expo/vector-icons'; // Importing MaterialIcons from expo/vector-icons

type RegisterModalProps = {
  visible: boolean;
  onClose: () => void;
  onRegister: (username: string, email: string, password: string, birthdate: Date) => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ visible, onClose, onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!visible) {
      setUsername("");
      setEmail("");
      setPassword("");
      setBirthdate(new Date());
    }
  }, [visible]);
  
  const handleRegister = () => {
    // Check if any input field is empty or missing
    if (!username || !email || !password || !birthdate) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Calculate age based on birthdate
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
  
    // Check if age is below 10
    if (age < 10) {
      alert("You must be at least 10 years old to register.");
      return;
    }
  
    // Perform registration
    onRegister(username, email, password, birthdate);
  };

  const handleDateChange = (event: any, selectedDate: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <View style={styles.dateContainer}>
            <Text style={styles.selectedDateText}>{birthdate.toLocaleDateString()}</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
              <MaterialIcons name="date-range" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display="default"
              maximumDate={new Date()} // Set maximum date to the current date
              onChange={handleDateChange}
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.button]} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    height: 40,
    width: 200,
    marginBottom: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: '#0b114f',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  selectedDateText: {
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0b114f',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default RegisterModal;
