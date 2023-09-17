import { defineStore } from 'pinia'

export const useRewardsStore = defineStore('rewards', {
    state: () => ({
        rewardsData: {
            all: [{
                id: 1,
                url: '../resource/storageBox/icecream.png',
                required: "null"
            },{
                id: 2,
                url: '../resource/storageBox/Coupon_01_active.png',
                required: "null"
            },{
                id: 3,
                url: '../resource/storageBox/Coupon_02_active.png',
                required: "null"
            },{
                id: 4,
                url: '../resource/storageBox/Coupon_03_active.png',
                required: "null"
            }],
            unused: [],
            unacquired: [],
            used: []
        }
    }),
    actions: {
        setRewardsData() {
            let unacquiredIds = new Set();
            let unusedIds = new Set();
            let usedIds = new Set();
        
            this.rewardsData.all.forEach((reward, index) => {
                const itemValue = localStorage.getItem(`item ${index + 1}`);
                if (itemValue) {
                    reward.required = itemValue;
                }
                
                switch(reward.required) {
                    case "null":
                        if (!unacquiredIds.has(reward.id)) {
                            this.rewardsData.unacquired.push(reward);
                            unacquiredIds.add(reward.id);
                        }
                        break;
                    case "true":
                        if (!unusedIds.has(reward.id)) {
                            this.rewardsData.unused.push(reward);
                            unusedIds.add(reward.id);
                        }
                        break;
                    case "used":
                        if (!usedIds.has(reward.id)) {
                            this.rewardsData.used.push(reward);
                            usedIds.add(reward.id);
                        }
                        break;
                    default:
                        break;
                }
            });
        },
        fetchTabData(tabName) {
            return this.rewardsData[tabName] || [];
        }
    }
});