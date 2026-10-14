import type { Module } from "../types";
import { exercise } from "../exercise";

export const m3Movement: Module = {
  id: "m3-movement",
  order: 3,
  pathId: "fundamentals",
  title: "Camera movements",
  subtitle: "Moving the camera without ruining the shot",
  lessons: [
    {
      id: "m3-l1",
      title: "How to hold a phone still",
      minutes: 5,
      summary:
        "Body mechanics that beat any stabiliser you could buy today.",
      sections: [
        {
          heading: "Your body is the tripod",
          paragraphs: [
            "Hold the phone with both hands and press your elbows into your ribs. Your torso becomes a single rigid unit. One-handed filming is why so much phone footage looks nervous.",
            "Whenever a wall, railing, doorframe or car is within reach, lean against it. Contact with something solid removes more shake than any setting in the camera app.",
          ],
        },
        {
          heading: "Breathe out, then roll",
          paragraphs: [
            "Shake rises as you inhale. Breathe out, hold, then press record. Hold the breath for the length of a short take — five or six seconds is comfortable for most people.",
            "Turn the phone's built-in stabilisation on and leave it on. It will not save a one-handed walk, but it will clean up a braced static shot.",
          ],
        },
      ],
      keyPoints: [
        "Both hands on the phone, elbows pressed into your ribs.",
        "Brace against a wall, railing or doorframe whenever one is in reach.",
        "Breathe out and hold at the start of the take.",
      ],
      mistake:
        "Holding the phone at arm's length with one hand, then wondering why every clip is unusable past two seconds.",
      exercise: exercise(
        "m3-l1",
        "The brace comparison",
        4,
        [
          "Record 10 seconds of a still object, holding the phone the way you normally would.",
          "Record the same 10 seconds with both hands, elbows locked in, back against a wall.",
          "Watch both at 200% zoom on the edges of the frame.",
        ],
        [
          "The braced clip is visibly steadier at the frame edges.",
          "You can feel the difference in your arms while recording it.",
        ],
      ),
    },
    {
      id: "m3-l2",
      title: "Push in, pull out, pan and tilt",
      minutes: 7,
      summary:
        "The four basic moves, what each one says, and how slow they need to be.",
      sections: [
        {
          heading: "What each move means",
          paragraphs: [
            "A push-in builds attention. Use it when you want the viewer to look harder at something. A pull-out releases attention and is a natural way to end a sequence. A pan looks left or right; a tilt looks up or down. That is the whole vocabulary you need for most videos.",
            "Pans and tilts come from the waist and the knees, never the wrists. Plant your feet, unlock your hips, and rotate the whole upper body as one piece.",
          ],
        },
        {
          heading: "Handles at both ends",
          paragraphs: [
            "Every move needs a still second at the start and a still second at the end. Without those handles you cannot cut into or out of the shot cleanly. If a move feels too slow while you are filming it, it is probably the right speed.",
            "Count it out loud: two still, four moving, two still. That eight-second take will trim into a usable four-second clip.",
          ],
        },
      ],
      keyPoints: [
        "Push in builds attention. Pull out ends a sequence. Pan and tilt look around.",
        "Move from the waist and knees, never the wrists.",
        "Hold still for a second at both ends of every move.",
      ],
      mistake:
        "Starting the recording in the middle of a move and stopping the instant you arrive. The clip has no handles and cannot be cut.",
      demo: {
        silhouette: "object",
        framing: "medium",
        angle: "eye-level",
        movement: "push-in",
        thirds: false,
        subjectX: 0.5,
      },
      exercise: exercise(
        "m3-l2",
        "The eight-second push",
        6,
        [
          "Pick one still object.",
          "Hold still for 2 seconds, push in evenly for 4, hold still for 2. Count out loud.",
          "Do it three times. Keep the take where the move is the most even.",
        ],
        [
          "The clip has a still start, a smooth move, and a still end.",
          "The speed does not change halfway through.",
        ],
      ),
    },
    {
      id: "m3-l3",
      title: "Walking without bouncing",
      minutes: 6,
      summary:
        "How to make a handheld tracking shot usable without a gimbal.",
      sections: [
        {
          heading: "Your legs are the suspension",
          paragraphs: [
            "Bend your knees more than feels natural and roll from heel to toe. The bounce you see on screen is almost always vertical, and soft knees are what absorb it. Walk slower than the subject's natural pace — you can always speed a clip up slightly in the edit, but you cannot remove a bounce.",
            "Hold the phone with both hands at chest height, elbows in. Looking only at the screen is how people walk into things. Glance at the path, then back at the frame.",
          ],
        },
        {
          heading: "Give yourself room to stabilise",
          paragraphs: [
            "Frame wider than you need. Stabilisation — in-camera or in the edit — works by cropping, and a tight frame has nowhere to crop into. A slightly wide tracking shot that is steady beats a tight one that weaves.",
          ],
        },
      ],
      keyPoints: [
        "Soft knees, heel-to-toe, slower than feels natural.",
        "Both hands, chest height, glance at the path as well as the screen.",
        "Frame wider than you need so stabilisation has room to crop.",
      ],
      mistake:
        "Walking at a normal pace on locked knees while staring at the screen. The result is a first-person video game, not a tracking shot.",
      demo: {
        silhouette: "person-full",
        framing: "medium",
        angle: "eye-level",
        movement: "tracking",
        thirds: true,
        subjectX: 0.45,
      },
      exercise: exercise(
        "m3-l3",
        "Ten steps, twice",
        5,
        [
          "Pick a doorway or the end of a corridor as a destination.",
          "Walk ten steps towards it filming the way you normally walk.",
          "Walk the same ten steps with soft knees and a heel-to-toe roll, slower than before.",
          "Compare the two. The second one should be usable.",
        ],
        [
          "The second clip has less vertical bounce.",
          "The destination stays in a consistent part of the frame.",
        ],
      ),
    },
  ],
};
