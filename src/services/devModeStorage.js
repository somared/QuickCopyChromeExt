// Development mode storage service implementation
import testData from '../testData.json';

class DevModeStorage {
  constructor() {
    this.data = {
      userData: [...testData].sort((a, b) => a.order - b.order),
      version: '1.1'
    };
    console.log('[DEV MODE] Initialized with test data');
  }

  // Gets data from local memory
  getData() {
    return Promise.resolve(this.data);
  }

  // Gets specific items from local memory
  getItems(keys) {
    const result = {};
    keys.forEach(key => {
      result[key] = this.data[key];
    });
    return Promise.resolve(result);
  }

  // Gets bytes in use (simulation)
  getBytesInUse() {
    const jsonString = JSON.stringify(this.data);
    const bytes = new TextEncoder().encode(jsonString).length;
    return Promise.resolve(bytes);
  }

  // Save data to local memory
  saveData(data) {
    this.data = { ...this.data, ...data };
    console.log('[DEV MODE] Data saved (not persisted to Chrome storage):', data);
    return Promise.resolve();
  }
}

export default DevModeStorage;
