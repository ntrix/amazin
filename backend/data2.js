import bcrypt from "bcryptjs";
const data = {
  products: [
    {
      brand: "dfXRud1AIiw",
      category: "Video",
      countInStock: 20,
      description:
        "The coming-of-age journey of five fairies attending Alfea, a magical boarding school in the Otherworld where they must learn to master their powers while navigating love, rivalries, and the monsters that threaten their very existence.",
      image:
        "https://image.tmdb.org/t/p/original/oHj6guMrLfQcBzo3uxwBJc8Y736.jpg^https://image.tmdb.org/t/p/original/pwyMoXQbqJdmpjjl23KaaQLOv6S.jpg",
      name: "Fate: The Winx Saga",
      numReviews: 557,
      price: 9,
      rating: 4.25,
    },
    {
      brand: "WNrC-vLpTGI",
      category: "Video",
      countInStock: 20,
      description:
        "When three working class kids enroll in the most exclusive school in Spain, the clash between the wealthy and the poor students leads to tragedy.",
      image:
        "https://image.tmdb.org/t/p/original//3NTAbAiao4JLzFQw6YxP1YZppM8.jpg^https://image.tmdb.org/t/p/original/1qOA3kMtQO8bjnW8M2smjA8tp10.jpg",
      name: "Elite",
      numReviews: 6039,
      price: 9,
      rating: 4.1,
    },
    {
      brand: "sWCT3SpBqrA",
      category: "Video",
      countInStock: 20,
      description:
        "Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.",
      image:
        "https://image.tmdb.org/t/p/original//sgxawbFB5Vi5OkPWQLNfl3dvkNJ.jpg^https://image.tmdb.org/t/p/original/dVHeJXUzHJJGadB2wvpuAn6fsdN.jpg",
      name: "Lupin",
      numReviews: 639,
      price: 9,
      rating: 3.95,
    },
    {
      brand: "aGcYHaFaj8s",
      category: "Video",
      countInStock: 20,
      description:
        "To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose. Five months of seclusion - memorizing every step, every detail, every probability - culminate in eleven days locked up in the National Coinage and Stamp Factory of Spain, surrounded by police forces and with dozens of hostages in their power, to find out whether their suicide wager will lead to everything or nothing.",
      image:
        "https://image.tmdb.org/t/p/original//MoEKaPFHABtA1xKoOteirGaHl1.jpg^https://image.tmdb.org/t/p/original/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg",
      name: "Money Heist",
      numReviews: 12381,
      price: 9,
      rating: 4.15,
    },
    {
      brand: "LzDhpEInMIg",
      category: "Video",
      countInStock: 20,
      description:
        "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
      image:
        "https://image.tmdb.org/t/p/original//zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg^https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg",
      name: "The Queen's Gambit",
      numReviews: 1632,
      price: 9,
      rating: 4.35,
    },
    {
      brand: "QWbMckU3AOQ",
      category: "Video",
      countInStock: 20,
      description:
        "A missing child causes four families to help each other for answers. What they could not imagine is that this mystery would be connected to innumerable other secrets of the small town.",
      image:
        "https://image.tmdb.org/t/p/original//zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg^https://image.tmdb.org/t/p/original/3jDXL4Xvj3AzDOF6UH1xeyHW8MH.jpg",
      name: "Dark",
      numReviews: 4068,
      price: 9,
      rating: 4.2,
    },
    {
      brand: "KS2EztRMuRw",
      category: "Video",
      countInStock: 20,
      description:
        "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      image:
        "https://image.tmdb.org/t/p/original//x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg^https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      name: "Stranger Things",
      numReviews: 7725,
      price: 9,
      rating: 4.3,
    },
    {
      brand: "no trailer",
      category: "Video",
      countInStock: 20,
      description:
        "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
      image:
        "https://image.tmdb.org/t/p/original//4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg^https://image.tmdb.org/t/p/original/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
      name: "Lucifer",
      numReviews: 7746,
      price: 9,
      rating: 4.25,
    },
    {
      brand: "no trailer",
      category: "Video",
      countInStock: 20,
      description:
        "This Karate Kid sequel series picks up 30 years after the events of the 1984 All Valley Karate Tournament and finds Johnny Lawrence on the hunt for redemption by reopening the infamous Cobra Kai karate dojo. This reignites his old rivalry with the successful Daniel LaRusso, who has been working to maintain the balance in his life without mentor Mr. Miyagi.",
      image:
        "https://image.tmdb.org/t/p/original//obLBdhLxheKg8Li1qO11r2SwmYO.jpg^https://image.tmdb.org/t/p/original/gL8myjGc2qrmqVosyGm5CWTir9A.jpg",
      name: "Cobra Kai",
      numReviews: 2669,
      price: 9,
      rating: 4.05,
    },
    {
      brand: "no trailer",
      category: "Video",
      countInStock: 20,
      description:
        "A dysfunctional family of superheroes comes together to solve the mystery of their father's death, the threat of the apocalypse and more.",
      image:
        "https://image.tmdb.org/t/p/original//scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg^https://image.tmdb.org/t/p/original/qJxzjUjCpTPvDHldNnlbRC4OqEh.jpg",
      name: "The Umbrella Academy",
      numReviews: 6281,
      price: 9,
      rating: 4.4,
    },
    {
      brand: "no trailer",
      category: "Video",
      countInStock: 20,
      description:
        "After realizing their babies were exchanged at birth, two women develop a plan to adjust to their new lives: creating a single —and peculiar— family.",
      image:
        "https://image.tmdb.org/t/p/original//6chvnAakKI2cYW69ODBHZHm8clb.jpg^https://image.tmdb.org/t/p/original/eAZtz2ydxBaHtJw3J42Gdy2DSpc.jpg",
      name: "Daughter From Another Mother",
      numReviews: 643,
      price: 9,
      rating: 3.75,
    },
    {
      brand: "no trailer",
      category: "Video",
      countInStock: 20,
      description:
        "Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.",
      image:
        "https://image.tmdb.org/t/p/original//sgxawbFB5Vi5OkPWQLNfl3dvkNJ.jpg^https://image.tmdb.org/t/p/original/dVHeJXUzHJJGadB2wvpuAn6fsdN.jpg",
      name: "Lupin",
      numReviews: 639,
      price: 9,
      rating: 3.95,
    },
    {
      brand: "no trailer",
      category: "Video",
      countInStock: 20,
      description:
        "As her 16th birthday nears, Sabrina must choose between the witch world of her family and the human world of her friends. Based on the Archie comic.",
      image:
        "https://image.tmdb.org/t/p/original//yxMpoHO0CXP5o9gB7IfsciilQS4.jpg^https://image.tmdb.org/t/p/original/8AdmUPTyidDebwIuakqkSt6u1II.jpg",
      name: "Chilling Adventures of Sabrina",
      numReviews: 2396,
      price: 9,
      rating: 4.2,
    },
    {
      brand: "no trailer",
      category: "Video",
      countInStock: 20,
      description:
        "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      image:
        "https://image.tmdb.org/t/p/original//x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg^https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      name: "Stranger Things",
      numReviews: 7725,
      price: 9,
      rating: 4.3,
    },
    {
      brand: "no trailer",
      category: "Video",
      countInStock: 20,
      description:
        "Love Alarm is an app that tells you if someone within a 10-meter radius has a crush on you. It quickly becomes a social phenomenon. While everyone talks about it and uses it to test their love and popularity, Jojo is one of the few people who have yet to download the app. However, she soon faces a love triangle situation between Sun-oh whom she starts to have feelings for, and Hye-young, who has had a huge crush on her.",
      image:
        "https://image.tmdb.org/t/p/original//hQ8Hobo1RpYuZVQJQOCycNMHAG.jpg^https://image.tmdb.org/t/p/original/mXouvrZbn8YpZMURGvw30QK8qfo.jpg",
      name: "Love Alarm",
      numReviews: 1002,
      price: 9,
      rating: 4.3,
    },
  ],
};
export default data;
