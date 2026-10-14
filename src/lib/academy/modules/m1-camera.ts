import type { Module } from "../types";
import { exercise } from "../exercise";

export const m1Camera: Module = {
  id: "m1-camera",
  order: 1,
  pathId: "fundamentals",
  title: "Smartphone camera fundamentals",
  subtitle: "Stop fighting your phone and start directing it",
  lessons: [
    {
      id: "m1-l1",
      title: "Lock exposure and focus",
      minutes: 6,
      summary:
        "Why your footage shifts brightness mid-shot, and the one gesture that stops it.",
      sections: [
        {
          heading: "Your phone is guessing, constantly",
          paragraphs: [
            "A phone camera is built to take still photos of anything, anywhere. The moment you start recording video it keeps doing that job: re-reading the scene, adjusting brightness, hunting for a new focus point. That is useful for a snapshot. On a clip it looks like a mistake.",
            "Every time something brighter enters the frame — a window, a white shirt, a passing car — the phone brightens or darkens to compensate. Every time something closer to the lens moves, it refocuses. You see this as a slow fade or a brief blur. Both are unusable in an edit.",
          ],
        },
        {
          heading: "The lock gesture",
          paragraphs: [
            "On iPhone, press and hold on your subject until the yellow box says AE/AF LOCK. Then slide a finger up or down to set brightness. On most Android cameras, tap and hold until a padlock or AF-L icon appears, then drag the sun slider.",
            "Do this before you press record, not after. The lock is released the instant you tap anywhere else on the screen, so treat it as part of setting the shot, the same way you would set a tripod.",
          ],
        },
      ],
      keyPoints: [
        "Auto exposure and autofocus keep changing mid-shot. That is the default, and it is wrong for video.",
        "Press and hold on the subject until the lock indicator appears, then set brightness with a slide.",
        "Lock before every take. A tap anywhere else clears it.",
      ],
      mistake:
        "Walking towards a window with auto exposure still on. The clip will darken as you approach and there is nothing you can do about it later.",
      demo: {
        silhouette: "landscape",
        framing: "wide",
        angle: "eye-level",
        movement: "push-in",
        thirds: true,
        subjectX: 0.5,
      },
      exercise: exercise(
        "m1-l1",
        "Window walk comparison",
        5,
        [
          "Find a bright window and stand about four metres back from it.",
          "Record 10 seconds walking towards it with the camera on full auto. Do not tap anything.",
          "Walk back, press and hold on the window until the lock appears, drop the brightness a little, then record the same 10-second walk.",
          "Watch both clips back-to-back on the phone.",
        ],
        [
          "The auto clip changes brightness as you approach.",
          "The locked clip stays the same brightness from start to finish.",
        ],
      ),
    },
    {
      id: "m1-l2",
      title: "Resolution and frame rate, decided once",
      minutes: 7,
      summary:
        "What to set in your camera settings today so you never think about it again.",
      sections: [
        {
          heading: "Pick a format and leave it alone",
          paragraphs: [
            "Resolution is how many pixels you capture. Frame rate is how many of those pictures you capture each second. Mixing either of them inside one video is the fastest way to make an edit stutter.",
            "For TikTok, Reels and Shorts, set the camera to 4K at 30 frames per second. If storage is tight, 1080p at 30 fps is fine — the platforms will compress it either way. For a more film-like look, use 24 fps and stay on it for the whole project.",
          ],
        },
        {
          heading: "When 60 fps is actually useful",
          paragraphs: [
            "60 frames per second exists so you can play the clip back at half speed on a 30 fps timeline and still have a picture every frame. That is the only good reason to use it. Footage shot at 60 and played at 60 looks like a soap opera or a sports broadcast.",
            "Decide the format before you leave the house. Write it down if you have to. Coming home with a mix of 24, 30 and 60 fps clips means choosing which ones to throw away.",
          ],
        },
      ],
      keyPoints: [
        "Shoot 4K/30 for social, or 24 fps if you want a film look. Pick one per project.",
        "Only shoot 60 fps for shots you intend to slow down.",
        "Never mix frame rates in one video. The stutter cannot be fixed in the edit.",
      ],
      mistake:
        "Leaving the camera on whatever it was last set to, then discovering half the clips are 60 fps and will not cut cleanly with the rest.",
      exercise: exercise(
        "m1-l2",
        "Set it and prove it",
        4,
        [
          "Open the camera settings and set video to 4K at 30 fps, or 1080p at 30 if storage is tight.",
          "Record a 5-second clip of anything still.",
          "Open the file info and confirm the frame rate matches what you set.",
          "Leave the setting there. Do not change it for the next project.",
        ],
        [
          "The camera is now on a single, known format.",
          "The test file plays back smoothly with no conversion warning.",
        ],
      ),
    },
    {
      id: "m1-l3",
      title: "Which lens to actually use",
      minutes: 6,
      summary:
        "Why the ultra-wide ruins faces and when the telephoto is worth it.",
      sections: [
        {
          heading: "1x is the real camera",
          paragraphs: [
            "The 1x lens sits over the best sensor on the phone. It is the sharpest, the cleanest in low light, and the most natural perspective. Treat it as the default the same way a photographer treats a 35mm or 50mm lens.",
            "2x or 3x is the portrait lens. Step back and zoom in for faces and small details. Longer lenses flatten features and throw the background out of focus, both of which flatter a person.",
          ],
        },
        {
          heading: "The ultra-wide tax",
          paragraphs: [
            "0.5x exists for landscapes, interiors and tight spaces where you physically cannot step back. It stretches anything near the edge of the frame. A face at the edge of an ultra-wide shot looks wider and shorter than it is. That is not a style — it is distortion.",
            "If you want a wide shot of a person, step back on 1x instead of switching to 0.5x. You will keep their proportions and still see the room.",
          ],
        },
      ],
      keyPoints: [
        "1x is the default. It is the best sensor and the most honest perspective.",
        "2x or 3x for faces and detail. Step back rather than pushing the lens in.",
        "0.5x ultra-wide distorts anything near the frame edge. Landscapes and tight interiors only.",
      ],
      mistake:
        "Filming a talking-head on 0.5x because it 'gets more in'. The face will look wrong and there is no lens correction that fixes it after the fact.",
      demo: {
        silhouette: "person-bust",
        framing: "close-up",
        angle: "eye-level",
        movement: "static",
        thirds: true,
        subjectX: 0.45,
      },
      exercise: exercise(
        "m1-l3",
        "Three lenses, one face",
        6,
        [
          "Ask someone to sit still, or use your own face in a mirror.",
          "Film them filling the same amount of frame at 0.5x, 1x and 2x. Move your feet so the framing matches — do not crop later.",
          "Watch the three clips back to back, paying attention to the shape of the face and the background.",
        ],
        [
          "The 0.5x face looks stretched compared with the others.",
          "The 2x face looks more natural, with a calmer background.",
        ],
      ),
    },
  ],
};
