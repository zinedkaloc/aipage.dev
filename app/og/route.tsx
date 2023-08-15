import { ImageResponse } from "next/server";
import { useState } from "react";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
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

  // Function to generate a random tweet text
  const getRandomTweet = () => {
    return tweetIntents[getRandomIndex()];
  };

  const text = getRandomTweet();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom, #7149b6, #715dd3)",
          fontSize: 40,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: "center",
          margin: "0 75px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: "transparent",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="150"
              viewBox="0 0 200 150"
              style={{ margin: "0 75px" }}
            >
              <rect
                x="10"
                y="10"
                width="180"
                height="130"
                rx="10"
                ry="10"
                fill="#F0F0F0"
                stroke="#CCCCCC"
              />

              <rect
                x="10"
                y="10"
                width="180"
                height="30"
                rx="10"
                ry="10"
                fill="#333333"
              />

              <circle cx="25" cy="25" r="4" fill="#FF605C" />
              <circle cx="40" cy="25" r="4" fill="#FFBD44" />
              <circle cx="55" cy="25" r="4" fill="#28CA41" />

              <rect
                x="20"
                y="50"
                width="160"
                height="30"
                rx="10"
                ry="10"
                fill="#FFFFFF"
              />
              <rect
                x="25"
                y="58"
                width="120"
                rx="5"
                ry="5"
                height="14"
                fill="#F0F0F0"
              />

              <rect
                x="20"
                y="90"
                width="50"
                rx="10"
                ry="10"
                height="40"
                fill="#ddd"
              />
              <rect
                x="75"
                y="90"
                width="50"
                rx="10"
                ry="10"
                height="40"
                fill="#ddd"
              />
              <rect
                x="130"
                y="90"
                width="50"
                rx="5"
                ry="10"
                height="40"
                fill="#ddd"
              />

              <circle cx="165" cy="64" r="8" fill="#F0F0F0" />
            </svg>
          </div>

          <div
            style={{
              color: "white",
              width: "70%",
              paddingTop: "24px",
              margin: "0 75px",
              textAlign: "center",
              WebkitBackgroundClip: "text",
            }}
          >
            {text}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
