import type {
  DeviceId,
  DurationSec,
  ExperienceId,
  StabilizationId,
  StyleId,
  SubjectId,
} from "@/lib/types";

const SUBJECTS: SubjectId[] = [
  "car",
  "product",
  "person",
  "fashion",
  "food",
  "travel",
  "custom",
];
const STYLES: StyleId[] = ["cinematic", "social", "commercial", "travel"];
const DEVICES: DeviceId[] = ["iphone", "android", "camera"];
const EXPERIENCES: ExperienceId[] = ["first-time", "some-practice", "confident"];
const RIGS: StabilizationId[] = ["handheld", "tripod", "gimbal"];

function oneOf<T extends string>(value: string | null, allowed: readonly T[]): T | null {
  if (!value) return null;
  return (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

export function readyHref(partial: {
  subject?: SubjectId;
  customSubject?: string;
  device?: DeviceId;
  style?: StyleId;
  durationSec?: DurationSec;
  experience?: ExperienceId;
  stabilization?: StabilizationId;
}): string {
  const q = new URLSearchParams();
  if (partial.subject) q.set("subject", partial.subject);
  if (partial.customSubject) q.set("custom", partial.customSubject);
  if (partial.device) q.set("device", partial.device);
  if (partial.style) q.set("style", partial.style);
  if (partial.durationSec) q.set("duration", String(partial.durationSec));
  if (partial.experience) q.set("experience", partial.experience);
  if (partial.stabilization) q.set("rig", partial.stabilization);
  const qs = q.toString();
  return qs ? `/ready?${qs}` : "/ready";
}

export function parseBriefQuery(params: URLSearchParams): {
  subject: SubjectId | null;
  customSubject: string;
  device: DeviceId | null;
  style: StyleId | null;
  durationSec: DurationSec;
  experience: ExperienceId | null;
  stabilization: StabilizationId | null;
} {
  const durationRaw = params.get("duration");
  const durationSec: DurationSec =
    durationRaw === "15" || durationRaw === "30" || durationRaw === "60"
      ? (Number(durationRaw) as DurationSec)
      : 30;

  return {
    subject: oneOf(params.get("subject"), SUBJECTS),
    customSubject: params.get("custom") ?? "",
    device: oneOf(params.get("device"), DEVICES),
    style: oneOf(params.get("style"), STYLES),
    durationSec,
    experience: oneOf(params.get("experience"), EXPERIENCES),
    stabilization: oneOf(params.get("rig"), RIGS),
  };
}
