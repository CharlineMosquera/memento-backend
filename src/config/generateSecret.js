import { randomBytes } from "crypto";

function generateSecret() {
  return randomBytes(64).toString("hex");
}

console.log(generateSecret());
