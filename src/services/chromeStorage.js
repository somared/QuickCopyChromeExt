// Chrome storage service implementation for production
class ChromeStorage {
  // Gets all data from Chrome storage
  getData() {
    return new Promise((resolve, reject) => {
      try {
        window.chrome.storage.sync.get(null, (result) => {
          if (window.chrome.runtime.lastError) {
            reject(window.chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Gets specific items from Chrome storage
  getItems(keys) {
    return new Promise((resolve, reject) => {
      try {
        window.chrome.storage.sync.get(keys, (result) => {
          if (window.chrome.runtime.lastError) {
            reject(window.chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Gets bytes in use from Chrome storage
  getBytesInUse() {
    return new Promise((resolve, reject) => {
      try {
        window.chrome.storage.sync.getBytesInUse(null, (bytes) => {
          if (window.chrome.runtime.lastError) {
            reject(window.chrome.runtime.lastError);
          } else {
            console.log("Total Bytes:", bytes);
            resolve(bytes);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Save data to Chrome storage
  saveData(data) {
    return new Promise((resolve, reject) => {
      try {
        window.chrome.storage.sync.set(data, () => {
          if (window.chrome.runtime.lastError) {
            reject(window.chrome.runtime.lastError);
          } else {
            console.log('Data saved to Chrome storage:', Object.keys(data));
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default ChromeStorage;