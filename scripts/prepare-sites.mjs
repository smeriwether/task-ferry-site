import { copyFile, mkdir } from "node:fs/promises";

const hostingDirectory = new URL("../dist/.openai/", import.meta.url);

await mkdir(hostingDirectory, { recursive: true });
await copyFile(
  new URL("../.openai/hosting.json", import.meta.url),
  new URL("hosting.json", hostingDirectory)
);
