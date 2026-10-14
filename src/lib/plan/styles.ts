import type { StyleId } from "@/lib/types";
import type { StyleProfile } from "./vocabulary";

export const STYLES: Record<StyleId, StyleProfile> = {
  cinematic: {
    id: "cinematic",
    label: "Cinematic",
    blurb: "Slow, wide, deliberate. Fewer shots held longer.",
    roleOrder: ["establish", "approach", "detail", "hero", "human", "motion", "closer"],
    shotCount: { 15: 4, 30: 6, 60: 9 },
    pacingBias: 1.15,
    lookNote:
      "Lock exposure manually and keep it consistent across shots. A cinematic look comes from restraint, not from a filter.",
    transitions: [
      {
        name: "Straight cut on movement",
        how: "Cut while both shots are moving in the same direction. The eye reads it as continuous.",
        kind: "cut",
      },
      {
        name: "Match cut on shape",
        how: "Cut between two frames where a similar shape sits in the same part of the frame.",
        kind: "edit",
      },
      {
        name: "Whip-pan blend",
        how: "End one shot with a fast pan and start the next with a fast pan in the same direction, then cut at the blurriest point.",
        kind: "in-camera",
      },
      {
        name: "Dip to black",
        how: "Fade down over 6 frames and back up. Use once, for a real time or place change.",
        kind: "edit",
      },
    ],
    musicBrief:
      "One slow-building instrumental with a clear entry point. Ambient pads, piano or muted strings. No vocals and no drop.",
    bpmRange: "70–90 BPM",
    soundDesign: [
      "Keep a low level of real ambience under the music so the video does not feel sterile.",
      "Add one or two sharp real-world sounds at the cut points: a door, a footstep, a latch.",
      "Duck the music by 3–4 dB wherever a real sound needs to land.",
    ],
    aspectRatio: "9:16 vertical (or 2.39:1 letterbox if posting to YouTube)",
    frameRate: "24 fps",
    platform: "YouTube / Instagram",
    exportNotes: [
      "Export at the frame rate you shot at. Mixing 24 and 30 fps causes visible stutter.",
      "Keep the bitrate high: 15–20 Mbps for 1080p, 40 Mbps or more for 4K.",
      "Grade gently. One contrast curve and a small saturation lift beats a heavy LUT.",
    ],
    editSteps: [
      {
        title: "Lay the shots down in plan order",
        detail:
          "Drop every clip onto the timeline in the order of the shot list before you trim anything. Watch it once ugly and long.",
      },
      {
        title: "Trim to the strongest two seconds",
        detail:
          "For each clip, find the best moment and cut 0.5s before and after it. Cut heads and tails hard — the first and last second of a handheld take is almost always the shakiest.",
      },
      {
        title: "Drop the music in and move cuts onto the beat",
        detail:
          "Add the track, find the downbeats, and nudge each cut to the nearest one. This single step is what makes an edit feel intentional.",
      },
      {
        title: "Add the one transition that matters",
        detail:
          "Use at most one non-cut transition in the whole video, at the biggest change of place or time. Everything else should be a straight cut.",
      },
      {
        title: "Grade for consistency, not for look",
        detail:
          "Match white balance and exposure between shots first. Only then apply a light overall contrast and saturation adjustment.",
      },
      {
        title: "Check it on a phone at low volume",
        detail:
          "Watch the final cut on a phone with the sound almost off. If it still reads, it works.",
      },
    ],
  },

  social: {
    id: "social",
    label: "TikTok / Reels",
    blurb: "Fast, vertical, hook-first. More shots cut shorter.",
    roleOrder: ["hero", "detail", "motion", "human", "establish", "detail", "closer"],
    shotCount: { 15: 5, 30: 7, 60: 10 },
    pacingBias: 0.78,
    lookNote:
      "Shoot vertical and keep the subject in the middle 70% of the frame so captions and UI do not cover it.",
    transitions: [
      {
        name: "Hard cut on the beat",
        how: "Cut exactly on a drum hit. This is the default and should be most of your cuts.",
        kind: "cut",
      },
      {
        name: "Hand or object swipe",
        how: "Pass a hand or object across the lens at the end of one shot and the start of the next, then cut mid-swipe.",
        kind: "in-camera",
      },
      {
        name: "Zoom punch",
        how: "Scale the next clip up 15% for 3 frames on the cut. Adds impact without looking like an effect.",
        kind: "edit",
      },
      {
        name: "Jump cut in place",
        how: "Keep the frame identical and cut out the middle of an action. Fast and energetic.",
        kind: "cut",
      },
    ],
    musicBrief:
      "A trending or high-energy track with an obvious beat in the first second. The hook has to land before the viewer scrolls.",
    bpmRange: "100–130 BPM",
    soundDesign: [
      "Put your strongest visual in the first 0.5 seconds. The hook is the whole battle.",
      "Add a short whoosh or click on each transition, mixed low.",
      "Keep real audio under the music if anyone speaks — captions are not a substitute.",
    ],
    aspectRatio: "9:16 vertical",
    frameRate: "30 fps",
    platform: "TikTok / Reels / Shorts",
    exportNotes: [
      "Export 1080×1920 at 30 fps. Higher resolution gets re-compressed anyway.",
      "Keep the file under 100 MB where possible to avoid aggressive platform re-encoding.",
      "Leave the top 15% and bottom 20% of the frame clear of anything important.",
    ],
    editSteps: [
      {
        title: "Put your best shot first",
        detail:
          "Ignore the plan order for the opening. Whichever clip is most visually striking goes in position one, no matter what it was shot for.",
      },
      {
        title: "Cut everything far shorter than feels right",
        detail:
          "Target 1–2 seconds per clip. If a shot does not justify itself in that time, delete it rather than extending it.",
      },
      {
        title: "Align every cut to the beat",
        detail:
          "Add the track first, mark the beats, then cut to them. On social, rhythm matters more than coverage.",
      },
      {
        title: "Add text on the first and last frame",
        detail:
          "An opening line that states what this is, and a closing line with the call to action. Keep both inside the safe area.",
      },
      {
        title: "Add captions if anyone speaks",
        detail:
          "Most viewers watch muted. Burn in captions or use the platform's auto-captions and correct them.",
      },
      {
        title: "Watch it once at full speed on a phone",
        detail:
          "If you lose interest at any point, cut that part out entirely. There is no shot worth keeping that bores you.",
      },
    ],
  },

  commercial: {
    id: "commercial",
    label: "Commercial",
    blurb: "Clean, bright, product-forward. Built to sell one idea.",
    roleOrder: ["hero", "detail", "human", "approach", "detail", "establish", "closer"],
    shotCount: { 15: 4, 30: 6, 60: 8 },
    pacingBias: 0.95,
    lookNote:
      "Keep white balance locked and identical across every shot. Colour consistency is what separates a commercial from a home video.",
    transitions: [
      {
        name: "Clean cut",
        how: "No effect. Commercial work relies on composition and rhythm, not transitions.",
        kind: "cut",
      },
      {
        name: "Speed ramp into the hero",
        how: "Slow the last 10 frames of the previous clip, then cut at full speed into the hero shot.",
        kind: "edit",
      },
      {
        name: "Wipe behind a passing object",
        how: "Let a hand or product cross the lens and cut behind it. Hides the cut completely.",
        kind: "in-camera",
      },
    ],
    musicBrief:
      "Upbeat, clean, rhythmic. A single build to one peak that lands on your hero shot. No vocals competing with text.",
    bpmRange: "95–115 BPM",
    soundDesign: [
      "Sync the music peak to the hero shot, then build the rest of the edit backwards from there.",
      "Add one crisp real sound for the product: a click, a pour, a zip.",
      "End on a clean note rather than a fade — commercials should stop, not trail off.",
    ],
    aspectRatio: "9:16 vertical, with a 1:1 crop safe area if you need a square version",
    frameRate: "30 fps",
    platform: "Instagram / paid social",
    exportNotes: [
      "Export a 9:16 master and a 1:1 crop from the same timeline if you plan to run ads.",
      "Keep text inside the central 80% so it survives both crops.",
      "Make sure the product is readable in the first and last frame.",
    ],
    editSteps: [
      {
        title: "Decide the one idea before you touch the timeline",
        detail:
          "Write the single sentence the video has to communicate. Every clip either serves it or gets cut.",
      },
      {
        title: "Build around the hero shot",
        detail:
          "Place the hero shot first, then arrange the supporting clips before and after it. The hero is the destination, not an afterthought.",
      },
      {
        title: "Trim to one clear action per clip",
        detail:
          "Each clip should show one thing happening. If a clip does two things, split it.",
      },
      {
        title: "Match colour across every shot",
        detail:
          "Correct white balance and exposure shot by shot until they look like one session. This matters more than any creative grade.",
      },
      {
        title: "Add text and the call to action",
        detail:
          "One short line stating the benefit, one line telling the viewer what to do. Nothing else.",
      },
      {
        title: "Export both aspect ratios",
        detail:
          "Deliver 9:16 and 1:1 so the same edit can run across placements without being recut.",
      },
    ],
  },

  travel: {
    id: "travel",
    label: "Travel",
    blurb: "Place-led and atmospheric. Wide frames and movement.",
    roleOrder: ["establish", "motion", "detail", "hero", "human", "detail", "closer"],
    shotCount: { 15: 4, 30: 7, 60: 10 },
    pacingBias: 1.0,
    lookNote:
      "Protect your highlights. Skies clip to white very easily on a phone, and once clipped they cannot be recovered.",
    transitions: [
      {
        name: "Cut on direction of travel",
        how: "If the subject moves left to right, make the next shot move left to right too. The cut disappears.",
        kind: "cut",
      },
      {
        name: "Pass-behind wipe",
        how: "Let a wall, pillar or tree cross the lens and cut behind it. The classic travel transition.",
        kind: "in-camera",
      },
      {
        name: "Match cut on light",
        how: "Cut between two shots with the same light direction and brightness, even in different locations.",
        kind: "edit",
      },
      {
        name: "Sound-led cut",
        how: "Bring the next shot's ambience in half a second early, then cut the picture. Feels seamless.",
        kind: "edit",
      },
    ],
    musicBrief:
      "Warm, rhythmic, builds slowly. Acoustic or electronic with a clear lift about a third of the way in. Vocals are fine if they sit back.",
    bpmRange: "85–110 BPM",
    soundDesign: [
      "Record 20 seconds of pure ambience at each location. It is the most useful audio you will capture.",
      "Layer real ambience under the music at a low level — markets, water, wind, traffic.",
      "Drop the music out entirely for 2 seconds at the biggest reveal. Silence hits harder than a build.",
    ],
    aspectRatio: "9:16 vertical for social, 16:9 if the destination footage is landscape-led",
    frameRate: "30 fps, or 60 fps for anything you want to slow down",
    platform: "Instagram / YouTube",
    exportNotes: [
      "If you shot at 60 fps, slow those clips to 50% on a 30 fps timeline for clean slow motion.",
      "Keep the grade warm but do not crush the shadows — travel footage needs depth.",
      "Check the export on a phone in daylight. Dark travel footage disappears outdoors.",
    ],
    editSteps: [
      {
        title: "Sort clips by location, then by light",
        detail:
          "Group everything by where it was shot, then order each group from brightest to darkest. This gives you a natural progression through the day.",
      },
      {
        title: "Open on your widest frame",
        detail:
          "Travel videos should establish place immediately. Lead with the shot that tells the viewer where they are.",
      },
      {
        title: "Alternate wide and tight",
        detail:
          "Never put two wide shots next to each other. Wide, detail, wide, detail keeps the eye engaged.",
      },
      {
        title: "Cut to the music, then layer ambience",
        detail:
          "Get the picture cut working with the track first. Then bring in the real location sound underneath.",
      },
      {
        title: "Match the grade across locations",
        detail:
          "Different light at different times of day will not match on its own. Pull white balance together shot by shot.",
      },
      {
        title: "End on stillness",
        detail:
          "Finish with a held wide frame and let the music resolve. Do not cut out mid-phrase.",
      },
    ],
  },
};

export const STYLE_ORDER: StyleId[] = ["cinematic", "social", "commercial", "travel"];

export function getStyle(id: StyleId): StyleProfile {
  return STYLES[id];
}
