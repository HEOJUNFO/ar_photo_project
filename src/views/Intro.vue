<template>
    <div>
        <loading-container>
        </loading-container>
        <div class="loading-container" style="background-image: url('../resource/common/bg.png');">
            <div class=" top-section">
                <div class="text-container1">
                    <p>숲에 동행할 요정을 골라주세요</p>
                </div>
            </div>
            <div class="image-container">
                <button @click.stop="navigateToPreviousImage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                        <circle cx="21" cy="21" r="21" fill="white" />
                        <mask id="mask0_177_686" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="9" y="9" width="24"
                            height="24">
                            <rect x="9" y="9" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_177_686)">
                            <path
                                d="M18.55 21L25.9 28.35C26.15 28.6 26.2708 28.8917 26.2625 29.225C26.2542 29.5583 26.125 29.85 25.875 30.1C25.625 30.35 25.3333 30.475 25 30.475C24.6667 30.475 24.375 30.35 24.125 30.1L16.425 22.425C16.225 22.225 16.075 22 15.975 21.75C15.875 21.5 15.825 21.25 15.825 21C15.825 20.75 15.875 20.5 15.975 20.25C16.075 20 16.225 19.775 16.425 19.575L24.125 11.875C24.375 11.625 24.6708 11.5042 25.0125 11.5125C25.3542 11.5208 25.65 11.65 25.9 11.9C26.15 12.15 26.275 12.4417 26.275 12.775C26.275 13.1083 26.15 13.4 25.9 13.65L18.55 21Z"
                                fill="#D50F4A" />
                        </g>
                    </svg></button>
                <img :src="currentImageSrc" alt="Loading..." />
                <button @click.stop="navigateToNextImage()"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"
                        viewBox="0 0 42 42" fill="none">
                        <circle cx="21" cy="21" r="21" fill="white" />
                        <mask id="mask0_177_685" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="10" y="9" width="24"
                            height="24">
                            <rect x="10" y="9" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_177_685)">
                            <path
                                d="M24.475 21L17.125 13.65C16.875 13.4 16.7542 13.1042 16.7625 12.7625C16.7708 12.4208 16.9 12.125 17.15 11.875C17.4 11.625 17.6958 11.5 18.0375 11.5C18.3792 11.5 18.675 11.625 18.925 11.875L26.6 19.575C26.8 19.775 26.95 20 27.05 20.25C27.15 20.5 27.2 20.75 27.2 21C27.2 21.25 27.15 21.5 27.05 21.75C26.95 22 26.8 22.225 26.6 22.425L18.9 30.125C18.65 30.375 18.3583 30.4958 18.025 30.4875C17.6917 30.4792 17.4 30.35 17.15 30.1C16.9 29.85 16.775 29.5542 16.775 29.2125C16.775 28.8708 16.9 28.575 17.15 28.325L24.475 21Z"
                                fill="#D50F4A" />
                        </g>
                    </svg></button>
            </div>
            <div class="text-container2">
                <p class="character-name">{{ characterName }}</p>
                <hr class="character-line">
                <p class="character-text">{{ characterContent.text }}</p>
                <div class="button-container">
                    <button v-show="index === 0" @click.stop="next()">
                        선택하기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { ref, computed, watch, onMounted } from 'vue'
import router from '../router'
import LoadingContainer from '../components/LoadingContainer.vue'

const IMAGES = [
    '../resource/intro/bell.png',
    '../resource/intro/uno.png',
    '../resource/intro/sorina.png',
]


export default {
    name: 'Intro',
    components: {
        LoadingContainer
    },
    setup() {
        const characterStore = useCharacterStore()
        const index = ref(0)
        const imageIndex = ref(0)

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])

        const currentCharacterContent = computed(() => {
            const charText = characterStore.currentCharacter
            return charText?.intro[index.value] || {}
        })

        const characterName = computed(() => characterStore.currentCharacter?.name)


        const handleScroll = () => {
            preventDefault()
            stopPropagation()
        }


        const next = () => {
            localStorage.setItem('characterID', imageIndex.value)
            setTimeout(() => {
                router.push('/intro3d')
            }, 1000);

        }

        const navigateToNextImage = () => {
            imageIndex.value = (imageIndex.value + 1) % IMAGES.length;
            characterStore.setCharacterIndex(imageIndex.value)
        }

        const navigateToPreviousImage = () => {
            imageIndex.value = (imageIndex.value - 1 + IMAGES.length) % IMAGES.length;
            characterStore.setCharacterIndex(imageIndex.value)
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            characterStore.setCharacterIndex(0)
            setVH();

            window.addEventListener('resize', setVH);
        })

        return {
            index,
            next,
            currentImageSrc,
            navigateToNextImage,
            navigateToPreviousImage,
            characterName: characterName,
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter?.src,
            handleScroll
        }
    }
}
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100 * var(--vh));
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
    z-index: 10;
}


.text-container1 {
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 85%;
    position: relative;
    border-radius: 16px;
    margin-left: 5%;
    margin-top: calc(2.5 * var(--vh));
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
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
}

.text-container2 {
    bottom: 0%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: none;
    border-radius: 0px;
    background-color: #fff;
    width: 100%;
    height: calc(30 * var(--vh));
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
    color: #767676;
    font-family: "NanumSquare", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.45px;
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
    width: 80%;
    border-radius: 100px;
    background: var(--Main-Pink, #F0D7CA);
    padding: 15px 15px;
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

.image-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: calc(20 * var(--vh));
}


.image-container img {
    width: 60%;
    height: 100%;
}

.image-container button {
    background: rgba(0, 0, 0, 0);
    color: #fff;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
}
</style>