<template>
    <div @click.stop="bgClick()" class="capture-preview">
        <div class="top-section">
            <div class="side-image-container">
                <button @click="back()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none">
                        <mask id="mask0_81_1024" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                            height="24">
                            <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_81_1024)">
                            <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                                fill="#111111" />
                        </g>
                    </svg></button>
            </div>
            <div class="text-container1">
                <p>보관함</p>
            </div>
        </div>
        <div class="tabs">
            <button @click="setTab('all')" :class="{ active: currentTab === 'all' }">전체</button>
            <button @click="setTab('unused')" :class="{ active: currentTab === 'unused' }">미사용쿠폰</button>
            <button @click="setTab('unacquired')" :class="{ active: currentTab === 'unacquired' }">미획득 보상</button>
            <button @click="setTab('used')" :class="{ active: currentTab === 'used' }">사용완료쿠폰</button>
        </div>
        <div class="list-container" v-if="currentTab === 'all'">
            <div v-for="item in tabData" :key="item.id" class="image-container">
                <img src="@resource/storageBox/bg_reward.png" />
                <img :src="item.src" :class="setGrayscale(item)" />
                <p :class="setGrayText(item)">{{ item.text }}</p>
            </div>
        </div>
        <div class="list-container" v-if="currentTab === 'unused'">
            <div v-for="item in tabData" :key="item.id" class="image-container">
                <img src="@resource/storageBox/bg_reward.png" />
                <img :src="item.src" :class="setGrayscale(item)" />
                <p :class="setGrayText(item)">{{ item.text }}</p>
            </div>
        </div>
        <div class="list-container" v-if="currentTab === 'unacquired'">
            <div v-for="item in tabData" :key="item.id" class="image-container">
                <img src="@resource/storageBox/bg_reward.png" />
                <img :src="item.src" :class="setGrayscale(item)" />
                <p :class="setGrayText(item)">{{ item.text }}</p>
            </div>
        </div>
        <div class="list-container" v-if="currentTab === 'used'">
            <div v-for="item in tabData" :key="item.id" class="image-container">
                <img src="@resource/storageBox/bg_reward.png" />
                <img :src="item.src" :class="setGrayscale(item)" />
                <p :class="setGrayText(item)">{{ item.text }}</p>
            </div>
        </div>
        <div v-if="showModal" class="modal">
            <p>뒤로 돌아갑니다.</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import router from '../router';
import { useRewardsStore } from '../stores/reward.js';

export default {
    name: 'StorageBox',
    setup() {
        const showModal = ref(false);
        const currentTab = ref('all');
        const tabData = ref([]);

        const rewardsStore = useRewardsStore();

        const setTab = (tabName) => {
            currentTab.value = tabName;
            fetchTabData(tabName);
        };

        const fetchTabData = (tabName) => {
            rewardsStore.setRewardsData();
            tabData.value = rewardsStore.fetchTabData(tabName);
        };

        const confirmBack = () => {
            showModal.value = false;
            router.go(-1);
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const bgClick = () => {
            // If there is any functionality you want when background is clicked, add here
        };

        const back = () => {
            showModal.value = true;
        };

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

            fetchTabData('all');
        });

        return {
            back,
            bgClick,
            showModal,
            confirmBack,
            closeModal,
            setTab,
            currentTab,
            tabData,
            setGrayscale,
            setGrayText,
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
    justify-content: center;
    align-items: center;
    z-index: 1;
    background: var(--Main-Pink, #F0D7CA);
}


.side-image-container {
    display: flex;
    align-items: center;
    position: absolute;
    left: 5vw;
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
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: calc(10 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;
    z-index: 3;
    padding-top: 10%;
    transform: translate(-50%, -50%);
}

.modal p {
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
    margin-top: 10%;
    display: flex;
    justify-content: center;
    width: 100%;
}

.modal button {
    width: 50%;
    padding: 10px;
    border: none;
    cursor: pointer;
}



.modal button:first-child {
    border-radius: 0px 0px 0px 16px;
    background: var(--Background_Grey, #D9D9D9);
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.modal button:last-child {
    border-radius: 0px 0px 16px 0px;
    background: var(--Main-Pink, #F0D7CA);
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: calc(5 * var(--vh));
    margin-top: calc(1 * var(--vh));
    z-index: 1;
}

.tabs button {
    border: 1px solid var(--Main-Pink, #F0D7CA);
    border-radius: 100px;
    padding: 5px 10px;
    background: var(--Main-Pink, #fff);
    color: var(--Text-Gray, #767676);
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.tabs button.active {
    background: var(--Main-Pink, #F0D7CA);
    color: var(--Text-Black, #111);
}

.list-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 14ch;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.grayscale {
    filter: grayscale(100%);
}

.graytext {
    color: gray !important
}
</style>