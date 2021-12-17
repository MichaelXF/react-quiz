import HashIds from "hashids";

export const hashIds = new HashIds("My Salt" + Date.now(), 10);

export function encodeId(id) {
  return hashIds.encode(id);
}

export function decodeId(str) {
  return parseInt(hashIds.decode(str)[0] + "");
}
