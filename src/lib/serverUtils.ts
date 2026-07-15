import { readdirSync } from "node:fs";
import path from "node:path";

export function getRandomAnimalUrl() {
  const dir = path.join(process.cwd(), "public/animals");
  const animals = readdirSync(dir).filter((f) => f.endsWith(".svg"));
  const randomIndex = Math.floor(Math.random() * animals.length);
  return `/animals/${animals[randomIndex]}`;
}

export function getAnimalIcons() {
  const dir = path.join(process.cwd(), "public/animals");
  return readdirSync(dir).filter((f) => f.endsWith(".svg"));
}
