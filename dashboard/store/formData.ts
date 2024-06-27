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
      const storedData = JSON.parse(localStorage.getItem('formData') || '');
      if (storedData) {
        this.fromDate = storedData.fromDate;
        this.fromTime = storedData.fromTime;
        this.toDate = storedData.toDate;
        this.toTime = storedData.toTime;
      }
    },
    saveToStorage() {
      localStorage.setItem('formData', JSON.stringify({
        fromDate: this.fromDate,
        fromTime: this.fromTime,
        toDate: this.toDate,
        toTime: this.toTime,
      }));
    }
  }
});
