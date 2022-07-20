export default function Storage(key, defaultValue) {
  this.getItem = () => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  this.setItem = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      alert(e.message);
    }
  };
}
