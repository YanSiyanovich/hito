const lessons = [
  {
    id: 1,
    title: "人",
    readings: [
      { number: 1, reading: "ひとり" },
      { number: 2, reading: "ふたり" },
      { number: 3, reading: "さんにん" },
      { number: 4, reading: "よにん" },
      { number: 5, reading: "ごにん" },
      { number: 6, reading: "ろくにん" },
      { number: 7, reading: "ななにん", highlight: true },
      { number: 7, reading: "しちにん" },
      { number: 8, reading: "はちにん" },
      { number: 9, reading: "きゅうにん", highlight: true },
      { number: 9, reading: "くにん" },
      { number: 10, reading: "じゅうにん" },
      { number: 11, reading: "じゅういちにん" },
      { number: 12, reading: "じゅうににん" },
      { number: 100, reading: "ひゃくにん" },
      { number: 1000, reading: "せんにん" },
      { number: 10000, reading: "いちまんにん" }
    ],
    questions: [
      { prompt: "How do you read 1人？", answer: "ひとり" },
      { prompt: "How do you read 2人？", answer: "ふたり" },
      { prompt: "How do you read 3人？", answer: "さんにん" },
      { prompt: "How do you read 4人？", answer: "よにん" },
      { prompt: "How do you read 5人？", answer: "ごにん" },
      { prompt: "How do you read 6人？", answer: "ろくにん" },
      { prompt: "How do you read 7人？", answer: "ななにん", alternateAnswers: ["しちにん"] },
      { prompt: "How do you read 8人？", answer: "はちにん" },
      { prompt: "How do you read 9人？", answer: "きゅうにん", alternateAnswers: ["くにん"] },
      { prompt: "How do you read 10人？", answer: "じゅうにん" },
      { prompt: "How do you read 11人？", answer: "じゅういちにん" },
      { prompt: "How do you read 12人？", answer: "じゅうににん" },
      { prompt: "How do you read 100人？", answer: "ひゃくにん" },
      { prompt: "How do you read 1000人？", answer: "せんにん" },
      { prompt: "How do you read 10000人？", answer: "いちまんにん" }
    ]
  }
];

const lesson = lessons[0];
window.lesson = lesson;