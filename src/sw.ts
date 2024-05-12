import { Serwist } from "serwist";

// Listen for the 'install' event
self.addEventListener('install', () => {
  console.log('Service worker installing...');
  // Perform install steps
});

// Listen for the 'activate' event
self.addEventListener('activate', () => {
  console.log('Service worker activating...');
  // Perform activation steps
});

// Listen for the 'fetch' event
self.addEventListener('fetch', event => {
  console.log('Handling fetch event for', event?.request?.url);
  // Respond to fetch event
});

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
});

serwist.addEventListeners();