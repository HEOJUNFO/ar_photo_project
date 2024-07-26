import { defineStore } from 'pinia'

export const useImageDataStore = defineStore('image', {
    state: () => ({
        imageData: null,
        eventName: null,
        width: null,
        height: null,
    }),
    actions: {
        setImageData(data) {
            this.imageData = data;
            // Optionally, store it in local storage when setting the data
            localStorage.setItem('savedImage', data);
        },
        setEventName(name) {
            this.eventName = name;
        },
        setCanvasSize(width, height) {
            this.width = width;
            this.height = height;
            localStorage.setItem('canvasSize', JSON.stringify({ width, height }));
        },
        getImageData() {
            if (this.imageData === null) {
               
                this.imageData = localStorage.getItem('savedImage');
            }
            return this.imageData;
        },
        getEventName() {
            return this.eventName;
        },
        getCanvasSize() {
            if(this.width === null || this.height === null) {
         
                const canvasSize = JSON.parse(localStorage.getItem('canvasSize'));
                this.width = canvasSize.width;
                this.height = canvasSize.height;
            }
            return { width: this.width, height: this.height };
        }
    }
});
