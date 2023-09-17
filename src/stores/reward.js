import { defineStore } from 'pinia'

export const useRewardsStore = defineStore('rewards', {
    state: () => ({
        rewardsData: {
            all: [],
            unused: [],
            unacquired: [],
            used: []
        }
    }),
    actions: {
        setRewardsData(data) {
            this.rewardsData = data;
        },
        fetchTabData(tabName) {
            return this.rewardsData[tabName] || [];
        }
    }
});