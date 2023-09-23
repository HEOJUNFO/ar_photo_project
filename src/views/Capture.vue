<template>
    <div class="main">
        <div v-show="showOverlay" @click="showOverlay = false" class="overlay">
            <img src="@resource/common/AR_Logo_02.png" alt="overlay" />
            <div class="tutorial-inner">
                <p>안녕! 반가워</p>
                <p>마음 드는 <span style="color:#FFFF80">사진프레임</span>과</p>
                <p><span style="color:#FFFF80">스티커</span>를 선택해서</p>
                <p>지금부터 사진 촬영을 시작해볼까?</p>
                <br>
                <br>
                <p><span style="color:#FFFF80">#드래그</span>로 캐릭터 이동 가능</p>
                <p><span style="color:#FFFF80">#핀치줌</span>으로 크기 변경도 가능</p>
            </div>
            <div class="bottom-section3">
                <button><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <mask id="mask0_541_2068" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                            height="28">
                            <rect width="28" height="28" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_541_2068)">
                            <path
                                d="M3.5 15.1667V12.8333H5.83333V15.1667H3.5ZM3.5 10.5V8.16667H5.83333V10.5H3.5ZM8.16667 5.83333V3.5H10.5V5.83333H8.16667ZM12.8333 24.5V22.1667H15.1667V24.5H12.8333ZM12.8333 5.83333V3.5H15.1667V5.83333H12.8333ZM17.5 24.5V22.1667H19.8333V24.5H17.5ZM22.1667 19.8333V17.5H24.5V19.8333H22.1667ZM22.1667 15.1667V12.8333H24.5V15.1667H22.1667ZM23.3333 10.5C23.0028 10.5 22.7257 10.3882 22.5021 10.1646C22.2785 9.94097 22.1667 9.66389 22.1667 9.33333V5.83333H18.6667C18.3361 5.83333 18.059 5.72153 17.8354 5.49792C17.6118 5.27431 17.5 4.99722 17.5 4.66667C17.5 4.33611 17.6118 4.05903 17.8354 3.83542C18.059 3.61181 18.3361 3.5 18.6667 3.5H22.1667C22.8083 3.5 23.3576 3.72847 23.8146 4.18542C24.2715 4.64236 24.5 5.19167 24.5 5.83333V9.33333C24.5 9.66389 24.3882 9.94097 24.1646 10.1646C23.941 10.3882 23.6639 10.5 23.3333 10.5ZM5.83333 24.5C5.19167 24.5 4.64236 24.2715 4.18542 23.8146C3.72847 23.3576 3.5 22.8083 3.5 22.1667V18.6667C3.5 18.3361 3.61181 18.059 3.83542 17.8354C4.05903 17.6118 4.33611 17.5 4.66667 17.5C4.99722 17.5 5.27431 17.6118 5.49792 17.8354C5.72153 18.059 5.83333 18.3361 5.83333 18.6667V22.1667H9.33333C9.66389 22.1667 9.94097 22.2785 10.1646 22.5021C10.3882 22.7257 10.5 23.0028 10.5 23.3333C10.5 23.6639 10.3882 23.941 10.1646 24.1646C9.94097 24.3882 9.66389 24.5 9.33333 24.5H5.83333ZM22.1667 24.5V22.1667H24.5C24.5 22.8083 24.2715 23.3576 23.8146 23.8146C23.3576 24.2715 22.8083 24.5 22.1667 24.5ZM3.5 5.83333C3.5 5.19167 3.72847 4.64236 4.18542 4.18542C4.64236 3.72847 5.19167 3.5 5.83333 3.5V5.83333H3.5Z"
                                fill="white" />
                        </g>
                    </svg>프레임 <div class="icon-tutorial-skin">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="35" fill="none" stroke-width="2" stroke="#ffffff"></circle>
                            <circle cx="50" cy="50" r="30" fill="none" stroke-width="2" stroke="#ffffff"></circle>
                        </svg>
                    </div></button>

                <button></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <mask id="mask0_541_2073" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                            height="28">
                            <rect width="28" height="28" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_541_2073)">
                            <path
                                d="M14 14C12.7167 14 11.6181 13.543 10.7042 12.6292C9.7903 11.7153 9.33335 10.6167 9.33335 9.33332C9.33335 8.04999 9.7903 6.95138 10.7042 6.03749C11.6181 5.1236 12.7167 4.66666 14 4.66666C15.2834 4.66666 16.382 5.1236 17.2959 6.03749C18.2097 6.95138 18.6667 8.04999 18.6667 9.33332C18.6667 10.6167 18.2097 11.7153 17.2959 12.6292C16.382 13.543 15.2834 14 14 14ZM4.66669 21V20.0667C4.66669 19.4055 4.83683 18.7979 5.1771 18.2437C5.51738 17.6896 5.96946 17.2667 6.53335 16.975C7.73891 16.3722 8.96391 15.9201 10.2084 15.6187C11.4528 15.3174 12.7167 15.1667 14 15.1667C15.2834 15.1667 16.5472 15.3174 17.7917 15.6187C19.0361 15.9201 20.2611 16.3722 21.4667 16.975C22.0306 17.2667 22.4827 17.6896 22.8229 18.2437C23.1632 18.7979 23.3334 19.4055 23.3334 20.0667V21C23.3334 21.6417 23.1049 22.191 22.6479 22.6479C22.191 23.1049 21.6417 23.3333 21 23.3333H7.00002C6.35835 23.3333 5.80905 23.1049 5.3521 22.6479C4.89516 22.191 4.66669 21.6417 4.66669 21ZM7.00002 21H21V20.0667C21 19.8528 20.9465 19.6583 20.8396 19.4833C20.7327 19.3083 20.5917 19.1722 20.4167 19.075C19.3667 18.55 18.307 18.1562 17.2375 17.8937C16.1681 17.6312 15.0889 17.5 14 17.5C12.9111 17.5 11.832 17.6312 10.7625 17.8937C9.69308 18.1562 8.63335 18.55 7.58335 19.075C7.40835 19.1722 7.26738 19.3083 7.16044 19.4833C7.05349 19.6583 7.00002 19.8528 7.00002 20.0667V21ZM14 11.6667C14.6417 11.6667 15.191 11.4382 15.6479 10.9812C16.1049 10.5243 16.3334 9.97499 16.3334 9.33332C16.3334 8.69166 16.1049 8.14235 15.6479 7.68541C15.191 7.22846 14.6417 6.99999 14 6.99999C13.3584 6.99999 12.809 7.22846 12.3521 7.68541C11.8952 8.14235 11.6667 8.69166 11.6667 9.33332C11.6667 9.97499 11.8952 10.5243 12.3521 10.9812C12.809 11.4382 13.3584 11.6667 14 11.6667Z"
                                fill="white" />
                        </g>
                    </svg>스티커<div class="icon-tutorial-skin">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="35" fill="none" stroke-width="2" stroke="#ffffff"></circle>
                            <circle cx="50" cy="50" r="30" fill="none" stroke-width="2" stroke="#ffffff"></circle>
                        </svg>
                    </div></button>
            </div>
        </div>
        <div class="top-section">
            <button>홈버튼</button>
            <button onclick="switchCamera()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 24C9.44 24 7.135 23.27 5.085 21.81C3.035 20.35 1.58 18.44 0.72 16.08C0.62 15.78 0.65 15.5 0.81 15.24C0.97 14.98 1.21 14.8 1.53 14.7C1.85 14.6 2.155 14.635 2.445 14.805C2.735 14.975 2.94 15.21 3.06 15.51C3.78 17.33 4.95 18.8 6.57 19.92C8.19 21.04 10 21.6 12 21.6C13.72 21.6 15.32 21.175 16.8 20.325C18.28 19.475 19.44 18.3 20.28 16.8H18C17.66 16.8 17.375 16.685 17.145 16.455C16.915 16.225 16.8 15.94 16.8 15.6C16.8 15.26 16.915 14.975 17.145 14.745C17.375 14.515 17.66 14.4 18 14.4H22.8C23.14 14.4 23.425 14.515 23.655 14.745C23.885 14.975 24 15.26 24 15.6V20.4C24 20.74 23.885 21.025 23.655 21.255C23.425 21.485 23.14 21.6 22.8 21.6C22.46 21.6 22.175 21.485 21.945 21.255C21.715 21.025 21.6 20.74 21.6 20.4V19.2C20.46 20.72 19.05 21.9 17.37 22.74C15.69 23.58 13.9 24 12 24ZM12 2.4C10.28 2.4 8.68 2.825 7.2 3.675C5.72 4.525 4.56 5.7 3.72 7.2H6C6.34 7.2 6.625 7.315 6.855 7.545C7.085 7.775 7.2 8.06 7.2 8.4C7.2 8.74 7.085 9.025 6.855 9.255C6.625 9.485 6.34 9.6 6 9.6H1.2C0.86 9.6 0.575 9.485 0.345 9.255C0.115 9.025 0 8.74 0 8.4V3.6C0 3.26 0.115 2.975 0.345 2.745C0.575 2.515 0.86 2.4 1.2 2.4C1.54 2.4 1.825 2.515 2.055 2.745C2.285 2.975 2.4 3.26 2.4 3.6V4.8C3.54 3.28 4.95 2.1 6.63 1.26C8.31 0.42 10.1 0 12 0C14.56 0 16.865 0.73 18.915 2.19C20.965 3.65 22.42 5.56 23.28 7.92C23.38 8.22 23.35 8.5 23.19 8.76C23.03 9.02 22.79 9.2 22.47 9.3C22.15 9.4 21.845 9.365 21.555 9.195C21.265 9.025 21.06 8.79 20.94 8.49C20.22 6.67 19.05 5.2 17.43 4.08C15.81 2.96 14 2.4 12 2.4ZM12 15.6C11 15.6 10.15 15.25 9.45 14.55C8.75 13.85 8.4 13 8.4 12C8.4 11 8.75 10.15 9.45 9.45C10.15 8.75 11 8.4 12 8.4C13 8.4 13.85 8.75 14.55 9.45C15.25 10.15 15.6 11 15.6 12C15.6 13 15.25 13.85 14.55 14.55C13.85 15.25 13 15.6 12 15.6Z"
                        fill="white" />
                </svg></button>
            <button @click="back()">X</button>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>

        <div class="bottom-section">
            <button @click="frameToggle()">프레임</button>
            <button onclick="captureImage()"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                    viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                    <circle cx="35" cy="35" r="33.5" stroke="white" stroke-opacity="0.8" stroke-width="3" />
                    <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                </svg></button>
            <button @click="stickerToggle()">스티커</button>
        </div>

        <div v-if="frameList">
            <div class="image-container">
                <img v-for="imageObj in FRAMES" :src="imageObj.src" :alt="imageObj.text" />
            </div>
        </div>

        <div v-if="stickerList">
            <div class="image-container">
                <img @click="setCharacter()" src="@resource/icon/bell_model.png" alt="모델링" />
                <img @click="setSticker(imageObj.name)" v-for="imageObj in STICKERS" :src="imageObj.src"
                    :alt="imageObj.text" />
            </div>
        </div>

        <div v-if="showModal" class="modal">
            <p>뒤로 돌아갑니다.</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
        <div class="frame">
            <img src="@resource/frame/spring.png" alt="봄" />
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { useImageDataStore } from '../stores/imageData.js'
import Experience from '../ar/capture/Experience.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../router';

