import type { Module } from "../types";
import { exercise } from "../exercise";

export const m5Cinematic: Module = {
  id: "m5-cinematic",
  order: 5,
  pathId: "craft",
  title: "Cinematic shooting",
  subtitle: "What actually makes footage look like a film",
  lessons: [
    {
      id: "m5-l1",
      title: "Depth: foreground, subject, background",
      minutes: 6,
      summary:
        "The single compositional habit that most separates cinematic footage from flat footage.",
      sections: [
        {
          heading: "Three layers, three distances",
          paragraphs: [
            "A cinematic frame has something close to the lens, something in the middle, and something far away. The close thing can be leaves, a railing, a doorway, a shoulder, a glass. It does not have to be in focus. It has to be there.",
            "Shooting through things rather than at things is how you get this for free. Stand behind a plant. Shoot through a car window. Include the edge of a wall. The extra layer turns a flat picture into a space.",
          ],
        },
        {
          heading: "Parallax is the proof",
          paragraphs: [
            "If you move the camera even slightly, the foreground will travel faster across the frame than the background. That difference — parallax — is what the eye reads as depth. A locked-off frame with three layers still has depth. A moving frame with three layers has more.",
          ],
        },
      ],
      keyPoints: [
        "Put something close to the lens, the subject in the middle, and space behind.",
        "Shoot through things — leaves, doorways, railings, windows.",
        "A little camera movement makes the layers separate even more.",
      ],
      mistake:
        "Standing in an empty car park and filming a subject against the sky. There is nothing for the eye to travel through, so the image stays flat.",
      demo: {
        silhouette: "car",
        framing: "wide",
        angle: "eye-level",
        movement: "reveal",
        thirds: true,
        subjectX: 0.55,
      },
      exercise: exercise(
        "m5-l1",
        "Through and not through",
        6,
        [
          "Pick any subject.",
          "Film it straight on, with nothing between you and it.",
          "Film it again from a position where something — a plant, a door frame, a railing — sits close to the lens.",
          "Compare the two. The second one should feel like a place rather than a picture.",
        ],
        [
          "The second frame has a clear foreground element.",
          "The subject is still readable, not hidden.",
        ],
      ),
    },
    {
      id: "m5-l2",
      title: "Motivated movement",
      minutes: 6,
      summary:
        "Why a slow push beats a fast one, and when not to move at all.",
      sections: [
        {
          heading: "A reason, or stay still",
          paragraphs: [
            "Every camera move should do a job: follow a subject, reveal information, or build tension. A move with no job is decoration, and decoration on a beginner video almost always looks like restlessness.",
            "Slower reads as more expensive. If a move feels too slow while you are filming it, it is usually right. Fast moves are for whip-pans and energy — they are a spice, not a diet.",
          ],
        },
        {
          heading: "Stillness is a choice",
          paragraphs: [
            "A perfectly still frame is legitimate. Most beginner footage moves too much, not too little. If the subject is doing something interesting, the camera can sit and watch. That is how a lot of good films are shot.",
          ],
        },
      ],
      keyPoints: [
        "Move only to follow, reveal, or build tension. Otherwise hold still.",
        "Slower always looks more expensive than it felt while filming.",
        "A locked-off frame is a real choice, not a lack of ideas.",
      ],
      mistake:
        "Drifting the camera during a talking-head because standing still felt awkward. The drift is what the viewer will remember.",
      exercise: exercise(
        "m5-l2",
        "Three seconds versus eight",
        6,
        [
          "Film a push-in on one object that takes 3 seconds.",
          "Film the same push-in taking 8 seconds, with a still second at each end.",
          "Cut both into a timeline, or just watch them back to back. Keep the one you would actually use.",
        ],
        [
          "The 8-second move feels calmer and more deliberate.",
          "You can say what the move is for — getting closer to the object — in one sentence.",
        ],
      ),
    },
    {
      id: "m5-l3",
      title: "Coverage: shooting for the edit",
      minutes: 8,
      summary:
        "How to come home with footage that actually cuts together.",
      sections: [
        {
          heading: "Handles, sizes, ambience",
          paragraphs: [
            "Record two extra seconds at the start and end of every take. Those handles are what make a clean cut possible. A clip that starts on the action and ends on the action cannot be trimmed without a jump.",
            "Shoot more than you think you need, in different sizes, of everything that matters. And at each location, record 20 seconds of silence — just the room, the street, the wind. That ambience is the most useful audio you will capture. It hides cuts and fills holes.",
          ],
        },
        {
          heading: "A sequence, not a shot list of heroes",
          paragraphs: [
            "Think in fives: a wide, a medium, a close on the action, a detail, and a reaction. That set will cut into a scene. A single beautiful hero shot will not.",
          ],
        },
      ],
      keyPoints: [
        "Always record 2 extra seconds at the start and end of a take.",
        "Collect wide, medium and close of everything that matters.",
        "Record 20 seconds of silent ambience at each location.",
      ],
      mistake:
        "Coming home with five beautiful, unrelated clips and no two of them cut together.",
      exercise: exercise(
        "m5-l3",
        "Five shots, one action",
        10,
        [
          "Ask someone to make a drink, or do it yourself with the phone braced.",
          "Shoot five clips: a wide of the space, a medium of the person, a close-up of the hands, a detail (the pour, the kettle, the cup), and a face or reaction.",
          "Record 20 seconds of room tone after you finish.",
          "Play the five picture clips in that order. They should feel like a scene.",
        ],
        [
          "Each clip is a different size or angle.",
          "Played in order, the action is readable without any one clip doing all the work.",
        ],
      ),
    },
  ],
};
