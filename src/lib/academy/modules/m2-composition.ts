import type { Module } from "../types";
import { exercise } from "../exercise";

export const m2Composition: Module = {
  id: "m2-composition",
  order: 2,
  pathId: "fundamentals",
  title: "Framing and composition",
  subtitle: "Where to put things inside the rectangle",
  lessons: [
    {
      id: "m2-l1",
      title: "The rule of thirds, and when to break it",
      minutes: 6,
      summary:
        "A reliable default for placing your subject, and the two cases where centring is better.",
      sections: [
        {
          heading: "Turn the grid on and use it",
          paragraphs: [
            "Every phone camera has a composition grid. Turn it on and leave it on. The four crossing points are where the eye lands first. Put your subject's eyes, or the horizon, on one of those lines rather than in the dead centre of the frame.",
            "Leave empty space in the direction the subject faces or moves. That space is what makes a frame feel composed rather than cropped. A person looking right should sit on the left third; a car driving left should sit on the right third.",
          ],
        },
        {
          heading: "When the middle is correct",
          paragraphs: [
            "Centre a subject on purpose, not by accident. Symmetry — a doorway, a corridor, a face looking straight into the lens — is stronger when it is exact. So is anyone talking directly to camera.",
            "The difference is intent. If you can say why the subject is in the middle, it will read as a choice. If they drifted there, it will read as a snapshot.",
          ],
        },
      ],
      keyPoints: [
        "Put eyes or the horizon on a third line. Leave space in the direction of look or travel.",
        "Centre only for symmetry or direct-to-camera talking.",
        "Turn the camera grid on and never turn it off.",
      ],
      mistake:
        "Centring every subject because it feels balanced in the moment. Most of those frames look flat once they sit next to a thirds composition.",
      demo: {
        silhouette: "person-full",
        framing: "wide",
        angle: "eye-level",
        movement: "static",
        thirds: true,
        subjectX: 0.35,
      },
      exercise: exercise(
        "m2-l1",
        "One subject, three positions",
        5,
        [
          "Pick any still subject — a cup, a plant, a person sitting.",
          "Film 5 seconds centred, 5 seconds on the left third, 5 seconds on the right third. Do not move the subject, only yourself.",
          "Watch all three and decide which one you would actually post.",
        ],
        [
          "The three frames are clearly different, not slight variations.",
          "You can say in one sentence why you picked the winner.",
        ],
      ),
    },
    {
      id: "m2-l2",
      title: "Shot sizes and why you need all of them",
      minutes: 7,
      summary:
        "Wide, medium, close. The three frames that let you edit anything together.",
      sections: [
        {
          heading: "Three jobs, three sizes",
          paragraphs: [
            "A wide shot shows where. A medium shot shows who or what. A close-up shows how it feels, or how it is made. You need all three of every subject you care about, because you cannot invent a missing size in the edit.",
            "Never cut between two shots of the same size of the same subject. The image jumps and the viewer notices the cut instead of the action. Change size, or change angle, every time you cut.",
          ],
        },
        {
          heading: "Collect coverage, not hero shots",
          paragraphs: [
            "Beginners film the one angle they imagined and go home. That clip cannot be shortened, lengthened or cut around a mistake. Coverage — the same action from two or three sizes — is what makes an edit possible.",
            "This is the habit that separates people who can finish a video from people who have a camera roll full of almost-usable clips.",
          ],
        },
      ],
      keyPoints: [
        "Wide shows where. Medium shows who. Close shows how it feels.",
        "Never cut between two shots of the same size. Change size or angle every cut.",
        "Collect all three sizes of everything that matters before you leave.",
      ],
      mistake:
        "Shooting only mediums. The edit has nowhere to go, and every cut looks like a jump.",
      demo: {
        silhouette: "bottle",
        framing: "medium",
        angle: "eye-level",
        movement: "static",
        thirds: false,
        subjectX: 0.5,
      },
      exercise: exercise(
        "m2-l2",
        "Coverage of one object",
        6,
        [
          "Pick any object in the room.",
          "Film a wide (the object and its surroundings), a medium (the object fills most of the frame), and a close-up (one detail fills the frame). Five seconds each.",
          "Play them in order: wide, medium, close. You now have an editable sequence.",
        ],
        [
          "The three sizes are obviously different, not three mediums.",
          "Played in order, the sequence feels like one idea, not three clips.",
        ],
      ),
    },
    {
      id: "m2-l3",
      title: "Backgrounds and headroom",
      minutes: 6,
      summary:
        "The two framing errors that make footage look amateur, and how to spot them before you record.",
      sections: [
        {
          heading: "Scan the background first",
          paragraphs: [
            "Before you press record, look at everything that is not the subject. A bin, a cable, a stranger, a bright exit sign — any of them will pull the eye off your subject for the entire clip. Move yourself, not the subject, until the background is clean.",
            "Depth helps. A subject a few metres in front of a wall looks considered. A subject standing against the same wall looks like a passport photo.",
          ],
        },
        {
          heading: "Headroom and joints",
          paragraphs: [
            "Too much space above the head makes a person look like they are sinking in the frame. Crop into the hairline on a close-up. On a wider shot, keep a hand's width of space above the head and no more.",
            "Never let the bottom of the frame cut at a joint — ankles, knees, wrists, elbows. Cut mid-shin or mid-forearm instead. A cut at a joint looks like an amputation.",
          ],
        },
      ],
      keyPoints: [
        "Clean the background before you record. Move yourself until it is quiet.",
        "Too much space above the head makes the subject sink. Crop into the hairline if you need to.",
        "Never cut the frame at a joint. Cut mid-limb.",
      ],
      mistake:
        "Framing a standing person so the bottom of the frame sits exactly on their ankles. It looks unfinished every time.",
      exercise: exercise(
        "m2-l3",
        "Clean the background without moving them",
        5,
        [
          "Ask someone to stand still, or use a chair as a stand-in.",
          "Frame them against the messiest background you can find.",
          "Without moving them, walk, crouch and turn until the background is clean. Note how far you had to move.",
          "Record the clean frame for 5 seconds.",
        ],
        [
          "Nothing in the background competes with the subject.",
          "The frame does not cut at a joint, and headroom is tight.",
        ],
      ),
    },
  ],
};
