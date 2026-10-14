import type { Module } from "../types";
import { exercise } from "../exercise";

export const m7Music: Module = {
  id: "m7-music",
  order: 7,
  pathId: "finish",
  title: "Music, pacing and transitions",
  subtitle: "Why the right track does half the editing for you",
  lessons: [
    {
      id: "m7-l1",
      title: "Choose the track before you cut",
      minutes: 6,
      summary:
        "Music determines pacing, so picking it last means recutting everything.",
      sections: [
        {
          heading: "The track is the metronome",
          paragraphs: [
            "Drop the music on the timeline first, then cut the pictures to it. A slow drone under fast cuts fights itself; a fast track under long held frames feels like the edit is late. You cannot know the right clip length until you know the beat.",
            "Match the energy. Atmospheric footage wants a track that builds. A product or fashion video wants something with a clear pulse in the first second.",
          ],
        },
        {
          heading: "Use music you have the right to use",
          paragraphs: [
            "The music libraries inside TikTok, Reels and YouTube exist so the platform does not mute you. A commercial song pulled from a streaming app will get muted or taken down, often after the video has already started circulating.",
            "If you want a specific mood and the in-app library does not have it, use a royalty-free source you can actually licence. Do not guess.",
          ],
        },
      ],
      keyPoints: [
        "Put the track on the timeline first, then cut to it.",
        "Match the energy of the music to the footage.",
        "Use the platform library or a track you have the rights to. Commercial releases get muted.",
      ],
      mistake:
        "Finishing a picture cut, then dropping a song on top and wondering why none of the cuts land.",
      exercise: exercise(
        "m7-l1",
        "One edit, two tracks",
        8,
        [
          "Take any 15-second picture sequence you already have.",
          "Play it under a slow, quiet track.",
          "Play the same pictures under a fast, rhythmic track.",
          "Notice that it feels like two different videos. That is the point.",
        ],
        [
          "The two versions feel different in pace, not just in mood.",
          "You can say which track the pictures were actually cut for — or that they were cut for neither.",
        ],
      ),
    },
    {
      id: "m7-l2",
      title: "Cut on the beat",
      minutes: 6,
      summary:
        "The mechanical trick behind almost every edit that feels professional.",
      sections: [
        {
          heading: "Find the downbeats, then place the cuts",
          paragraphs: [
            "Most editing apps let you tap to mark beats. Do that for the first 20 seconds of the track, then put a cut on each mark. The pictures will suddenly feel like they belong to the music, even if they were shot without hearing it.",
            "Save your strongest shot for the biggest moment in the track — a drop, a lift, a vocal entry. Build the rest of the edit around that landing.",
          ],
        },
        {
          heading: "Miss once, on purpose",
          paragraphs: [
            "An edit that hits every single beat can feel mechanical. Miss the beat once, usually at the end, so the last image sits a fraction late or holds past the last hit. That one miss is what makes the rest feel human.",
          ],
        },
      ],
      keyPoints: [
        "Mark the downbeats, then put cuts on them.",
        "Land your best shot on the biggest moment in the track.",
        "Miss the beat once at the end so the edit does not feel like a metronome.",
      ],
      mistake:
        "Spacing cuts evenly by the clock — every 1.5 seconds — instead of to the music. Even spacing feels like a slideshow.",
      exercise: exercise(
        "m7-l2",
        "Fifteen seconds on the grid",
        8,
        [
          "Pick a track with a clear beat and mark the downbeats for 15 seconds.",
          "Place a different clip on each mark. Trim so each cut sits on a beat.",
          "Watch once. Then hold the last shot past the final hit by half a second.",
        ],
        [
          "Every cut except the last one sits on a beat.",
          "The last shot is allowed to hang, and it feels like an ending.",
        ],
      ),
    },
    {
      id: "m7-l3",
      title: "Transitions: use almost none",
      minutes: 5,
      summary:
        "Why straight cuts dominate professional work and what the exceptions are.",
      sections: [
        {
          heading: "The cut is the transition",
          paragraphs: [
            "A straight cut should be 90% or more of the joins in a short video. Effects draw attention to the editing. In a 30-second piece that is almost never what you want the viewer to be looking at.",
            "The best transitions are shot in camera: a hand passing the lens, a wall wiping past, a door closing across the frame. You cut in the middle of that wipe and the join disappears.",
          ],
        },
        {
          heading: "One deliberate exception",
          paragraphs: [
            "Give yourself one non-cut transition per video, at the biggest change of place or time. A fade, a whip, a zoom punch — one. If you cannot decide where it goes, you do not need it.",
          ],
        },
      ],
      keyPoints: [
        "Straight cuts should be most of the edit. Effects are a spice.",
        "The best transitions are shot in camera and cut mid-wipe.",
        "Allow one deliberate non-cut transition per video, or none.",
      ],
      mistake:
        "A different transition on every cut because the editor offered them. The video becomes a tour of the effects panel.",
      exercise: exercise(
        "m7-l3",
        "The hand wipe",
        7,
        [
          "Film the end of one shot with a hand or object passing close across the lens.",
          "Film the start of the next shot with a hand or object passing in the same direction.",
          "Cut in the middle of the wipe.",
          "If you cannot edit yet, watch the two clips and mark the frame where the lens is most covered in each.",
        ],
        [
          "Both clips have a moment where the lens is mostly blocked.",
          "The motion is in the same direction in both.",
        ],
      ),
    },
  ],
};
