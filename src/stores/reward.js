import { defineStore } from 'pinia'

const IceCream = new URL('@resource/storageBox/IceCream_active.png', import.meta.url).href;
const Coupon = new URL('@resource/storageBox/02_Coupon_active.png', import.meta.url).href;
const Coupon2 = new URL('@resource/storageBox/03_Coupon_active.png', import.meta.url).href;
const Coupon3 = new URL('@resource/storageBox/04_Coupon_active.png', import.meta.url).href;
const Bell = new URL('@resource/storageBox/Bell_Reward.png', import.meta.url).href;
const Uno = new URL('@resource/storageBox/Uno_Reward.png', import.meta.url).href;
const Sorina = new URL('@resource/storageBox/Sorina_Reward.png', import.meta.url).href;
const Filter1 = new URL('@resource/filter/02_filter.png', import.meta.url).href;
const Filter2 = new URL('@resource/filter/03_filter.png', import.meta.url).href;
const Filter3 = new URL('@resource/filter/04_filter.png', import.meta.url).href;
const Filter4 = new URL('@resource/icon/frame_04.png', import.meta.url).href;

export const useRewardsStore = defineStore('rewards', {
    state: () => ({
        rewardsData: {
            normal: [{
                id:0,
                src: Bell,
                required: "null",
                text:"마법사 벨 스티커 5종 세트",
            }
            ,{
                id:1,
                src: Uno,
                required: "null",
                text:"웨어울프 우노 스티커 5종 세트",
            }
            ,{
                id:2,
                src: Sorina,
                required: "null",
                text:"뱀파이어 소리나 스티커 5종 세트",
            } ,{
                id:3,
                src: Filter1,
                required: "null",
                text:"봄 배경 프레임",
            } ,{
                id:4,
                src: Filter2,
                required: "null",
                text:"여름 배경 프레임",
            }
            ,{
                id:5,
                src: Filter4,
                required: "null",
                text:"가을 배경 프레임",
            },{
                id:6,
                src: Filter3,
                required: "null",
                text:"겨울 배경 프레임",
            }],
            
            premium: [{
                id: 0,
                src: Coupon,
                required: "null",
                text:"패션·잡화 1만원 금액할인권",
            },{
                id: 1,
                src: Coupon2,
                required: "null",
                text:"F&B 5천원 금액할인권",
            },{
                id: 2,
                src: Coupon3,
                required: "null",
                text:"몽드이기자 1만원 금액할인권",
            },{
                id: 3,
            
                src: IceCream,
                required: "null",
                text:"백미당 아이스크림 1EA 쿠폰 교환권",
            }],
        }
    }),
    actions: {
        fetchTabData(tabName) {
            return this.rewardsData[tabName] || [];
        },
        setRewardsData() {
           this.rewardsData.premium.forEach((reward,index) => {
            const itemValue = localStorage.getItem(`premiumItem${index}`);
    
            if (itemValue) {
                reward.required = itemValue;
            }
           })
           
           this.rewardsData.normal.forEach((reward,index) => {
            const itemValue = localStorage.getItem(`normalItem${index}`);
    
            if (itemValue) {
                reward.required = itemValue;
            }
           })
        }

    }
});