import type { Module } from "../types";
import { exercise } from "../exercise";

export const m6Editing: Module = {
  id: "m6-editing",
  order: 6,
  pathId: "finish",
  title: "Editing fundamentals",
  subtitle: "Turning clips into something worth watching",
  lessons: [
    {
      id: "m6-l1",
      title: "Assemble first, trim second",
      minutes: 7,
      summary:
        "The workflow that stops you getting stuck on the first 3 seconds forever.",
      sections: [
        {
          heading: "Ugly and long, once",
          paragraphs: [
            "Drop every clip onto the timeline in the order you shot them, or the order of the plan, before you trim anything. Watch it once. It will be too long and it will be ugly. That pass tells you what the video actually is, which you cannot know from a folder of files.",
            "Then make one trim pass. For each clip, find the strongest moment and cut half a second before and after it. The first and last second of a handheld take is almost always the shakiest — those ends go first.",
          ],
        },
        {
          heading: "Polish is last",
          paragraphs: [
            "Transitions, text, colour and music come after the structure works. Decorating a sequence that has no shape wastes time you will spend undoing. If a clip does not earn its place in the ugly assembly, delete it rather than dressing it up.",
          ],
        },
      ],
      keyPoints: [
        "Lay every clip down in order and watch once before you trim.",
        "Trim each clip to its strongest moment. Cut heads and tails hard.",
        "Do not touch transitions, text or colour until the structure works.",
      ],
      mistake:
        "Spending twenty minutes colour-grading the opening shot, then deleting it because the video did not need it.",
      exercise: exercise(
        "m6-l1",
        "Six clips, one pass",
        10,
        [
          "Pick any six clips on your phone.",
          "Put them on a timeline in order. Watch once without stopping.",
          "Trim each clip to about 2 seconds. Do not reorder.",
          "Watch again. Notice which clips you no longer miss.",
        ],
        [
          "The second watch is shorter and clearer than the first.",
          "At least one clip was doing nothing and is now gone or tiny.",
        ],
      ),
    },
    {
      id: "m6-l2",
      title: "Cut on movement",
      minutes: 6,
      summary:
        "The simplest way to make cuts invisible without using a transition.",
      sections: [
        {
          heading: "The eye follows motion, not the cut",
          paragraphs: [
            "If something is moving in the same direction in both clips, cut while it is moving. The eye tracks the motion across the join and does not notice the edit. This is why a person reaching for a door, cut to a close-up of the handle mid-reach, feels continuous.",
            "Cut on the action, not before or after it. Mid-step, mid-turn, mid-pour. A cut between two static frames of the same size is the one everyone sees.",
          ],
        },
        {
          heading: "Change size or angle",
          paragraphs: [
            "Never cut between two identical shot sizes of the same subject. If both clips are mediums of the same person, the join is a jump cut unless you are using jump cuts on purpose. Change to a close-up, a wide, or a different angle.",
          ],
        },
      ],
      keyPoints: [
        "Cut while something is moving in the same direction in both clips.",
        "Cut mid-action, not before or after it.",
        "Never cut between two shots of the same size of the same subject.",
      ],
      mistake:
        "Cutting from a static wide of a closed door to a static close-up of the same closed door. Nothing is moving, so the cut is all you see.",
      exercise: exercise(
        "m6-l2",
        "The door cut",
        8,
        [
          "Film someone opening a door from a wide frame, start to finish.",
          "Film the same action from a close frame on the handle.",
          "Cut from the wide to the close in the middle of the pull.",
          "If you do not have an editor yet, watch the two clips and mark the frame where you would cut each one.",
        ],
        [
          "The action continues across the join.",
          "The two frames are different sizes.",
        ],
      ),
    },
    {
      id: "m6-l3",
      title: "Text that does not look like a template",
      minutes: 5,
      summary:
        "Restraint rules for on-screen text in short video.",
      sections: [
        {
          heading: "One font, two sizes",
          paragraphs: [
            "Pick one typeface and two sizes — a title and a line of body. A third size, a second font, or a coloured box behind every word is how a video starts looking like a default template. If you cannot decide, use the system font and make it smaller than you think.",
            "Put the text in the empty part of the frame you left when you composed the shot. If there is no empty part, the shot was not composed for text and you should either recut or skip the caption.",
          ],
        },
        {
          heading: "Stay inside the safe area",
          paragraphs: [
            "On TikTok, Reels and Shorts the top 15% and the bottom 20% of the frame get covered by captions, handles and buttons. Keep every word inside the middle 70%. If a line has to sit lower to look balanced, it will be unreadable on the platform.",
          ],
        },
      ],
      keyPoints: [
        "One font, two sizes, maximum.",
        "Place text in the empty part of the frame you left for it.",
        "Keep everything important inside the central 70% of a vertical frame.",
      ],
      mistake:
        "A title, a subtitle, a sticker, a username and a caption all on screen at once. None of them get read.",
      exercise: exercise(
        "m6-l3",
        "One line, then stop",
        6,
        [
          "Take any existing clip with some empty space in the frame.",
          "Add one short line of text in that space, inside the central 70%.",
          "Delete every other text element you were tempted to add.",
          "Watch it on a phone. If you can read the line in one glance, it is done.",
        ],
        [
          "There is one line of text, not a stack.",
          "The line does not sit under a username, button or caption area.",
        ],
      ),
    },
  ],
};
