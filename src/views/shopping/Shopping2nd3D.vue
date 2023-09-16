<template>
    <div class="main">
        <div class="top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container2">
                <img :src="currentCharacter.src" alt="Side Image" />
            </div>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="capture-container">
            <button onclick="captureImage()"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                    viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                    <circle cx="35" cy="35" r="33.5" stroke="white" stroke-opacity="0.8" stroke-width="3" />
                    <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                </svg></button>
        </div>
        <div class="switch-container">
            <button onclick="switchCamera()">전환</button>
        </div>
        <div class="side-image-container">
            <img :src="currentCharacter.src" alt="Side Image" />
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../../stores/characterStore.js'
import Experience from '../../three/Experience/Experience.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../../router';

export default {
    name: 'Capture',
    setup() {
        let experience;
        const index = ref(0)
        const textIndex = ref(5)
        const eventName = ref('shopping2')

        const characterStore = useCharacterStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.shopping2[textIndex.value] || {}
        })

        const saveImage = (image) => {
            router.push({ path: '/capturepreview', query: { imgData: image, eventName: eventName.value } });
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;

            // 삼성 브라우저 감지
            const isSamsungBrowser = /SamsungBrowser/i.test(navigator.userAgent);

            if (isSamsungBrowser) {
                // 삼성 브라우저의 경우 보정 값을 적용
                // vh = vh * 0.;  // 예: 현재 값의 95%로 설정. 원하는 비율로 조정하세요.
            }

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);
        });

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()
        });

        return {
            index,
            currentCharacter,
            characterContent: currentCharacterContent,
        }
    }
}
</script>

<style scoped>
.main {
    height: 100%;
    width: 100%;
    position: fixed;
}

.webgl-container {
    height: calc(100 * var(--vh));
    width: 100%;
    top: 0vh;
    position: absolute;
    overflow: hidden;
}

.webgl {
    position: fixed;
    left: 0;
    outline: none;
    overflow: hidden;
}

.side-image-container {
    overflow: hidden;
    position: absolute;
    top: calc(55 * var(--vh));
    right: -70%;
    transform: translateX(-50%);
    z-index: 2;
}

.side-image-container img {
    overflow: hidden;
    height: 50%;
    width: 50%;
    display: block;
}

.capture-container {
    overflow: hidden;
    position: absolute;
    top: calc(90 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.switch-container {
    overflow: hidden;
    position: absolute;
    top: calc(90 * var(--vh));
    left: 75%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.capture-container button {
    overflow: hidden;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #555;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
}

.top-section {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    margin-top: calc(2.5 * var(--vh));
}


.text-container1 {
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 70%;
    position: relative;
    border-radius: 16px;
    margin-left: 5%;
}

.text-container1::before {
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #fff;
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
}

.text-container1 p {
    overflow: hidden;
    padding: 15px;
    color: #000;
    font-family: NanumSquare;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
}

.side-image-container2 {
    overflow: hidden;
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container2 img {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: block;
}
</style>