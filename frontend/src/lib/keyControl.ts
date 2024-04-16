import { WhiteBlobType, ArrowsType } from "./interface";

export function keyDown(i: KeyboardEvent, arrows: ArrowsType): ArrowsType {
  arrows[i.key as keyof ArrowsType] = false;
  return arrows;
}

export function keyUp(i: KeyboardEvent, arrows: ArrowsType): ArrowsType {
  arrows[i.key as keyof ArrowsType] = false;
  return arrows;
}

export function inputs(
  whiteBlob: WhiteBlobType,
  arrows: ArrowsType
): WhiteBlobType {
  if (arrows.ArrowDown) {
    whiteBlob.y += whiteBlob.speed;
  }
  if (arrows.ArrowUp) {
    whiteBlob.y -= whiteBlob.speed;
  }
  if (arrows.ArrowLeft) {
    whiteBlob.x -= whiteBlob.speed;
  }
  if (arrows.ArrowRight) {
    whiteBlob.x += whiteBlob.speed;
  }
  return whiteBlob;
}
