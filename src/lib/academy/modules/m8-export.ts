import type { Module } from "../types";
import { exercise } from "../exercise";

export const m8Export: Module = {
  id: "m8-export",
  order: 8,
  pathId: "finish",
  title: "Exporting for social media",
  subtitle: "Getting it out without destroying the quality",
  lessons: [
    {
      id: "m8-l1",
      title: "Aspect ratio and safe areas",
      minutes: 5,
      summary:
        "Where the platform will cover your frame, and how to plan around it.",
      sections: [
        {
          heading: "9:16 is the master",
          paragraphs: [
            "TikTok, Reels and Shorts all want a vertical frame: 1080 pixels wide by 1920 tall. Shoot and edit in that shape. A landscape video letterboxed into a vertical frame wastes most of the screen and looks like it was made for a different era.",
            "If you also need a square or a landscape version, frame for the tightest crop while you shoot — usually the square in the middle of the vertical. Do not try to invent a second composition in the export.",
          ],
        },
        {
          heading: "The platform will sit on your picture",
          paragraphs: [
            "Usernames, captions, like buttons and progress bars cover the top 15% and the bottom 20% of a vertical frame. Faces, text and anything you need the viewer to see must sit in the middle 70%. Check this on the recording screen of the app itself, not in your editor's preview.",
          ],
        },
      ],
      keyPoints: [
        "Export 1080×1920 (9:16) for TikTok, Reels and Shorts.",
        "Keep important faces and text inside the central 70% of the frame.",
        "If you need another aspect ratio, shoot for the tightest crop, not the widest.",
      ],
      mistake:
        "Putting a name or a logo in the bottom fifth of the frame. The platform UI will cover it on every device.",
      demo: {
        silhouette: "person-full",
        framing: "wide",
        angle: "eye-level",
        movement: "static",
        thirds: true,
        subjectX: 0.5,
      },
      exercise: exercise(
        "m8-l1",
        "Map the safe area",
        4,
        [
          "Open TikTok, Reels or Shorts and go to the recording or draft preview screen.",
          "Screenshot it.",
          "Note exactly where the UI sits — handle, captions, buttons, timeline.",
          "Use that as the keep-out zone for every video you make this week.",
        ],
        [
          "You have a reference image of the real UI overlay.",
          "You can point to the central band where a face or a title must sit.",
        ],
      ),
    },
    {
      id: "m8-l2",
      title: "Export settings that survive compression",
      minutes: 6,
      summary:
        "Every platform re-encodes your video. Here is how to lose the least.",
      sections: [
        {
          heading: "Give the platform a clean file",
          paragraphs: [
            "Export H.264 MP4 at 1080×1920, matching the frame rate you shot at. Use a high bitrate — 15 to 20 megabits per second for 1080p. A small, heavily compressed export gets compressed again by the platform and falls apart.",
            "Export once from your editor and upload that file. Never AirDrop a compressed preview, re-save it from Photos, or download your own post and upload it again. Each extra generation is a loss you cannot get back.",
          ],
        },
        {
          heading: "Match the frame rate",
          paragraphs: [
            "If you shot 30 fps, export 30 fps. Exporting 24 from 30, or 30 from 24, introduces stutter that looks like a broken render. Slow-motion clips shot at 60 should be slowed on a 30 fps timeline, then exported at 30.",
          ],
        },
      ],
      keyPoints: [
        "Export H.264 MP4, 1080×1920, at the frame rate you shot.",
        "Use 15–20 Mbps for 1080p. Low bitrate dies after the platform re-encodes.",
        "Export once. Never re-save or re-upload a compressed copy.",
      ],
      mistake:
        "Exporting a tiny file 'so it uploads faster', then wondering why it looks muddy next to everyone else's.",
      exercise: exercise(
        "m8-l2",
        "High versus low bitrate",
        8,
        [
          "Take the same 10-second edit and export it twice: once at a low bitrate (around 4 Mbps) and once at 15–20 Mbps.",
          "Upload both as unlisted or draft posts, or just AirDrop them to the phone.",
          "Watch them full-screen, one after the other, paying attention to edges and dark areas.",
        ],
        [
          "The low-bitrate file shows blocks or mush in gradients and darks.",
          "The high-bitrate file holds edges and colour after a transfer or upload.",
        ],
      ),
    },
    {
      id: "m8-l3",
      title: "The final check before you post",
      minutes: 5,
      summary:
        "A 60-second review that catches almost every embarrassing mistake.",
      sections: [
        {
          heading: "Watch it the way it will be watched",
          paragraphs: [
            "Play the finished file on a phone, at low volume, preferably in daylight. That is how most people will see it. A clip that only works on a big monitor in a dark room does not work.",
            "Watch it once with the sound off. If you lose the thread, the pictures are not doing their job. Watch it once with the sound on. If you lose the thread, the track or the voice is in the way.",
          ],
        },
        {
          heading: "The first half-second and the last frame",
          paragraphs: [
            "The opening must stop a scrolling thumb. If the first half-second is a fade, a black frame, or a wide of nothing happening, the video is over before it starts. Put the strongest picture first, even if that means ignoring the shot list.",
            "The last frame should be a still you chose — a held wide, a face, a product — not whichever frame the clip happened to end on. That is the image that sits on screen if someone pauses, and the one a screenshot will capture.",
          ],
        },
      ],
      keyPoints: [
        "Watch the whole thing on a phone, at low volume, as if you did not make it.",
        "If the first half-second does not stop a thumb, nothing else matters.",
        "The last frame should be a deliberate image, not a random freeze.",
      ],
      mistake:
        "Posting from the editor's preview without ever watching the file on a phone. The first comment will be the thing you would have caught.",
      exercise: exercise(
        "m8-l3",
        "The mute test",
        5,
        [
          "Take your most recent video, or any 15-second edit you have.",
          "Watch it on your phone with the sound off.",
          "Write down the first moment you lost interest.",
          "Cut that moment out, or move the strongest shot in front of it.",
        ],
        [
          "You identified a specific moment, not a vague feeling.",
          "The recut version holds attention longer in the first 3 seconds.",
        ],
      ),
    },
  ],
};
