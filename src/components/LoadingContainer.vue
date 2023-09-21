<template>
    <div>
        <transition name="fade">
            <div v-if="systemCheck" class="loading-container">
                <img src="../resource/common/bg.png" alt="Loading..." />
                <img id="spinner" src="../resource/common/Spinner.png" />
                <div v-if="showModal" class="text-container2">
                    <p class="character-name">푸짐한 상품과 콘텐츠를</p>
                    <p class="character-name">제공해드리기 위해</p>
                    <p class="character-name">동의가 필요해요</p>
                    <hr class="character-line">
                    <p class="character-text"><button @click="buttonCheck1()" :class="{ active: check1 }"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_253_1392" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_253_1392)">
                                    <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                                    <path d="M10.25 16.45L17.3 9.4L15.9 8L10.25 13.65L7.4 10.8L6 12.2L10.25 16.45Z"
                                        fill="white" />
                                </g>
                            </svg></button><span style="margin-left: 30px;">쿠키 관련 동의 약관</span>
                        <span class="essential-icon">필수</span>
                    </p>
                    <p class="character-text"><button @click="buttonCheck2()" :class="{ active: check2 }"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_253_1392" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_253_1392)">
                                    <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                                    <path d="M10.25 16.45L17.3 9.4L15.9 8L10.25 13.65L7.4 10.8L6 12.2L10.25 16.45Z"
                                        fill="white" />
                                </g>
                            </svg></button><span style="margin-left: 30px;">쿠키 관련 동의 약관</span>
                        <span class="essential-icon">필수</span>
                    </p>
                    <div class="button-container">
                        <button @click="close">닫기</button>
                        <button @click="start">동의 및 시작</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue'
import router from '../router'
import { createRouterMatcher } from 'vue-router'

export default {
    name: 'LoadingContainer',
    setup() {

        const systemCheck = ref(true)
        const showModal = ref(false);
        const check1 = ref(false);
        const check2 = ref(false);

        const buttonCheck1 = () => {
            check1.value = !check1.value
            console.log(check1.value)
        }

        const buttonCheck2 = () => {
            check2.value = !check2.value
        }

        const start = () => {
            localStorage.setItem('consentGiven', 'true');
            systemCheck.value = false
        }

        const close = () => {
            router.go(-1)
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }


        onMounted(() => {

            if (localStorage.getItem('consentGiven') === 'true') {
                showModal.value = false
            }
            else {
                showModal.value = true
            }

            setTimeout(() => {
                document.body.style.overflow = 'hidden';
                if (localStorage.getItem('characterID') === null && router.currentRoute.value.path !== '/intro') {
                    router.push('/intro')

                    localStorage.setItem('item1', "null")
                    localStorage.setItem('item2', "null")
                    localStorage.setItem('item3', "null")
                    localStorage.setItem('item4', "null")
                    localStorage.setItem('item5', "null")
                    localStorage.setItem('item6', "null")
                    localStorage.setItem('item7', "null")


                    return
                }

                systemCheck.value = false

            }, 1000);
            setVH();

            window.addEventListener('resize', setVH);

        })
        return { systemCheck, showModal, start, close, buttonCheck1, buttonCheck2, check1, check2 }
    }
}
</script>
  
<style scoped>
.loading-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100 * var(--vh));
    z-index: 5;
}


.loading-container img {
    width: 100%;
    height: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

#spinner {
    position: fixed;
    width: calc(20 * var(--vh));
    height: calc(20 * var(--vh));
    animation: spin 2s linear infinite;
    top: calc(35 * var(--vh));
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
    height: calc(45 * var(--vh));
    padding-top: 5%
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
    padding: 7.5px 15px 7.5px 15px;
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    align-self: flex-start;
    text-align: left;
    max-width: 25ch;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.character-line {
    width: 90%;
    border: 1px solid #D9D9D9;
    margin: 2% 0 2% 0;
    align-self: center
}

.button-container {
    margin-top: 5%;
    display: flex;
    flex-direction: rows;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2.5%
}

.button-container button:first-child {
    width: 45%;
    border-radius: 16px;
    background: var(--Background_Grey, #D9D9D9);
    padding: 15px 30px;
    border: none;
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.button-container button:last-child {
    width: 45%;
    border-radius: 16px;
    background: var(--Main-Pink, #F0D7CA);
    padding: 15px 20px;
    border: none;
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.essential-icon {
    display: inline-block;
    margin-left: 10px;
    background: var(--Point-Red-BG, rgba(213, 15, 74, 0.10));
    border-radius: 16px;
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.3px;
    padding: 2px 4px;
}

.character-text button {
    position: absolute;
    margin-right: 10px;
    background-color: rgba(0, 0, 0, 0);
    border: none;

}

.character-text button.active svg circle {
    fill: #F0D7CA;
}
</style>