<template>
    <div class="capture-preview">
        <div v-if="showHelp" class=" top-section3">
            <div class="text-container3">
                <p>원하는 선물을 선택하고 <span style="color:#d50f4a">[사용하기]</span>버튼을 클릭해봐.</p>
            </div>
        </div>
        <div v-show="showOverlay" @click="showHelp = false, showOverlay = false" class="overlay"></div>
        <div class="top-section">
            <div class="side-image-container">
                <button @click="back()"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                        fill="none">
                        <circle cx="20" cy="20" r="19" fill="#D50F4A" stroke="white" stroke-width="2" />
                        <mask id="mask0_541_1585" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                            height="24">
                            <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_541_1585)">
                            <path
                                d="M15.825 21L20.725 25.9C20.925 26.1 21.0209 26.3333 21.0125 26.6C21.0042 26.8667 20.9 27.1 20.7 27.3C20.5 27.4833 20.2667 27.5792 20 27.5875C19.7334 27.5958 19.5 27.5 19.3 27.3L12.7 20.7C12.6 20.6 12.5292 20.4917 12.4875 20.375C12.4459 20.2583 12.425 20.1333 12.425 20C12.425 19.8667 12.4459 19.7417 12.4875 19.625C12.5292 19.5083 12.6 19.4 12.7 19.3L19.3 12.7C19.4834 12.5167 19.7125 12.425 19.9875 12.425C20.2625 12.425 20.5 12.5167 20.7 12.7C20.9 12.9 21 13.1375 21 13.4125C21 13.6875 20.9 13.925 20.7 14.125L15.825 19H27C27.2834 19 27.5209 19.0958 27.7125 19.2875C27.9042 19.4792 28 19.7167 28 20C28 20.2833 27.9042 20.5208 27.7125 20.7125C27.5209 20.9042 27.2834 21 27 21H15.825Z"
                                fill="white" />
                        </g>
                    </svg></button>
            </div>
            <div class="text-container1">
                <p>프리미엄 보상 보관함</p>
            </div>
            <div class="side-image-container">
                <button @click="showHelp = true, showOverlay = true"><svg xmlns="http://www.w3.org/2000/svg" width="40"
                        height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="19" fill="#D50F4A" stroke="white" stroke-width="2" />
                        <mask id="mask0_541_1590" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                            height="24">
                            <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_541_1590)">
                            <path
                                d="M22.6 16.075C22.6 15.3583 22.3625 14.7833 21.8875 14.35C21.4125 13.9167 20.7833 13.7 20 13.7C19.5167 13.7 19.0792 13.8042 18.6875 14.0125C18.2958 14.2208 17.9583 14.525 17.675 14.925C17.4083 15.3083 17.0458 15.5292 16.5875 15.5875C16.1292 15.6458 15.7333 15.525 15.4 15.225C15.1667 15.0083 15.0375 14.7417 15.0125 14.425C14.9875 14.1083 15.0667 13.8083 15.25 13.525C15.7833 12.725 16.4625 12.1042 17.2875 11.6625C18.1125 11.2208 19.0167 11 20 11C21.6167 11 22.9292 11.4583 23.9375 12.375C24.9458 13.2917 25.45 14.4917 25.45 15.975C25.45 16.725 25.2917 17.4 24.975 18C24.6583 18.6 24.075 19.3083 23.225 20.125C22.6083 20.7083 22.1917 21.1625 21.975 21.4875C21.7583 21.8125 21.6167 22.1833 21.55 22.6C21.4833 23 21.3125 23.3333 21.0375 23.6C20.7625 23.8667 20.4333 24 20.05 24C19.6667 24 19.3375 23.8708 19.0625 23.6125C18.7875 23.3542 18.65 23.0333 18.65 22.65C18.65 22 18.7917 21.4042 19.075 20.8625C19.3583 20.3208 19.8333 19.75 20.5 19.15C21.35 18.4 21.9125 17.8208 22.1875 17.4125C22.4625 17.0042 22.6 16.5583 22.6 16.075ZM20 30C19.45 30 18.9792 29.8042 18.5875 29.4125C18.1958 29.0208 18 28.55 18 28C18 27.45 18.1958 26.9792 18.5875 26.5875C18.9792 26.1958 19.45 26 20 26C20.55 26 21.0208 26.1958 21.4125 26.5875C21.8042 26.9792 22 27.45 22 28C22 28.55 21.8042 29.0208 21.4125 29.4125C21.0208 29.8042 20.55 30 20 30Z"
                                fill="white" />
                        </g>
                    </svg></button>
            </div>
        </div>
        <div class="list-container">
            <div v-for="item in tabData" :key="item.id" class="image-container" @click="useItem(item)">
                <img src="@resource/storageBox/bg_reward3.png" :class="setGrayscale(item)" />
                <img :src="item.src" :class="setGrayscale(item)" />
                <p :class="setGrayText(item)">{{ item.text }}</p>
                <button v-if="item.required === 'used'" class="used-button">사용완료</button>
            </div>
        </div>
        <div v-if="useModal" class="image-container2">
            <img :src="useItemSrc" />
            <hr class="character-line">
            <p class="p1">{{ useItemText }}</p>
            <p class="p2">유효기간 2023.11.01 ~ 2023.12.31</p>
            <p class="p3">
                <br>
                <span style="color: black;">상품정보</span><br>
                <span>{{ useItemText2 }}</span><br>
                <br>
                <span style="color: black;">교환장소</span><br>
                - 5F 사은행사장<br>
                <br>
                <span style="color: black;">유의사항</span><br>
                - 기간 내 1아이디당 1회 롯데백화점 앱 교환권으로 교환 가능합니다.<br>
                - 이 쿠폰은 본 서비스 기간인 10/6 ~ 10/22 까지, 롯데백화점 분당점에서만 교환가능한 웹쿠폰입니다.<br>
                - 실제 사은품(금액할인권 및 교환권)은 5F 사은행사장에서 확인 후 롯데백화점 앱 쿠폰으로 교환됩니다.<br>
                - 웹쿠폰은 매장에서 사용 불가능하며, 반드시 롯데백화점 앱 쿠폰으로 교환하여야 사용 가능합니다.<br>
                - 본 혜택은 현금과 교환되지 않습니다.<br>
                - 본 쿠폰은 당사 사정에 따라 예고 없이 변경 또는 중단될 수 있습니다.<br>
                - 쿠폰별 세부 유의사항은 롯데백화점 앱에 발급된 쿠폰의 상세 내용을 참조해주세요.<br>
            </p>
            <button @click="useModal2 = true, showOverlay = true">사용하기</button>
        </div>
        <div v-if="useModal2" class="text-container2">
            <p class="character-name">쿠폰을 서비스 라운지를 통해</p>
            <p class="character-name">사용처리 해주세요.</p>
            <hr class="character-line">
            <p class="character-text">서비스라운지 직원분 께서는</p>
            <p class="character-text"><span style="color:#d50f4a">[사용하기]</span>버튼을 눌러주시기 바랍니다.</p>
            <div class="button-container">
                <button @click="useModal = false, useModal2 = false, showOverlay = false">닫기</button>
                <button @click="useCoupon()">사용하기</button>
            </div>
        </div>
        <div class="button-container2">
            <button @click="normalReward()"><img src="@resource/reward/reward_active.png" />일반보상</button>
            <button @click="home()"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24"
                    fill="none">
                    <g clip-path="url(#clip0_541_2147)">
                        <path
                            d="M17.2484 23.9912C17.2484 23.9176 17.2484 23.8577 17.2484 23.7982C17.2484 21.5947 17.2359 19.3909 17.2559 17.1874C17.2621 16.5041 16.7792 16.0095 16.1148 16.0247C15.0577 16.049 13.9992 16.0548 12.9424 16.0229C12.2393 16.0016 11.7427 16.4883 11.7516 17.2294C11.7775 19.3973 11.7608 21.5655 11.7608 23.7337C11.7608 23.814 11.7608 23.8942 11.7608 23.9906C11.6989 23.9936 11.6464 23.9985 11.594 23.9985C9.58325 23.9988 7.57221 24.0003 5.56148 23.9982C4.71804 23.9973 4.08791 23.4744 3.94401 22.6604C3.92316 22.5419 3.92167 22.4184 3.92167 22.2972C3.92047 19.6022 3.92137 16.9071 3.91809 14.2121C3.91809 14.1024 3.95623 14.0395 4.03786 13.975C7.49237 11.2563 10.9454 8.5358 14.3966 5.81283C14.4777 5.74899 14.5256 5.74261 14.6108 5.80979C18.0698 8.53914 21.5312 11.2651 24.9893 13.9954C25.0411 14.0364 25.0846 14.1261 25.0846 14.193C25.0894 16.9084 25.0914 19.6234 25.0876 22.3388C25.0861 23.3097 24.4241 23.9939 23.4814 23.9967C21.4457 24.0024 19.4102 23.9985 17.3744 23.9982C17.3399 23.9982 17.3056 23.9945 17.249 23.9912H17.2484Z"
                            fill="#D50F4A" />
                        <path
                            d="M21.7068 5.2941C21.7068 5.20078 21.7068 5.14697 21.7068 5.09317C21.7068 4.15086 21.7065 3.20855 21.7074 2.26624C21.7077 1.73734 22.0023 1.4361 22.5177 1.4358C22.8902 1.43549 23.2626 1.43519 23.635 1.4358C24.1564 1.43671 24.4525 1.74159 24.4525 2.2784C24.4528 3.94507 24.4534 5.61174 24.4504 7.27872C24.4504 7.39484 24.4811 7.46901 24.5753 7.54287C25.8704 8.55783 27.164 9.57461 28.4522 10.5984C29.1556 11.1574 29.1845 12.2246 28.5225 12.7824C28.0116 13.2131 27.3025 13.2216 26.7636 12.7979C25.5328 11.8307 24.3038 10.8607 23.074 9.89226C20.2526 7.67084 17.4303 5.45034 14.6107 3.22649C14.526 3.15961 14.4781 3.16448 14.3964 3.22892C10.3782 6.39629 6.35707 9.55972 2.33947 12.728C1.88572 13.0858 1.40159 13.2396 0.854883 13.0165C0.363297 12.8158 0.0749002 12.4222 0.0120368 11.8909C-0.0472515 11.389 0.104991 10.9522 0.513752 10.6303C4.74169 7.30121 8.96903 3.97091 13.1967 0.640913C13.3263 0.538779 13.4556 0.436037 13.5858 0.334511C14.1578 -0.112022 14.8281 -0.112022 15.3972 0.335423C17.096 1.67046 18.7945 3.0058 20.493 4.34084C20.8857 4.64968 21.2786 4.9579 21.7068 5.2941Z"
                            fill="#D50F4A" />
                    </g>
                    <defs>
                        <clipPath id="clip0_541_2147">
                            <rect width="29" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg></button>
            <button @click="premiumReward()"><img src="@resource/reward/premium_active.png" />프리미엄보상</button>
        </div>
        <div class="bottom-section">
        </div>
        <div v-if="showModal2" class="modal2">
            <p>쿠폰이 정상적으로</p>
            <p>사용되었습니다.</p>
            <div class="modal-buttons">
                <button @click="showModal2 = false, useModal = false, showOverlay = false">확인</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, inject } from 'vue';
