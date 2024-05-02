import { ArrowsType } from "./interface";

export function keyDown(i: KeyboardEvent, arrows: ArrowsType): ArrowsType {
  arrows[i.key as keyof ArrowsType] = false;
  return arrows;
}

export function keyUp(i: KeyboardEvent, arrows: ArrowsType): ArrowsType {
  arrows[i.key as keyof ArrowsType] = false;
  return arrows;
}
