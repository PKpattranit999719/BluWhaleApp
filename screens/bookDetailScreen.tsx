import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { sampleUsers } from "../sampleData";
import { useAuth } from "../authContext";

function BookDetailScreen({ route }) {
  const { username, loggedIn } = useAuth(); //
  const [currentUser, setCurrentUser] = useState(null);
  const { book } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [episodeLink, setEpisodeLink] = useState("");
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchUserData = () => {
      const user = sampleUsers.find((user) => user.username === username);
      setCurrentUser(user);
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    if (currentUser && currentUser.books) {
      const isBookmarked = currentUser.books.some(
        (b) => b.title === book.title
      );
      setBookmarked(isBookmarked);
    }
  }, [currentUser, book]);

  const handleEpisodeClick = (link) => {
    setEpisodeLink(link);
    setModalVisible(true);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (currentUser) {
      const updatedUser = { ...currentUser };
      if (bookmarked) {
        updatedUser.books.pop(book);
        console.log(currentUser.books);
      } else {
        updatedUser.books.push(book);
        console.log(currentUser.books);
      }
      setCurrentUser(updatedUser);
    }
    const message = bookmarked ? "Removed from bookmarks" : "Bookmarked";
    Alert.alert(message);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={book.image} style={styles.image} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Author: {book.author}</Text>
      <Text style={styles.category}>Category: {book.category}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Text style={styles.episodeHeader}>Episodes:</Text>
      {book.episodes.map((episode, index) => (
        <TouchableOpacity
          key={index}
          style={styles.episode}
          onPress={() => handleEpisodeClick(episode.link)}
        >
          <Text>Episode {episode.episodeNumber}</Text>
        </TouchableOpacity>
      ))}
      {loggedIn && (
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={handleBookmark}
        >
          <Text style={styles.bookmarkButtonText}>
            {bookmarked ? "Remove Bookmark" : "Bookmark"}
          </Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <WebView source={{ uri: episodeLink }} />
        </View>
      </Modal>
    </View>
  );
}

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
  bookmarkButton: {
    backgroundColor: "#0b114f",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bookmarkButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BookDetailScreen;
