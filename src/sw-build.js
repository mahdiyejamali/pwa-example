//PWA-4 add this file,
//install workbox-build and make it accessible to sw.js
const workbox = require("workbox-build");
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workbox
    .injectManifest({
      swSrc: "src/sw.js", // this is your sw template file
      swDest: "build/sw.js", // this will be created in the build step
      globDirectory: "build",
      globPatterns: ["**/*.{js,css,html,png}"]
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
};
buildSW();
