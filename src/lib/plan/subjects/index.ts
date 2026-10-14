import type { SubjectId } from "@/lib/types";
import type { SubjectProfile } from "../vocabulary";
import { car } from "./car";
import { custom } from "./custom";
import { fashion } from "./fashion";
import { food } from "./food";
import { person } from "./person";
import { product } from "./product";
import { travel } from "./travel";

export const SUBJECTS: Record<SubjectId, SubjectProfile> = {
  car,
  product,
  person,
  fashion,
  food,
  travel,
  custom,
};

/** Display order for the Ready to Go form. */
export const SUBJECT_ORDER: SubjectId[] = [
  "car",
  "product",
  "person",
  "fashion",
  "food",
  "travel",
  "custom",
];

export function getSubject(id: SubjectId): SubjectProfile {
  return SUBJECTS[id];
}