import router from '../router';
import { useRewardsStore } from '../stores/reward.js';

export default {
    name: 'StorageBox',
    setup() {




        const showModal2 = ref(false);
        const useModal = ref(false);
        const useModal2 = ref(false);
        const tabData = ref([]);
        const useItemSrc = ref('');
        const useItemText = ref('');
        const useItemText2 = ref('');
        const showOverlay = ref(false);
        const showHelp = ref(false)
        const selectedItem = ref(null);

        const rewardsStore = useRewardsStore();

        const fetchTabData = (tabName) => {
            tabData.value = rewardsStore.fetchTabData(tabName);
        };

        const back = () => {
            router.go(-1);
        };

        const useItem = (item) => {


            selectedItem.value = item;
            if (item.required === 'true') {
                useItemSrc.value = item.src;
                useItemText.value = item.text;
                useItemText2.value = item.text2;
                useModal.value = true;
            }
        };

        const useCoupon = () => {

            localStorage.setItem(`premiumItem${selectedItem.value.id}`, 'used');
            rewardsStore.setRewardsData();
            showModal2.value = true;
            useModal2.value = false;

        }

        const normalReward = () => {

            router.push('/storagebox2')
        }
        const premiumReward = () => {

            router.push('/storagebox')
        }



        const home = () => {


            router.push('/stage')
        }

        const setGrayscale = (item) => {
            return item.required === 'true' ? '' : 'grayscale';
        };

        const setGrayText = (item) => {
            return item.required === 'true' ? '' : 'graytext';
        };

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);
            rewardsStore.setRewardsData();
            fetchTabData('premium');
        });

        return {
            back,
            tabData,
            setGrayscale,
            setGrayText,
            useItem,
            useItemSrc,
            useModal,
            useModal2,
            showOverlay,
            showModal2,
            showHelp,
            normalReward,
            premiumReward,
            home,
            useCoupon,
            useItemText,
            useItemText2
        };
    }
}
</script>

