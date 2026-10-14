import type { Path } from "./types";

export const PATHS: Path[] = [
  {
    id: "fundamentals",
    order: 1,
    title: "Phone first",
    subtitle: "Control the camera, compose the frame, move on purpose",
    description:
      "The three habits that make every later video easier: lock the camera down, place the subject, and only move when there is a reason. Finish with a 15-second coverage sequence of one object.",
    moduleIds: ["m1-camera", "m2-composition", "m3-movement"],
    finalProject: {
      id: "fp-fundamentals",
      title: "One object, five shots, 15 seconds",
      brief:
        "Pick any object within reach. Shoot a wide, a medium, a close-up, a detail, and one motivated move. Cut them into a 15-second sequence. No music required — pictures only.",
      minutes: 25,
      suggestedBrief: {
        subject: "product",
        style: "cinematic",
        durationSec: 15,
        experience: "first-time",
        stabilization: "handheld",
      },
      requirements: [
        "At least three different shot sizes",
        "Exposure and focus locked on every take",
        "One motivated camera move with still handles at both ends",
        "A clean background in every frame",
        "The finished sequence is 15 seconds or under",
      ],
      reviewQuestions: [
        "Which shot could you delete without the sequence falling apart?",
        "Does the move have a reason, or could it have been still?",
        "If you mute it, can you still tell what the object is by the third shot?",
      ],
    },
  },
  {
    id: "craft",
    order: 2,
    title: "The look",
    subtitle: "Light, depth and footage that cuts like a scene",
    description:
      "Once the camera is under control, the next leap is light and depth. This path is about making footage feel like a place, then coming home with coverage that actually edits. Finish with a 30-second cinematic piece.",
    moduleIds: ["m4-lighting", "m5-cinematic"],
    finalProject: {
      id: "fp-craft",
      title: "A 30-second cinematic piece",
      brief:
        "Choose a subject you care about — a person, a place, a car, a meal. Shoot it like a short film: side or back light, a foreground in at least two frames, and enough coverage to cut wide–tight–wide. Target 30 seconds.",
      minutes: 45,
      suggestedBrief: {
        subject: "person",
        style: "cinematic",
        durationSec: 30,
        experience: "some-practice",
        stabilization: "handheld",
      },
      requirements: [
        "Light direction is consistent across the piece",
        "At least two shots have a foreground layer",
        "Coverage includes wide, medium and close",
        "One shot is completely still on purpose",
        "20 seconds of ambience recorded at the location",
      ],
      reviewQuestions: [
        "Where is the light coming from in the first shot, and does the last shot match it?",
        "Which frame has the most depth, and what is in the foreground?",
        "If you dropped the music, would the pictures still feel like one place?",
      ],
    },
  },
  {
    id: "finish",
    order: 3,
    title: "Cut and ship",
    subtitle: "Edit, pace, and get it onto a phone screen in one piece",
    description:
      "Shooting is half the job. This path is the other half: assembling before you decorate, cutting to a track you have the rights to, and exporting a file that survives the platform. Finish by recutting something you have already shot.",
    moduleIds: ["m6-editing", "m7-music", "m8-export"],
    finalProject: {
      id: "fp-finish",
      title: "Recut for a scrolling thumb",
      brief:
        "Take footage you have already shot — a Ready to Go project, or any six clips on your phone. Cut a 15 or 30-second vertical edit: track first, pictures second, one line of text, export at 1080×1920. Then watch it on a phone with the sound off.",
      minutes: 40,
      suggestedBrief: {
        subject: "custom",
        customSubject: "A recut of footage I already have",
        style: "social",
        durationSec: 15,
        experience: "some-practice",
        stabilization: "handheld",
      },
      requirements: [
        "The track went on the timeline before the pictures were trimmed",
        "Most cuts sit on a downbeat",
        "At most one non-cut transition, or none",
        "One line of text, inside the central 70% of the frame",
        "Exported 1080×1920 at the frame rate you shot, then watched on a phone",
      ],
      reviewQuestions: [
        "Does the first half-second stop you if you did not make it?",
        "What is the last frame, and did you choose it?",
        "Watched muted: where do you lose interest, and did you cut that bit?",
      ],
    },
  },
];
