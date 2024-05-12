import { injectManifest } from "@serwist/build";

injectManifest({
  swSrc: "src/sw.ts",
  swDest: "dist/sw.js",
  globDirectory: "dist",
}).then(() => {
  console.log('Service worker has been generated.');
}).catch((error) => {
  console.error('Error with service worker generation:', error);
});