<style scoped>
.top-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    background: var(--Point-Red, #D50F4A);
}


.side-image-container {
    display: flex;
    align-items: center;
    width: 15%;
}

.side-image-container button {
    height: 100%;
    width: 100%;
    display: block;
    border: none;
    background: none;
    outline: none;
}

.text-container1 {
    justify-content: center;
    align-items: center;
}

.text-container1 p {
    color: var(--Text-Black, #fff);
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.5px;
}




.list-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-y: scroll;
}

.list-container::-webkit-scrollbar {
    display: none;
}

.image-container {
    position: relative;
    width: 100%;
    height: calc(34 * var(--vh));
}

.image-container img:first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.image-container img:nth-child(2) {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: 50%;
}

.image-container p {
    position: absolute;
    color: black;
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 20px;
    letter-spacing: -0.35px;
    bottom: 12.5%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 14ch;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.image-container2 {
    position: absolute;
    width: 96%;
    height: calc(73 * var(--vh));
    top: calc(11 * var(--vh));
    z-index: 5;
    border-radius: 16px;
    border: 1px solid #D9D9D9;
    background: #FFF;
    box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.05);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.image-container2 img {
    width: 65%;
    height: auto;
    margin-bottom: -5%;
    margin-top: -15%;
}

.image-container2 button {
    margin-top: calc(1 * var(--vh));
    width: 80%;
    padding: 5px;
    border-radius: 100px;
    border: 2px solid var(--Point-Red-Dark, #922142);
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    text-align: center;
    z-index: 1;
    position: relative;
    box-shadow: 0px 3px #922142
}


.character-line {
    width: 90%;
    border: 1px solid #D9D9D9;
    margin: 2% 0 2% 0;
    align-self: center
}



.grayscale {
    filter: grayscale(100%);
}

.graytext {
    color: gray !important
}

.text-container2 {
    bottom: 0%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: none;
    border-radius: 16px 16px 0px 0px;
    background-color: #fff;
    width: 100%;
    height: calc(30 * var(--vh));
    padding-top: calc(2 * var(--vh));
    z-index: 10;
}

.text-container2 .character-name {
    padding: 2.5px 21.5px;
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.5px;
    align-self: flex-start;
    text-align: left;
}

.text-container2 .character-text {
    padding: 5px 12.5px 5px 12.5px;
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    align-self: flex-start;
    text-align: left;
    max-width: 26ch;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.button-container {
    margin-top: calc(0 * var(--vh));
    ;
    display: flex;
    flex-direction: rows;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2.5%;
    border: none;
    background-color: #fff
}

.button-container button:first-child {
    width: 40%;
    padding: 7.5px;
    border-radius: 100px;
    border: 2px solid var(--Text-Gray, #767676);
    background: #D9D9D9;
    color: var(--Text-Gray, #545454);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin-right: 2%;
    box-shadow: 0px 3px #767676
}

.button-container button:last-child {
    width: 40%;
    padding: 7.5px;
    border-radius: 100px;
    border: 2px solid var(--Dark-Red, #922142);
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-Black, #fff);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    box-shadow: 0px 3px #922142
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0.7;
    z-index: 7;
}

.button-container2 {
    position: absolute;
    bottom: calc(4 * var(--vh));
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: calc(10 * var(--vh));
    background-color: rgba(0, 0, 0, 0);
    z-index: 2;
}

.button-container2 button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: var(--Text-White, #FFF);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
    font-family: "NanumSquare", sans-serif;
}

.button-container2 button img {
    width: auto;
    height: calc(5 * var(--vh));
    background-color: #fff;
    border: 4px solid #D50F4A;
    border-radius: 100px;
    padding: 10px;
}

.button-container2 button svg {
    width: calc(5 * var(--vh));
    height: calc(5 * var(--vh));
    background-color: #fff;
    border: 4px solid #D50F4A;
    border-radius: 100px;
    padding: 10px;
    position: absolute;
    bottom: calc(2 * var(--vh));
}

.bottom-section {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(12.5 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: #D50F4A;
    bottom: 0;
}

.modal2 {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: calc(15 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: none;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;
    z-index: 8;
    padding-top: 20px;
    padding-bottom: 10px;
    transform: translate(-50%, -50%);

}

.modal2 p {
    color: #111;
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.modal-buttons {
    display: flex;
    justify-content: center;
    width: 100%;
}

.modal2 button {
    width: 40%;
    padding: 10px;
    border-radius: 100px;
    border: 2px solid var(--Dark-Red, #922142);
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-Black, #fff);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    box-shadow: 0px 3px #922142
}


.top-section3 {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 10;
    margin-top: calc(5 * var(--vh));
}


.text-container3 {
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 95%;
    position: relative;
    border-radius: 16px;
}

.text-container3::before {
    content: "";
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-bottom: 15px solid #fff;
    border-left: 10px solid transparent;
    position: absolute;
    right: 10px;
    top: -5%;
    transform: translateY(-50%);
}

.text-container3 p {
    overflow: hidden;
    padding: 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.used-button {
    width: 30%;
    padding: 10px;
    border-radius: 100px;
    background: var(--Main-Green, #06734C);
    border: none;
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    text-align: center;
    z-index: 1;
    position: fixed;
    outline: 1px solid #06734C;
    outline-offset: 2px;
    transform: rotate(45deg);
    margin-top: 25%;
    margin-left: 10%;
}

.p1 {
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    text-align: left;
    width: 80%;
}

.p2 {
    color: var(--Text-Gray, #767676);
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.3px;
    text-align: left;
    width: 80%;

}

.p3 {
    color: var(--Text-Gray, #767676);
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.3px;
    width: 100%;
    max-width: 40ch;
    overflow-wrap: break-word;
    word-break: keep-all;
    overflow-y: scroll;
    max-height: calc(30 * var(--vh));
}
</style>