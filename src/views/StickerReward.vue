<template>
    <div @click.stop="next()" class="loading-container" :style="bgStyle">
        <div v-show="index < 2" class=" top-section">
            <div class="text-container1">
                <p>마음에 드는 캐릭터 스티커를 골라주세요.</p>
            </div>
        </div>
        <div v-show="index < 2" class="image-container">
            <button @click.stop="navigateToPreviousImage()"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"
                    viewBox="0 0 42 42" fill="none">
                    <circle cx="21" cy="21" r="21" fill="white" />
                    <mask id="mask0_253_201" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="9" y="9" width="24"
                        height="24">
                        <rect x="9" y="9" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_253_201)">
                        <path
                            d="M18.55 21L25.9 28.35C26.15 28.6 26.2708 28.8917 26.2625 29.225C26.2542 29.5583 26.125 29.85 25.875 30.1C25.625 30.35 25.3333 30.475 25 30.475C24.6667 30.475 24.375 30.35 24.125 30.1L16.425 22.425C16.225 22.225 16.075 22 15.975 21.75C15.875 21.5 15.825 21.25 15.825 21C15.825 20.75 15.875 20.5 15.975 20.25C16.075 20 16.225 19.775 16.425 19.575L24.125 11.875C24.375 11.625 24.6708 11.5042 25.0125 11.5125C25.3542 11.5208 25.65 11.65 25.9 11.9C26.15 12.15 26.275 12.4417 26.275 12.775C26.275 13.1083 26.15 13.4 25.9 13.65L18.55 21Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
            <img :src="currentImageSrc" alt="Loading..." />
            <button @click.stop="navigateToNextImage()"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"
                    viewBox="0 0 42 42" fill="none">
                    <circle cx="21" cy="21" r="21" fill="white" />
                    <mask id="mask0_253_206" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="10" y="9" width="24"
                        height="24">
                        <rect x="10" y="9" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_253_206)">
                        <path
                            d="M24.475 21L17.125 13.65C16.875 13.4 16.7542 13.1042 16.7625 12.7625C16.7708 12.4208 16.9 12.125 17.15 11.875C17.4 11.625 17.6958 11.5 18.0375 11.5C18.3792 11.5 18.675 11.625 18.925 11.875L26.6 19.575C26.8 19.775 26.95 20 27.05 20.25C27.15 20.5 27.2 20.75 27.2 21C27.2 21.25 27.15 21.5 27.05 21.75C26.95 22 26.8 22.225 26.6 22.425L18.9 30.125C18.65 30.375 18.3583 30.4958 18.025 30.4875C17.6917 30.4792 17.4 30.35 17.15 30.1C16.9 29.85 16.775 29.5542 16.775 29.2125C16.775 28.8708 16.9 28.575 17.15 28.325L24.475 21Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>

        </div>
        <div v-show="index >= 2" class="image-container2">
            <div class="reward-container">
                <img src="@resource/common/sticker_reward_bg.png" />
                <img :src="currentImageSrc" />
                <p class="p">{{ currentImageText }}</p>
            </div>
        </div>
        <div v-show="index === 1" class="button-container">
            <button @click.stop="getReward()">획득하기</button>
        </div>

        <div class="text-container2">
            <img :src="characterContent.src" alt="Description" class="overlap-image" />
            <p class="character-name">{{ selectCharacterName }}</p>
            <hr class="character-line">
            <p class="character-text" id="typed-text"></p>
        </div>

    </div>
</template>

<script>
import { ref, computed, watch, onMounted, inject } from 'vue'
import router from '../router'
import { useCharacterStore } from '../stores/characterStore.js'
import { useRewardsStore } from '../stores/reward.js'

const IMAGES = [
    new URL('@resource/storageBox/Bell_Reward.png', import.meta.url).href,
    new URL('@resource/storageBox/Uno_Reward.png', import.meta.url).href,
    new URL('@resource/storageBox/Sorina_Reward.png', import.meta.url).href
]

const TEXTS = [
    '마법사 벨 스티커',
    '웨어울프 우노 스티커',
    '뱀파이어 소리나 스티커'
]