export default {
    name: 'capture',
    setup() {
        let experience;
        const showModal = ref(false);
        const eventName = ref('capture')
        const frameList = ref(false)
        const showOverlay = ref(true)
        const stickerList = ref(false)

        const enableFilp = ref(true)

        const characterStore = useCharacterStore()
        const imageDataStore = useImageDataStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common4[textIndex.value] || {}
        })

        const FRAMES = [
            { id: 0, src: new URL('@resource/icon/frame_01.png', import.meta.url).href, text: '봄' },
            { id: 1, src: new URL('@resource/icon/frame_02.png', import.meta.url).href, text: '여름' },
            { id: 2, src: new URL('@resource/icon/frame_03.png', import.meta.url).href, text: '가을' },
            { id: 3, src: new URL('@resource/icon/frame_04.png', import.meta.url).href, text: '겨울' },
        ];

        const STICKERS = [
            { id: 0, src: new URL('@resource/icon/Bell_01.png', import.meta.url).href, name: 'bellNormal' },
            { id: 1, src: new URL('@resource/icon/Bell_02.png', import.meta.url).href, name: 'bellHappy' },
            { id: 2, src: new URL('@resource/icon/Bell_03.png', import.meta.url).href, name: 'bellWelcome' },
            { id: 3, src: new URL('@resource/icon/uno_01.png', import.meta.url).href, name: 'sorinaNormal' },
            { id: 4, src: new URL('@resource/icon/uno_02.png', import.meta.url).href, name: 'sorinaHappy' },
            { id: 5, src: new URL('@resource/icon/uno_03.png', import.meta.url).href, name: 'sorinaWelcome' },
            { id: 6, src: new URL('@resource/icon/sorina_01.png', import.meta.url).href, name: 'unoNormal' },
            { id: 7, src: new URL('@resource/icon/sorina_02.png', import.meta.url).href, name: 'unoHappy' },
            { id: 8, src: new URL('@resource/icon/sorina_03.png', import.meta.url).href, name: 'unoWelcome' },




        ]

        const stickerToggle = () => {
            stickerList.value = !stickerList.value
            frameList.value = false
        }

        const frameToggle = () => {
            stickerList.value = false
            frameList.value = !frameList.value
        }

        const setSticker = (name) => {
            experience.world.setSticker(name)
        }
        const setCharacter = () => {
            experience.world.setCharacter()
        }

        const saveImage = (image) => {
            imageDataStore.setImageData(image)
            imageDataStore.setEventName(eventName.value)
            router.push({ path: '/capturereview' });
        }

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
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);
            experience.resources.on('ready', () => {
                console.log('ready')
            })
        });

        onBeforeRouteLeave(() => {

            experience.dispose()

            experience.destroy()
            experience.init()
        });

        return {
            enableFilp,
            back,
            showModal,
            confirmBack,
            closeModal,
            frameList,
            showOverlay,
            FRAMES,
            stickerList,
            stickerToggle,
            frameToggle,
            STICKERS,
            setSticker,
            setCharacter,
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.webgl-container {
    height: calc(70 * var(--vh));
    width: calc((4/6) * 70 * var(--vh));
    top: calc(10 * var(--vh));
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

}

.webgl {
    position: relative;
    outline: none;
}

.top-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    background: var(--Main-Pink, #F0D7CA);
}

.top-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;

}

