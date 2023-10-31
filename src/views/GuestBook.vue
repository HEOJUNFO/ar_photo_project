<template>
    <div class="capture-preview">
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
                <p>방명록</p>
            </div>
        </div>
        <div class="tabs">
            <button @click="setTab('all')" :class="{ active: currentTab === 'all' }">최고의 사진</button>
            <button @click="setTab('unused')" :class="{ active: currentTab === 'unused' }">예쁜 글 솜씨</button>
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
    name: 'GuestBook',
    setup() {
        const showModal = ref(false);
        const currentTab = ref('all');

        const setTab = (tabName) => {
            currentTab.value = tabName;;
        };
        const confirmBack = () => {
            showModal.value = false;
            router.go(-1);
        };

        const closeModal = () => {
            showModal.value = false;
        };


        const back = () => {
            showModal.value = true;
        };

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);

        });

        return {
            back,
            showModal,
            confirmBack,
            closeModal,
            setTab,
            currentTab,
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
    width: 40%;
}

.tabs button.active {
    background: var(--Main-Pink, #F0D7CA);
    color: var(--Text-Black, #111);
}
</style>