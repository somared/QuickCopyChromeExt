// Storage service factory - returns the appropriate storage implementation
import DevModeStorage from './devModeStorage';
import ChromeStorage from './chromeStorage';

const isDevelopmentMode = () => {
  // Check if we're running in development environment
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // Check if Chrome APIs are available
  try {
    return !window.chrome || !window.chrome.storage;
  } catch (e) {
    // If we get here, we're likely in development mode (browser without extension APIs)
    return true;
  }
};

// Export the appropriate storage service based on environment
const storageService = isDevelopmentMode() ? new DevModeStorage() : new ChromeStorage();
export default storageService;

// Also export the development mode flag for UI indicators
export const IS_DEV_MODE = isDevelopmentMode();
