import { WhiteBlobType, ArrowsType } from "./interface";

export function keyDown(i, arrows: ArrowsType): ArrowsType {
  if (i.keyCode == "40") {
    arrows.downPressed = true;
  }
  if (i.keyCode == "38") {
    arrows.upPressed = true;
  }
  if (i.keyCode == "37") {
    arrows.leftPressed = true;
  }
  if (i.keyCode == "39") {
    arrows.rightPressed = true;
  }
  return arrows;
}

export function keyUp(i, arrows: ArrowsType): ArrowsType {
  if (i.keyCode == "40") {
    arrows.downPressed = false;
  }
  if (i.keyCode == "38") {
    arrows.upPressed = false;
  }
  if (i.keyCode == "37") {
    arrows.leftPressed = false;
  }
  if (i.keyCode == "39") {
    arrows.rightPressed = false;
  }
  return arrows;
}

export function inputs(
  whiteBlob: WhiteBlobType,
  arrows: ArrowsType
): WhiteBlobType {
  if (arrows.downPressed) {
    whiteBlob.y += whiteBlob.speed;
  }
  if (arrows.upPressed) {
    whiteBlob.y -= whiteBlob.speed;
  }
  if (arrows.leftPressed) {
    whiteBlob.x -= whiteBlob.speed;
  }
  if (arrows.rightPressed) {
    whiteBlob.x += whiteBlob.speed;
  }
  return whiteBlob;
}
