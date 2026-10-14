/**
 * Daily filmmaking challenge.
 *
 * Deliberately deterministic rather than random: the challenge is derived from
 * the date, so every user gets the same one on the same day and refreshing the
 * page does not reroll it.
 */

export interface Challenge {
  id: string;
  title: string;
  brief: string;
  minutes: number;
  skill: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "c-thirds",
    title: "One subject, three positions",
    brief:
      "Film the same subject centred, on the left third and on the right third. Five seconds each. Decide which one you would post, and why.",
    minutes: 5,
    skill: "Composition",
  },
  {
    id: "c-coverage",
    title: "Wide, medium, close",
    brief:
      "Pick any object within reach. Shoot a wide, a medium and a close-up of it. You now have a sequence that can actually be cut together.",
    minutes: 6,
    skill: "Coverage",
  },
  {
    id: "c-exposure",
    title: "Lock the exposure",
    brief:
      "Film a 10-second walk towards a bright window with auto exposure, then again with exposure locked. Watch both back.",
    minutes: 4,
    skill: "Camera control",
  },
  {
    id: "c-slow-push",
    title: "The eight-second push",
    brief:
      "Push the camera slowly towards one subject over eight full seconds. Hold still for two seconds at each end.",
    minutes: 5,
    skill: "Movement",
  },
  {
    id: "c-foreground",
    title: "Shoot through something",
    brief:
      "Film one subject straight on, then film it again through a foreground object — leaves, a doorway, a railing. Compare the depth.",
    minutes: 6,
    skill: "Cinematic depth",
  },
  {
    id: "c-backlight",
    title: "Turn the light around",
    brief:
      "Film an object front-lit, then side-lit, then back-lit, without changing anything else. Three different shots from one setup.",
    minutes: 7,
    skill: "Lighting",
  },
  {
    id: "c-handheld",
    title: "Brace and breathe",
    brief:
      "Record ten seconds handheld as you normally would, then ten seconds with elbows locked to your ribs and your back against a wall.",
    minutes: 4,
    skill: "Stability",
  },
  {
    id: "c-match-cut",
    title: "Hide a cut",
    brief:
      "Film someone opening a door from a wide frame, then from a close frame on the handle. Cut between them mid-pull.",
    minutes: 8,
    skill: "Editing",
  },
  {
    id: "c-texture",
    title: "Fill the frame with texture",
    brief:
      "Get as close as your phone will focus and fill the entire frame with surface. Find three different textures around you.",
    minutes: 5,
    skill: "Detail work",
  },
  {
    id: "c-golden",
    title: "Same shot, two lights",
    brief:
      "Film one shot at midday and the identical shot within half an hour of sunset. Keep framing and subject the same.",
    minutes: 6,
    skill: "Lighting",
  },
  {
    id: "c-ambience",
    title: "Record the room",
    brief:
      "Record twenty seconds of pure ambience where you are, with nothing happening. It is the most useful audio you will capture this week.",
    minutes: 3,
    skill: "Sound",
  },
  {
    id: "c-first-half-second",
    title: "Build a hook",
    brief:
      "Shoot one clip designed to stop a scrolling thumb in half a second. Movement, contrast or an unexpected frame. Nothing else.",
    minutes: 6,
    skill: "Social craft",
  },
  {
    id: "c-no-move",
    title: "Completely still",
    brief:
      "Shoot a five-shot sequence where the camera never moves once. Make it interesting using framing alone.",
    minutes: 8,
    skill: "Discipline",
  },
  {
    id: "c-lens",
    title: "Three lenses, one face",
    brief:
      "Film the same face at 0.5x, 1x and 2x, moving so they fill the same amount of frame each time. Note the distortion.",
    minutes: 5,
    skill: "Camera control",
  },
];

/** Deterministic pick based on the calendar day. */
export function challengeForDate(date = new Date()): Challenge {
  const dayNumber = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
  const index = ((dayNumber % CHALLENGES.length) + CHALLENGES.length) % CHALLENGES.length;
  return CHALLENGES[index] ?? CHALLENGES[0]!;
}
