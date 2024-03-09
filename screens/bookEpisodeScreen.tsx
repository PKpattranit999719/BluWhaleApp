import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { sampleBooks } from "../sampleData";
import { useRoute } from "@react-navigation/native";

const BookEpisodeScreen: React.FC = () => {
  const route = useRoute();
  const { book } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={book.image} style={styles.image} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Author: {book.author}</Text>
      <Text style={styles.category}>Category: {book.category}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Text style={styles.episodeHeader}>Episodes:</Text>
      {book.episodes.map((episode, index) => (
        <TouchableOpacity key={index} style={styles.episode}>
          <Text>Episode {episode.episodeNumber}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    marginBottom: 5,
  },
  category: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
    textAlign: "center",
  },
  episodeHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  episode: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 5,
  },
});

export default BookEpisodeScreen;
