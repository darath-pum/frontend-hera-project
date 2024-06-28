import { defineStore } from 'pinia';

export const useFormDataStore = defineStore('formData', {
  state: () => ({
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: ''
  }),
  actions: {
    setFormData(data:any) {
      this.fromDate = data.fromDate;
      this.fromTime = data.fromTime;
      this.toDate = data.toDate;
      this.toTime = data.toTime;
      this.saveToStorage();
    },
    loadFromStorage() {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.fromDate = parsedData.fromDate || '';
        this.fromTime = parsedData.fromTime || '';
        this.toDate = parsedData.toDate || '';
        this.toTime = parsedData.toTime || '';
      } else {
        this.setDefaultValues();
      }
    },
    saveToStorage() {
      localStorage.setItem('formData', JSON.stringify({
        fromDate: this.fromDate,
        fromTime: this.fromTime,
        toDate: this.toDate,
        toTime: this.toTime,
      }));
    },
    setDefaultValues() {
      this.fromDate = '';
      this.fromTime = '';
      this.toDate = '';
      this.toTime = '';
      this.saveToStorage();
    }
  }
});
