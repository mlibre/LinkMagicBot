# LinkMagicBot 🚀

`LinkMagicBot` is a Telegram bot that makes link downloading a breeze! This bot can grab videos and files from various platforms, including YouTube and Instagram.

## Features 🌟

- Download videos from YouTube 🎥
- Download videos from Instagram 📸
- Download any other file links 📦

## How to Use 🤖

1. Start a chat with `LinkMagicBot` on Telegram.
2. Send a link you want to download using the `/d` command for videos or `/y` for YouTube videos.
3. Sit back and relax as `LinkMagicBot` does the heavy lifting for you! 🪄
4. The bot will send you the downloaded file.

## Commands 📝

- `/d [link]`: Download videos from various sources
- `/y [link]`: Download YouTube videos

## Permissions 🔐

To use the bot, make sure you're an allowed user. The bot owner can grant permissions to specific users

## Requirements 🛠️

Make sure you have the following tools installed:

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) for downloading YouTube videos
- [instaloader](https://instaloader.github.io/) for downloading Instagram videos
- [aria2c](https://aria2.github.io/) for downloading other files
- [ffmpeg](https://ffmpeg.org/) for converting videos and audio files

## Installation 🚚

Clone this repository and install the required dependencies:

```bash
git clone https://github.com/mlibre/LinkMagicBot.git
cd LinkMagicBot
npm install
```

## Configuration ⚙️

1. Set your Telegram bot token in the `process.env.TELEGRAM_BOT_TOKEN` environment variable.
2. If needed, specify allowed users in the `process.env.ALLOWED_USERS` environment variable.

You can create a `.env` file in the project directory with the following example content:

```env
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
ALLOWED_USERS=comma,separated,usernames,if,needed
YT_MAX_FILESIZE=49M
YT_SPLIT_CHAPTERS=true
```

Replace `YOUR_TELEGRAM_BOT_TOKEN_HERE` with your actual Telegram bot token. You can specify allowed users as a comma-separated list if needed.

## Running the Bot 🏃

To run the bot, execute the following command in your terminal:

```bash
node --env-file=.env bot.js
```

## Run using pm2

To run the bot using pm2 process manager, install pm2 globally:

```bash
npm install pm2 -g
pm2 startup
systemctl enable pm2-root
pm2 start bot.js --node-args="--env-file=.env"
pm2 save
pm2 logs 0
```

## Usage Examples 🚀

### Download a Video (Non-YouTube)

To download a video from a any sources, simply send the link using the `/d` command. For example:

```bash
/d https://example.com/video.mp4
```

### Download a YouTube Video

To download a YouTube video, use the `/y` command followed by the YouTube video link. For example:

```bash
/y https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE
```

## Local bot server

Local bot server is a simple way to run the bot without using the Telegram bot API.  
You can then upload files up to 2000mg

### Create a new application

Open [my.telegram](https://my.telegram.org/auth?to=apps).  

Create a new application using the following parameters:

 App title: TestApp1
 Short name: testapp1
 URL: N/A (Fill nothings here)
 Platform: Desktop
 Description: N/A (Fill nothings here)

### Install on your server

```bash
apt install cmake libssl-dev gperf ffmpeg g++ zlib1g-dev
git clone --recursive https://github.com/tdlib/telegram-bot-api.git
cd telegram-bot-api
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build . --target install
./telegram-bot-api
```

## Contributing 🤝

We welcome contributions from the community! Feel free to fork this repository, make improvements, and create pull requests.

## License 📄

This project is licensed under the MIT License.

Happy downloading! 🚀📥
