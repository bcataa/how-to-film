import type { Module } from "../types";
import { exercise } from "../exercise";

export const m4Lighting: Module = {
  id: "m4-lighting",
  order: 4,
  pathId: "craft",
  title: "Lighting",
  subtitle: "Working with the light you already have",
  lessons: [
    {
      id: "m4-l1",
      title: "Find the light before you frame the shot",
      minutes: 7,
      summary:
        "Why where you stand matters more than any camera setting.",
      sections: [
        {
          heading: "Light, then subject, then angle",
          paragraphs: [
            "Decide where the light is coming from first. Then place the subject. Then choose your camera angle. Most people do this backwards, pick a pretty background, and fight the light for the rest of the shoot.",
            "Soft light comes from large sources: an overcast sky, a big window, the open shade on the side of a building. Hard light comes from small sources: direct sun, a bare bulb. Soft light is forgiving. Hard light is dramatic and difficult.",
          ],
        },
        {
          heading: "Direction is the look",
          paragraphs: [
            "Front light flattens. It is even and safe and a little dull. Side light, roughly 45 degrees, creates a bright side and a shadow side, which is what makes a face or an object look three-dimensional. Back light creates a rim and, if you expose for the subject, atmosphere.",
            "You do not need a second light. A window on an overcast day plus a sheet of white paper bouncing into the shadow side is a complete setup.",
          ],
        },
      ],
      keyPoints: [
        "Find the light first, then place the subject, then pick the angle.",
        "Soft light is large (sky, window, shade). Hard light is small (sun, bulb).",
        "Side light creates shape. Front light flattens. Back light creates atmosphere.",
      ],
      mistake:
        "Standing the subject with their back to a bright window and exposing for the room. Their face will be a silhouette unless that is the point.",
      demo: {
        silhouette: "person-bust",
        framing: "medium",
        angle: "eye-level",
        movement: "static",
        thirds: true,
        subjectX: 0.4,
      },
      exercise: exercise(
        "m4-l1",
        "One object, three directions",
        7,
        [
          "Take one object to a window.",
          "Film it front-lit (window behind you), side-lit (window to the left or right), and back-lit (object between you and the window).",
          "Do not change anything else — same lens, same framing, same exposure lock method.",
        ],
        [
          "The three clips look like three different photographs.",
          "The side-lit version has the most shape.",
        ],
      ),
    },
    {
      id: "m4-l2",
      title: "Golden hour and why midday is hard",
      minutes: 6,
      summary:
        "The free upgrade available twice a day, and what to shoot when you have missed it.",
      sections: [
        {
          heading: "The hour that does the work for you",
          paragraphs: [
            "The hour after sunrise and the hour before sunset give you light that is low, warm, soft and directional. Almost anything looks better in it: faces, cars, food, buildings. It is the single highest-leverage free tool in filmmaking.",
            "Check the times for your location the night before. The window is shorter than it feels, and it is gone.",
          ],
        },
        {
          heading: "What to do at noon",
          paragraphs: [
            "Midday sun comes from overhead. It puts shadows under eyes, noses and chin, and it blows highlights on anything reflective. If you are stuck with it, move into open shade — under a tree, in a doorway, on the shadow side of a building. Open shade is still daylight, just without the overhead punch.",
            "Save interiors, markets, detail shots and anything in shade for the middle of the day. Save the wide beauty frames for the ends of it.",
          ],
        },
      ],
      keyPoints: [
        "The hour after sunrise and before sunset is worth more than any accessory.",
        "Midday sun is overhead and unkind. Move into open shade.",
        "Shoot interiors and details at noon. Save wides for the ends of the day.",
      ],
      mistake:
        "Planning a portrait shoot for 1pm in a car park because that is when everyone is free. The light will fight you the entire time.",
      exercise: exercise(
        "m4-l2",
        "Same frame, two times of day",
        8,
        [
          "Pick one outdoor frame you can repeat exactly — a mark on the ground, a specific tree, a doorway.",
          "Film it at midday. Note the shadows.",
          "Film the identical frame within 30 minutes of sunset. Same position, same lens, same framing.",
        ],
        [
          "The two clips are obviously shot at different times.",
          "The later clip has longer, softer shadows and warmer colour.",
        ],
      ),
    },
    {
      id: "m4-l3",
      title: "Mixed light and white balance",
      minutes: 6,
      summary:
        "Why some of your footage looks orange and some looks blue, and how to stop it.",
      sections: [
        {
          heading: "One source per shot",
          paragraphs: [
            "Daylight is blue. Household bulbs are orange. A face lit by a window on one side and a lamp on the other will be two different colours, and no filter will cleanly separate them later.",
            "Pick one. Turn the room lights off and use the window, or close the curtains and use the lamps. Mixed light is the most common reason indoor footage looks cheap.",
          ],
        },
        {
          heading: "Lock the colour if you can",
          paragraphs: [
            "iPhone's native camera has no manual white balance, so the only defence is keeping every shot under the same light source. Android Pro modes and dedicated cameras let you set Kelvin — roughly 5600 for daylight, 3200 for tungsten bulbs — and leave it there for the whole shoot.",
            "If the colour drifts between clips, the edit will feel like several different videos cut together, even when the subject is the same.",
          ],
        },
      ],
      keyPoints: [
        "Daylight is blue, bulbs are orange. Do not mix them in one frame.",
        "Turn the unused source off. One light per shot.",
        "If you have manual white balance, set it once and leave it.",
      ],
      mistake:
        "Filming a talking-head next to a window with the warm ceiling lights still on. One cheek will be orange and the other will be blue.",
      exercise: exercise(
        "m4-l3",
        "Window on, lights off",
        5,
        [
          "Sit someone, or yourself, next to a window in a room with the lights on.",
          "Film 5 seconds with the room lights on.",
          "Turn the room lights off and film the same 5 seconds.",
          "Compare the skin tone.",
        ],
        [
          "The lights-on clip has a colour mismatch on the face or in the room.",
          "The lights-off clip is one consistent colour.",
        ],
      ),
    },
  ],
};
