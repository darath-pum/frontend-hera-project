import { defineStore } from 'pinia';

export const useFormDataStore = defineStore('formData', {
  state: () => ({
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
    userGameId:''
  }),
  actions: {
    setFormData(data:any) {
      this.fromDate = data.fromDate;
      this.fromTime = data.fromTime;
      this.toDate = data.toDate;
      this.toTime = data.toTime;
      this.userGameId = data.userGameId
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
        this.userGameId = parsedData.userGameId || '';
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
        userGameId: this.userGameId
      }));
    },
    setDefaultValues() {
      this.fromDate =  new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      this.fromTime = '00:00';
      this.toDate = new Date(new Date().getTime()).toISOString().split("T")[0];
      this.toTime = '23:59';
      this.userGameId = '1';
      this.saveToStorage();
    },
    clearStorage() {
      setTimeout(() => {
        localStorage.removeItem('formData');  // Remove data from localStorage
        this.setDefaultValues();  
      }, 1000);  
    }

  }
});
