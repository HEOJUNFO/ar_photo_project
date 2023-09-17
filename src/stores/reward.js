import { defineStore } from 'pinia'

export const useRewardsStore = defineStore('rewards', {
    state: () => ({
        rewardsData: {
            all: [{
                id: 1,
                url: '../resource/storageBox/icecream.png'
            },{
                id: 2,
                url: '../resource/storageBox/Coupon_01_active.png'
            },{
                id: 3,
                url: '../resource/storageBox/Coupon_02_active.png'
            },{
                id: 4,
                url: '../resource/storageBox/Coupon_03_active.png'
            }],
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