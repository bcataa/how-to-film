import type { DeviceId, ExperienceId, StabilizationId } from "@/lib/types";
import type {
  DeviceProfile,
  ExperienceProfile,
  StabilizationProfile,
} from "./vocabulary";

export const DEVICES: Record<DeviceId, DeviceProfile> = {
  iphone: {
    id: "iphone",
    label: "iPhone",
    settingsPath:
      "Settings → Camera → Record Video to set resolution and frame rate. Turn on Settings → Camera → Grid for composition guides.",
    exposureHint:
      "Press and hold on your subject until AE/AF LOCK appears, then slide up or down to set brightness. The lock survives until you tap elsewhere.",
    focusHint:
      "Tap to focus, then press and hold to lock it. Without locking, the iPhone will refocus mid-shot every time something moves.",
    whiteBalanceHint:
      "The native app has no manual white balance. Keep all your shots under the same light source so the automatic setting does not drift between clips.",
    lensHint:
      "Use 1x for most shots and 2x or 3x for faces and detail. Avoid 0.5x ultra-wide for anything with a person in it.",
    audioHint:
      "Get within an arm's length for usable audio. Wired EarPods work as a passable lapel mic in a pinch.",
    resolution: "4K at your chosen frame rate (or 1080p to save space)",
    caveat:
      "Leave HDR video on for the best quality, but be aware HDR clips can look washed out in some editing apps. If colours look wrong when you import, turn off Settings → Camera → HDR Video and reshoot.",
  },
  android: {
    id: "android",
    label: "Android",
    settingsPath:
      "Open the camera app, go to Video, then the settings cog to set resolution and frame rate. Most Android cameras also offer a Pro or Manual video mode.",
    exposureHint:
      "Tap your subject, then drag the sun or slider icon that appears to adjust brightness. In Pro mode, set ISO manually and leave it fixed.",
    focusHint:
      "Tap to focus. Look for an AF-L or padlock icon to lock it — on Samsung, tap and hold until the lock appears.",
    whiteBalanceHint:
      "If your camera has a Pro video mode, set white balance manually (around 5600K for daylight, 3200K for indoor bulbs) and leave it there for every shot.",
    lensHint:
      "Use the main 1x lens. Telephoto is good for faces. Avoid the ultra-wide unless you specifically want the distortion.",
    audioHint:
      "Get close to the sound source. Many Android cameras have a zoom-mic or directional audio setting worth enabling.",
    resolution: "4K at your chosen frame rate (or 1080p to save space)",
    caveat:
      "Android camera apps vary a lot between manufacturers. If you cannot find a setting in the stock app, Open Camera (free) gives you manual control on almost any device.",
  },
  camera: {
    id: "camera",
    label: "Camera",
    settingsPath:
      "Set the mode dial to Movie or M, then set resolution and frame rate in the movie record settings menu.",
    exposureHint:
      "Use the 180-degree rule: shutter speed at roughly double your frame rate (1/50s for 24–25 fps, 1/60s for 30 fps). Then control brightness with aperture and ISO, not shutter.",
    focusHint:
      "Use continuous autofocus with face or subject tracking if your camera has it. If it hunts, switch to manual focus and set it before the take.",
    whiteBalanceHint:
      "Set white balance manually in Kelvin: around 5600K for daylight, 3200K for tungsten. Never leave it on auto for video.",
    lensHint:
      "Something around 35mm or 50mm equivalent is the safest choice. Open the aperture to f/2.8 or wider for background separation.",
    audioHint:
      "Use an external microphone if you have one, and set levels so peaks sit around −12 dB. Monitor with headphones.",
    resolution: "4K (or 1080p if your camera overheats at 4K)",
    caveat:
      "Shoot in a standard colour profile rather than Log unless you already know how to grade Log footage. Flat footage you cannot grade looks worse than a good standard profile.",
  },
};

export const DEVICE_ORDER: DeviceId[] = ["iphone", "android", "camera"];

export function getDevice(id: DeviceId): DeviceProfile {
  return DEVICES[id];
}

/* -------------------------------------------------------------------------- */

export const EXPERIENCE: Record<ExperienceId, ExperienceProfile> = {
  "first-time": {
    id: "first-time",
    label: "First time",
    description: "I have never planned a video before",
    maxDifficulty: 1,
    suggestedTakes: 3,
    coaching:
      "Record three takes of this shot. Watch the first one back before shooting the other two.",
  },
  "some-practice": {
    id: "some-practice",
    label: "Some practice",
    description: "I have filmed a few things",
    maxDifficulty: 2,
    suggestedTakes: 2,
    coaching: "Record two takes so you have a backup in the edit.",
  },
  confident: {
    id: "confident",
    label: "Confident",
    description: "I shoot and edit regularly",
    maxDifficulty: 3,
    suggestedTakes: 1,
    coaching: null,
  },
};

export const EXPERIENCE_ORDER: ExperienceId[] = [
  "first-time",
  "some-practice",
  "confident",
];

export function getExperience(id: ExperienceId): ExperienceProfile {
  return EXPERIENCE[id];
}

/* -------------------------------------------------------------------------- */

export const STABILIZATION: Record<StabilizationId, StabilizationProfile> = {
  handheld: {
    id: "handheld",
    label: "Handheld",
    description: "Just my hands",
    supports: ["static", "pan", "tilt", "push-in", "pull-out", "handheld-drift", "whip"],
    fallback: "handheld-drift",
    note: "Hold the phone with both hands, elbows pressed into your ribs, and brace against a wall or railing whenever you can. Turn your device's built-in stabilisation on.",
  },
  tripod: {
    id: "tripod",
    label: "Tripod",
    description: "I have a tripod or stand",
    supports: ["static", "pan", "tilt"],
    fallback: "static",
    note: "A tripod gives you perfect static and smooth pans, but it cannot move through space. Shots that called for a push or orbit have been converted to locked-off or panning frames.",
  },
  gimbal: {
    id: "gimbal",
    label: "Gimbal",
    description: "I have a gimbal or stabiliser",
    supports: [
      "static",
      "pan",
      "tilt",
      "push-in",
      "pull-out",
      "orbit",
      "tracking",
      "reveal",
      "handheld-drift",
      "whip",
    ],
    fallback: "push-in",
    note: "Balance the gimbal before you start and give it a few seconds to settle after powering on. Walk with soft knees — a gimbal smooths rotation, not vertical bounce.",
  },
};

export const STABILIZATION_ORDER: StabilizationId[] = ["handheld", "tripod", "gimbal"];

export function getStabilization(id: StabilizationId): StabilizationProfile {
  return STABILIZATION[id];
}
