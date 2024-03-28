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
  const { username, loggedIn } = useAuth();
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
      if (bookmarked) {
        currentUser.books = currentUser.books.filter(function (bookItem) {
          return bookItem !== book;
        });
        console.log(currentUser.books);
      } else {
        currentUser.books.push(book);
        console.log(currentUser.books);
      }
      setCurrentUser(currentUser);
    }
    const message = bookmarked ? "Removed from bookmarks" : "Bookmarked";
    Alert.alert(message);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookDetails}>
        <Image source={book.image} style={styles.banner} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Author: {book.author}</Text>
        <Text style={styles.category}>Category: {book.category}</Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>
      <Text style={styles.episodeHeader}>Episodes:</Text>
      <View style={styles.episodeContainer}>
        {book.episodes.map((episode, index) => (
          <TouchableOpacity
            key={index}
            style={styles.episode}
            onPress={() => handleEpisodeClick(episode.link)}
          >
            <Text style={styles.episodeText}>Episode {episode.episodeNumber}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    backgroundColor: "#2D466B",
  },
  bookDetails: {
    width: "95%",
    backgroundColor: "#182F4A",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  author: {
    marginBottom: 5,
    color: "white",
  },
  category: {
    marginBottom: 5,
    color: "white",
  },
  description: {
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  episodeHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  episodeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  episode: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#0b114f",
  },
  episodeText: {
    color: "white",
  },
  bookmarkButton: {
    backgroundColor: "#0b114f",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    color: "white",
  },
  bookmarkButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BookDetailScreen;
