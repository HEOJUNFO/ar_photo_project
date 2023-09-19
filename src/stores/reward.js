import { defineStore } from 'pinia'

export const useRewardsStore = defineStore('rewards', {
    state: () => ({
        rewardsData: {
            all: [{
                id: 1,
                src: '../resource/storageBox/IceCream_active.png',
                required: "null",
                text:"백미당 아이스크림 1EA 쿠폰 교환권",
            },{
                id: 2,
                src: '../resource/storageBox/02_Coupon_active.png',
                required: "null",
                text:"패션·잡화 1만원 금액할인권",
            },{
                id: 3,
                src: '../resource/storageBox/03_Coupon_active.png',
                required: "null",
                text:"F&B 5천원 금액할인권",
            },{
                id: 4,
                src: '../resource/storageBox/04_Coupon_active.png',
                required: "null",
                text:"몽드이기자 1만원 금액할인권",
            },{
                id:5,
                src: '../resource/storageBox/Bell_Reward.png',
                required: "null",
                text:"벨 감정표현 스티커 5종 세트",
            }
            ,{
                id:6,
                src: '../resource/storageBox/Uno_Reward.png',
                required: "null",
                text:"우노 감정표현 스티커 5종 세트",
            }
            ,{
                id:7,
                src: '../resource/storageBox/Sorina_Reward.png',
                required: "null",
                text:"소리나 감정표현 스티커 5종 세트",
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

            this.rewardsData.unacquired = [];
        this.rewardsData.unused = [];
        this.rewardsData.used = [];

        
            this.rewardsData.all.forEach((reward, index) => {
                const itemValue = localStorage.getItem(`item${index + 1}`);
    
                if (itemValue) {
                    reward.required = itemValue;
                    console.log(reward.required)
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
            console.log(this.rewardsData[tabName])
            return this.rewardsData[tabName] || [];
        }
    }
});