export default {
    name: 'StickerReward',
    setup() {
        const audio = ref(null);

        import('@resource/sounds/generaltap.wav')
            .then(src => {
                audio.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio = () => {
            if (audio.value) {
                audio.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };
        const imageIndex = ref(0)
        const characterStore = useCharacterStore()
        const rewardsStore = useRewardsStore()
        const index = ref(0)
        const textIndex = ref(6)
        const eventName = ref('')

        const bgImageUrl = new URL('@resource/common/bg.png', import.meta.url).href;

        const bgStyle = computed(() => {
            return {
                backgroundImage: `url(${bgImageUrl})`,
            }
        })

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])
        const currentImageText = computed(() => TEXTS[imageIndex.value])

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter

            if (router.currentRoute.value.query.eventName === 'shopping') {
                return char.shopping[textIndex.value] || {}
            }
            else if (router.currentRoute.value.query.eventName === 'culture') {
                return char.culture[textIndex.value] || {}
            }
            else if (router.currentRoute.value.query.eventName === 'eatingOut') {
                return char.eatingOut[textIndex.value] || {}
            }
        })

        let typingTimeout;

        const typeText = () => {
            const content = currentCharacterContent.value.text;
            const textContainer = document.getElementById("typed-text");
            let index = 0;

            clearTimeout(typingTimeout);

            textContainer.textContent = "";

            function typing() {
                if (index < content.length) {
                    textContainer.textContent += content.charAt(index);
                    index++;
                    typingTimeout = setTimeout(typing, 50);
                }
            }
            typing();
        };

        const stopAudio = inject('stopAudio');

        const navigateToNextImage = () => {
            playAudio();
            imageIndex.value = (imageIndex.value + 1) % IMAGES.length;
        }

        const navigateToPreviousImage = () => {
            playAudio();
            imageIndex.value = (imageIndex.value - 1 + IMAGES.length) % IMAGES.length;
        }

        const getReward = () => {
            playAudio();
            index.value = 2
            textIndex.value = 8
            switch (imageIndex.value) {
                case 0:
                    localStorage.setItem('item5', 'used')
                    rewardsStore.setRewardsData();
                    break;
                case 1:
                    localStorage.setItem('item6', 'used')
                    rewardsStore.setRewardsData();
                    break;
                case 2:
                    localStorage.setItem('item7', 'used')
                    rewardsStore.setRewardsData();
                    break;
            }
            setTimeout(next, 5000);
        }
        const next = () => {
            if (index.value === 0) {
                index.value = 1
                textIndex.value = 7
                return;
            }
            if (index.value === 2) {
                stopAudio();
                router.push({ path: '/missionout', query: { eventName: eventName.value } });
                return;
            }

        }
        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            eventName.value = router.currentRoute.value.query.eventName;

            setTimeout(typeText, 1000);
            setTimeout(next, 5000)
        })
        watch(() => currentCharacterContent.value.text, () => {
            setTimeout(typeText, 200);
        });

        return {
            currentImageSrc,
            currentImageText,
            navigateToNextImage,
            navigateToPreviousImage,
            getReward,
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter.src,
            selectCharacterName: characterStore.currentCharacter.name,
            next,
            index,
            bgStyle
        }
    }
}
</script>

<style scoped>
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

.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100 * var(--vh));
    background-color: #000;
}

.button-container {
    position: absolute;
    top: calc(60 * var(--vh));
    display: flex;
    flex-direction: column;
    width: 80%;
}

.button-container button {
    border-radius: 100px;
    border: none;
    background: var(--Point-Red, #D50F4A);
    padding: 10px;
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.button-container button:hover {
    background-color: #eee;
}

.image-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: calc(20 * var(--vh));
}


.image-container img {
    width: 60%;
    height: auto;
}

.image-container button {
    background: rgba(0, 0, 0, 0);
    color: #fff;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
}

.image-container2 {
    width: 80%;
    height: calc(35 * var(--vh));
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: calc(25 * var(--vh));
}

.reward-container {
    position: relative;
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
}


.reward-container img:first-child {
    position: absolute;
    top: -10%;
    left: 0;
    width: 100%;
    height: auto;
}

.reward-container img:nth-child(2) {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 55%;
    height: auto;
}

.reward-container p {
    position: absolute;
    top: 15%;
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    max-width: 11ch;
    overflow-wrap: break-word;
    word-break: keep-all;

}

.text-container2 {
    bottom: 0%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: none;
    background-color: #fff;
    width: 100%;
    height: calc(25 * var(--vh));
}

.text-container2 .character-name {
    padding: 7.5px 15px 0 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 34px;
    letter-spacing: -0.6px;
    align-self: flex-start;
}

.text-container2 .character-text {
    padding: 7.5px 150px 7.5px 15px;
    color: #767676;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.45px;
    text-align: left;
    max-width: 20ch;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: left;
}

.character-line {
    width: 90%;
    border: 1px solid #D9D9D9;
    margin: 5px 0 5px 0;
    align-self: center
}


.overlap-image {
    position: absolute;
    top: 30%;
    right: -5%;
    width: 150px;
    height: auto;
    z-index: 1;
    transform: translateY(-50%);
}
</style>