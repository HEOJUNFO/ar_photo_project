import { defineStore } from 'pinia'

export const useImageDataStore = defineStore('image', {
    state: () => ({
        imageData: null,
        eventName: null
    }),
    actions: {
        setImageData(data) {
            this.imageData = data;
        },
        setEventName(name) {
            this.eventName = name;
        },
        getImageData() {
            return this.imageData;
        },
        getEventName() {
            return this.eventName;
        }
        
    }
});