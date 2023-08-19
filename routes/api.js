const express = require("express");
const router = express.Router();
const fs = require("fs");
const cp = require("child_process");
const ytdl = require("ytdl-core");

router.get("/download", async (req, res) => {
  const { url } = req.query;

  try {
    // Get the video info to extract the title
    const videoInfo = await ytdl.getInfo(url);
    const videoTitle = videoInfo.videoDetails.title;

    const audio = ytdl(url, { quality: "highestaudio" });
    const video = ytdl(url, { quality: "highestvideo" });

    const audioStream = audio.pipe(fs.createWriteStream("audio.aac"));
    const videoStream = video.pipe(fs.createWriteStream("video.mp4"));

    await Promise.all([
      new Promise((resolve) => audioStream.on("finish", resolve)),
      new Promise((resolve) => videoStream.on("finish", resolve)),
    ]);

    const mergedFilePath = `${videoTitle}.mp4`;

    const ffmpegPath = require("ffmpeg-static");
    const ffmpegProcess = cp.spawn(ffmpegPath, [
      "-i",
      "audio.aac",
      "-i",
      "video.mp4",
      "-c:v",
      "copy",
      mergedFilePath,
    ]);

    await new Promise((resolve, reject) => {
      ffmpegProcess.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`ffmpeg process exited with code ${code}`));
        }
      });
    });

    // Move the merged file to a "videos" folder
    const videosFolderPath = "videos";
    if (!fs.existsSync(videosFolderPath)) {
      fs.mkdirSync(videosFolderPath);
    }

    const newFilePath = `${videosFolderPath}/${mergedFilePath}`;
    fs.renameSync(mergedFilePath, newFilePath);

    // Generate the download link
    const downloadUrl = `/download/${encodeURIComponent(newFilePath)}`;

    // Clean up temporary files
    fs.unlinkSync("audio.aac");
    fs.unlinkSync("video.mp4");

    res.status(200).json({ downloadUrl });
  } catch (error) {
    console.error("Error downloading or processing video:", error);
    try {
      fs.unlinkSync("audio.aac");
      fs.unlinkSync("video.mp4");
      fs.unlinkSync(mergedFilePath);
    } catch (error) {}
    res
      .status(500)
      .json({ error: "An error occurred while processing the video." });
  }
});

// Export the router
module.exports = router;
