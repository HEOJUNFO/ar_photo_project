<template>
    <div>
        <transition name="fade">
            <div v-if="systemCheck" class="loading-container">
                <img src="@resource/common/bg.png" alt="Loading..." />
                <img id="spinner" src="@resource/common/Spinner.png" />
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
                            </svg></button><span @click="check1Modal = true" style="margin-left: 30px;">쿠폰 저장 등을 위한 쿠키
                            허용</span>
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
                            </svg></button><span @click="check2Modal = true" style="margin-left: 30px;">기기 접근 권한</span>
                        <span class="essential-icon">필수</span>
                    </p>
                    <div class="button-container">
                        <button @click="close">닫기</button>
                        <button @click="start" :style="{ backgroundColor: (check1 && check2) ? '#F0D7CA' : '#D9D9D9' }">동의
                            및 시작</button>
                    </div>
                </div>
                <div v-show="check1Modal" class="terms-modal">
                    <div class="top-section">
                        <div class="side-image-container">
                            <button @click="check1Modal = false"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none">
                                    <mask id="mask0_81_1024" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                        width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_81_1024)">
                                        <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                                            fill="#111111" />
                                    </g>
                                </svg></button>
                        </div>
                        <div class="text-container1">
                            <p>약관 동의</p>
                        </div>
                    </div>
                    <div class="terms-text">
                        <h3>[필수] 쿠폰 저장 등을 위한 쿠키 허용</h3>
                        <p>컬쳐커넥션(이하 당사)은 귀하에게 표시되는 콘텐츠를 사용자 맞춤 정의를 통해 최상의 경험을 제공하기 위해 쿠키를 사용합니다. 쿠키에 대한 자세한 정보는 아래 내용을
                            참조하십시오.
                        </p>
                        <p>- 필수 쿠키: 페이지 탐색, 웹사이트의 보안영역 접속, 검색 등 웹사이트의 기본적인 기능의 활성화를 목적으로 사용되는 쿠키, 필수적인 쿠키 없이는 최적화된 기능 수행이
                            불가하므로 필수 쿠키는 이용자의 별도 동의 없이 활성화됩니다.</p>
                        <p> - 기능 쿠키: 본 쿠키는 쿠폰 저장, 이미 이용한 콘텐츠 처리와 같은 고급 기능과 개인화를 허용합니다. 웹사이트의 행태 및 외관에 영향을 줄 수 있는 접속자 설정을
                            저장하고 사용자에게 도움을 줍니다.</p>
                        <p>
                            - 성능 쿠키: 정보의 익명 수집 및 보고를 통해 웹사이트 운영자가 방문자와 웹사이트 사이의 상호작용을 이해하는데 도움을 주며, 유저와의 상호관계에 대한 통계자료를
                            제공함으로써 웹사이트 운영자가 더욱 최적화된 웹사이트를 개발하는데 기여하는 쿠키입니다.
                        </p>
                    </div>
                </div>
                <div v-show="check2Modal" class="terms-modal">
                    <div class="top-section">
                        <div class="side-image-container">
                            <button @click="check2Modal = false"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none">
                                    <mask id="mask0_81_1024" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                        width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_81_1024)">
                                        <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                                            fill="#111111" />
                                    </g>
                                </svg></button>
                        </div>
                        <div class="text-container1">
                            <p>약관 동의</p>
                        </div>
                    </div>
                    <div class="terms-text">
                        <h3>[필수] 기기 접근 권한
                        </h3>
                        <p>- 카메라 : 사진 첨부 기능, 포토 기능, AR 포토 기능, 포토 기능을 활용한 이벤트 참여를 이용할 수 있습니다.
                        </p>
                        <p>- 저장 : 이용 과정에서 웹에 파일을 업로드/다운로드 하는 기능을 이용할 수 있습니다.</p>

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
    setup(props, { emit }) {

        const systemCheck = ref(true)
        const showModal = ref(false);
        const check1 = ref(true);
        const check2 = ref(true);
        const check1Modal = ref(false);
        const check2Modal = ref(false);

        const buttonCheck1 = () => {
            check1.value = !check1.value

        }

        const buttonCheck2 = () => {
            check2.value = !check2.value
        }

        const start = async () => {
            if (!check1.value || !check2.value) return

            try {
                let stream = await navigator.mediaDevices.getUserMedia({ video: true });

                stream.getTracks().forEach(track => track.stop());

                localStorage.setItem('consentGiven', 'true');
                systemCheck.value = false
            } catch (err) {
                console.error("Error accessing the camera: ", err);
            }
            emit('closed');
        }


        const close = () => {
            router.go(-1)
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }


        onMounted(() => {
            window.scrollTo(0, 0);
            setVH();
            window.addEventListener('resize', setVH);

            document.body.style.overflow = 'hidden';

            localStorage.setItem('characterID', 0);

            // if (localStorage.getItem('characterID') === null && router.currentRoute.value.path !== '/intro') {
            //     router.push('/intro')


            //     localStorage.setItem('item1', "null")
            //     localStorage.setItem('item2', "null")
            //     localStorage.setItem('item3', "null")
            //     localStorage.setItem('item4', "null")
            //     localStorage.setItem('item5', "null")
            //     localStorage.setItem('item6', "null")
            //     localStorage.setItem('item7', "null")

            //     return
            // }

            if (localStorage.getItem('consentGiven') === 'true') {
                showModal.value = false
            }
            else {
                showModal.value = true
                return

            }

            setTimeout(() => {
                systemCheck.value = false
                emit('closed');
            }, 1000);
        })
        return { systemCheck, showModal, start, close, buttonCheck1, buttonCheck2, check1, check2, check1Modal, check2Modal }
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
    max-width: 30ch;
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

.terms-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #fff;
}

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

.terms-text h3 {
    margin-top: 20px;
}

.terms-text p {
    margin-top: 20px;
}
</style>