.top-section button svg {
    width: auto;
    height: calc(5* var(--vh));

}

.bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(20 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: var(--Main-Pink, #F0D7CA);
    position: absolute;
    bottom: 0;
}


.bottom-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;
}

.bottom-section button svg {
    width: auto;
    height: calc(10* var(--vh));

}

.image-container {
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: calc(10 * var(--vh));
    position: absolute;
    z-index: 2;
    top: calc(68 * var(--vh));
    left: 3%;

}

.image-container img {
    width: calc(10 * var(--vh));
    height: calc(10 * var(--vh));
    margin-right: 3%;
}

.image-container {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
}

.image-container::-webkit-scrollbar {
    display: none !important;
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

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
}

.overlay img {
    position: absolute;
    top: calc(30 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: auto;
}

.tutorial-inner {
    position: absolute;
    top: calc(50 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: auto;
}

.tutorial-inner p {
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    letter-spacing: -0.4px;
}


.bottom-section3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(20 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
}


.bottom-section3 button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.bottom-section3 button svg {
    width: auto;
    height: calc(5* var(--vh));

}

.frame {
    position: absolute;
    top: calc(10* var(--vh));
    width: 100%;
    height: auto;
    pointer-events: none;
}

.frame img {
    width: 100%;
    height: 100%;
}

.icon-tutorial-skin {
    position: absolute;
    width: 100%;
    animation: beat .35s infinite alternate;
    transform-origin: center;
    opacity: 0.5;
    margin-top: 5%;
}

@keyframes beat {
    from {
        transform: scale(2);
    }

    to {
        transform: scale(3);
    }
}
</style>