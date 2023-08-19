# TubePirate: Youtube Downloader API

![Imgur](https://i.imgur.com/mvUep0h.png)

## Description

TubePirate is your ultimate solution for hassle-free video downloads from YouTube. With our powerful API built on top of NodeJS, you can seamlessly integrate video downloading functionality into your applications, making it easier than ever to get your favorite content.

## Features

- **Effortless Video Downloads:** TubePirate empowers you to effortlessly download videos from YouTube without any hassle. Simply provide the video URL, and let TubePirate handle the rest.

- **High-Quality Downloads:** Enjoy your downloaded videos in the best quality available. TubePirate ensures that you get the highest resolution possible for the videos you love.

- **Seamless Integration:** Our API is built using NodeJS, making it incredibly easy to integrate into your existing applications or services. Get up and running in no time!

## API Endpoints

### 1. Download Video

Easily initiate the video download process with this endpoint.

- **URL:** `/download`

- **Method:** `GET`

#### Parameters

| Name | Type   | Description                                     |
| ---- | ------ | ----------------------------------------------- |
| url  | string | **Required**. The URL of the video to download. |

#### Example

```bash
GET /download?url=https://www.youtube.com/watch?v=example_video_id
```