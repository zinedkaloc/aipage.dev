import { useState } from "react";
import Head from "next/head";

const TweetButton = () => {
  // Array of possible tweet texts
  const tweetIntents = [
    "Just used AI to craft an EPIC landing page in minutes with AIpage.dev ! 🤖 This is the future of web design! Check it out 👉 @aipagedev",
    "Creating a stunning webpage has never been easier thanks to AIpage.dev! 🚀 Give it a try 👉 @aipagedev",
    "Web design will never be the same after you try AIpage.dev! 🛠️ A whole new level of creativity unleashed! Check it out 👉 @aipagedev",
    "Revolutionize your web design process with AIpage.dev. The future is here! 👉 @aipagedev",
    "I just built an amazing webpage with AIpage.dev in minutes! 🌟 You have to try this 👉 @aipagedev",
    "AIpage.dev is a game-changer for web design! Say hello to efficiency 👋 @aipagedev",
    "Why spend hours on web design when AIpage.dev can do it in minutes? 🕒 Check it out! 👉 @aipagedev",
    "Impressed by the power of AI in web design with AIpage.dev! This is incredible 👀 @aipagedev",
    "I used AIpage.dev and it completely transformed how I approach web design. You need to try this! 🎉 @aipagedev",
    "Just when I thought web design couldn’t get any easier, I found AIpage.dev! 🎊 Try it now 👉 @aipagedev",
    "Unleashing my inner designer with the help of AIpage.dev. This is next level! 🚀 Check it out 👉 @aipagedev",
    "With AIpage.dev, I can focus on creativity while AI handles the coding. It’s amazing! 💥 @aipagedev",
  ];

  // Function to generate a random index for selecting a tweet text
  const getRandomIndex = () => {
    return Math.floor(Math.random() * tweetIntents.length);
  };

  // Initial tweet text state
  const [tweet, setTweet] = useState(tweetIntents[getRandomIndex()]);

  // Function to capture iframe content (assuming you want this function)
  const handleClick = () => {
    // Randomize the tweet text after capturing the iframe content
    setTweet(tweetIntents[getRandomIndex()]);
  };

  // Randomly select a tweet text from the tweetIntents array

  return (
    <>
      <a
        onClick={handleClick}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweet
        )}`}
        target="_blank"
        rel="noreferrer"
        className="text-2xl animate-blink"
      >
        🐦
      </a>
    </>
  );
};

export default TweetButton;
