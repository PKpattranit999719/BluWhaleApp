import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons"; 

type RegisterModalProps = {
  visible: boolean;
  onClose: () => void;
  onRegister: (
    username: string,
    email: string,
    password: string,
    birthdate: Date
  ) => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({
  visible,
  onClose,
  onRegister,
}) => {
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
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
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
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Register</Text>
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
          <View>
            <Text style={styles.birthText}>Birth Date</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.selectedDateText}>
              {birthdate.toLocaleDateString()}
            </Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons name="date-range" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display="default"
              maximumDate={new Date()} 
              onChange={handleDateChange}
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.button]}
              onPress={onClose}
            >
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: "#0b114f",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  birthText: {
    fontSize: 17.5, 
  },
  selectedDateText: {
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0b114f",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
});

export default RegisterModal;
