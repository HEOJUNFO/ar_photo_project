import { defineStore } from 'pinia'

const IceCream = new URL('@resource/storageBox/IceCream_active.png', import.meta.url).href;
const Coupon = new URL('@resource/storageBox/02_Coupon_active.png', import.meta.url).href;
const Coupon2 = new URL('@resource/storageBox/03_Coupon_active.png', import.meta.url).href;
const Coupon3 = new URL('@resource/storageBox/04_Coupon_active.png', import.meta.url).href;
const Bell = new URL('@resource/storageBox/Bell_Sticker.png', import.meta.url).href;
const Uno = new URL('@resource/storageBox/Uno_Sticker.png', import.meta.url).href;
const Sorina = new URL('@resource/storageBox/sorina_Sticker.png', import.meta.url).href;
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
                text: "마법사 벨 ",
                text2: "웹스티커 1세트"
            }
            ,{
                id:1,
                src: Uno,
                required: "null",
                text:"웨어울프 우노",
                text2: "웹스티커 1세트"
            }
            ,{
                id:2,
                src: Sorina,
                required: "null",
                text:"뱀파이어 소리나",
                text2: "웹스티커 1세트"
            } ,{
                id:3,
                src: Filter1,
                required: "null",
                text:"봄의 숲",
                text2: "웹프레임 1종"
            } ,{
                id:4,
                src: Filter2,
                required: "null",
                text:"여름의 숲",
                text2: "웹프레임 1종"
            }
            ,{
                id:5,
                src: Filter4,
                required: "null",
                text:"가을의 숲",
                text2: "웹프레임 1종"
            },{
                id:6,
                src: Filter3,
                required: "null",
                text:"겨울의 숲",
                text2: "웹프레임 1종"
            }],
            
            premium: [{
                id: 0,
                src: Coupon,
                required: "null",
                text:"패션·잡화 1만원 금액할인권",
                text2:"- 패션·잡화 상품군 5만원이상 구매시 사용가능한 금액할인권의 웹쿠폰",
            },{
                id: 1,
                src: Coupon2,
                required: "null",
                text:"F&B 5천원 금액할인권",
                text2:"- F&B 2만원이상 구매시 사용 가능한 금액할인권의 웹쿠폰",

            },{
                id: 2,
                src: Coupon3,
                required: "null",
                text:"몽드이기자 1만원 금액할인권",
                text2:"- 2F 몽드이가자 매장에서 사용 가능한 금액할인권의 웹쿠폰",

            },{
                id: 3,
                src: IceCream,
                required: "null",
                text:"백미당 아이스크림 1EA 쿠폰 교환권",
                text2:"- B1 백미당 매장에서 사용 가능한 교환권의 웹쿠폰",

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