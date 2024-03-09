export const sampleBooks = [
  { 
    title: "Book 1", 
    author: "Author 1",
    category: "RomanceFantasy",
    description: "ชาติที่แล้วเสียชีวิตโดยเป็นฝีมือของพี่สาว ย้อนเวลาชาตินี้เลยมาแก้แค้นพี่สาว",
    image: require("./assets/book_image/ชาตินี้น้องขอเป็นราชินี.jpg"),
    episodes: [
      { episodeNumber: 1},
      { episodeNumber: 2},
      { episodeNumber: 3}
    ]
  },
  { 
    title: "Book 2", 
    author: "Author 2",
    category: "RomanceFantasy", 
    // episodes: [
    //   { episodeNumber: 1, image: require("./path/to/book2_episode1_image.jpg") },
    //   { episodeNumber: 2, image: require("./path/to/book2_episode2_image.jpg") },
    //   { episodeNumber: 3, image: require("./path/to/book2_episode3_image.jpg") }
    // ]
  },
  { 
    title: "Book 3", 
    author: "Author 3",
    category: "Action", 
    // episodes: [
    //   { episodeNumber: 1, image: require("./path/to/book2_episode1_image.jpg") },
    //   { episodeNumber: 2, image: require("./path/to/book2_episode2_image.jpg") },
    //   { episodeNumber: 3, image: require("./path/to/book2_episode3_image.jpg") }
    // ]
  },
];
export const sampleUsers = [
  {
    email: "test@test.com",
    password: "test",
    username: "test",
    birthdate: new Date(1990, 0, 1),
    books: [
       sampleBooks[0],
       sampleBooks[1]
    ],
  },
  {
    email: "user1@example.com",
    password: "password1",
    username: "User1",
    birthdate: new Date(1995, 5, 15),
    books: [
      { title: "Book 3", author: "Author 3" },
      { title: "Book 4", author: "Author 4" },
    ],
  },
  {
    email: "user2@example.com",
    password: "password2",
    username: "User2",
    birthdate: new Date(1987, 8, 25),
    books: [
      { title: "Book 5", author: "Author 5" },
      { title: "Book 6", author: "Author 6" },
    ],
  },
  {
    email: "user3@example.com",
    password: "password3",
    username: "User3",
    birthdate: new Date(1980, 3, 10),
    books: [
      { title: "Book 7", author: "Author 7" },
      { title: "Book 8", author: "Author 8" },
    ],
  },
];