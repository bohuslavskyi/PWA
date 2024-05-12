import { injectManifest } from "@serwist/build";

injectManifest({
  swSrc: "app/sw.ts",
  swDest: "dist/sw.js",
  globDirectory: "dist",
});
