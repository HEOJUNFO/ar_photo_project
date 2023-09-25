<template>
    <div>
        <div class="loading-container" :style="bgStyle">
            <div class=" top-section">
                <img src="@resource/common/AR_Logo_02.png" alt="logo" />
            </div>
            <p class="name">{{ characterName }}</p>
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
            <div id="dialog-box">
                <p id="typed-text"></p>
                <button><svg xmlns="http://www.w3.org/2000/svg" width="44" height="47" viewBox="0 0 44 47" fill="none">
                        <circle cx="22" cy="25" r="22" fill="#922142" />
                        <circle cx="22" cy="22" r="21" fill="#D50F4A" stroke="#922142" stroke-width="2" />
                        <path
                            d="M32.75 20.701C33.75 21.2783 33.75 22.7217 32.75 23.299L17.75 31.9593C16.75 32.5366 15.5 31.815 15.5 30.6603L15.5 13.3397C15.5 12.185 16.75 11.4634 17.75 12.0407L32.75 20.701Z"
                            fill="white" stroke="#D50F4A" />
                    </svg></button>
            </div>
            <div class="button-container2">
                <button @click="selectCharacter()">선택하기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { ref, computed, watch, onMounted } from 'vue'
import router from '../router'


const IMAGES = [
    new URL('@resource/intro/Bell.png', import.meta.url).href,
    new URL('@resource/intro/Sorina.png', import.meta.url).href,
    new URL('@resource/intro/Uno.png', import.meta.url).href,
];


export default {
    name: 'Intro',

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
                if (!audio.value.paused) {
                    audio.value.pause();
                    audio.value.currentTime = 0;
                }
                audio.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        const characterStore = useCharacterStore()
        const index = ref(0)
        const imageIndex = ref(0)
        const bgImageUrl = new URL('@resource/common/bg.png', import.meta.url).href;

        const bgStyle = computed(() => {
            return {
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: 'cover',
            }
        })

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])

        const currentCharacterContent = computed(() => {
            const charText = characterStore.currentCharacter
            return charText?.intro[index.value] || {}
        })

        const characterName = computed(() => characterStore.currentCharacter?.name)



        const selectCharacter = () => {
            playAudio();
            localStorage.setItem('characterID', imageIndex.value)
            setTimeout(() => {
                router.push('/stage')
            }, 1000);
        }

        const navigateToNextImage = () => {
            playAudio();
            imageIndex.value = (imageIndex.value + 1) % IMAGES.length;
            characterStore.setCharacterIndex(imageIndex.value)
            typeText()
        }

        const navigateToPreviousImage = () => {
            playAudio();
            imageIndex.value = (imageIndex.value - 1 + IMAGES.length) % IMAGES.length;
            characterStore.setCharacterIndex(imageIndex.value)
            typeText()
        }

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


        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            characterStore.setCharacterIndex(0)
            setVH();

            window.addEventListener('resize', setVH);



            setTimeout(() => {
                typeText()
            }, 1000);
        })

        return {
            index,
            currentImageSrc,
            navigateToNextImage,
            navigateToPreviousImage,
            characterName: characterName,
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter?.src,
            bgStyle,

            selectCharacter
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
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(25 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 10;
}

.top-section img {
    width: 100%;
    height: auto;
}

.name {
    color: var(--Point-Red, #D50F4A);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 34px;
    letter-spacing: -0.6px;
    position: relative
}

.image-container {
    width: 60%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative
}


.image-container img {
    width: 100%;
    height: auto;
}

.image-container button {
    background: rgba(0, 0, 0, 0);
    color: #fff;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
}

#dialog-box {
    border-radius: 16px;
    border: 2px dashed #D50F4A;
    background: #FFF;
    padding: 10px;
    width: 80%;
    height: calc(20 * var(--vh));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end
}

#dialog-box p {
    font-family: "NanumSquare", sans-serif;
    color: #000;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.5px;
    margin-bottom: 15%;
    max-width: 18ch;
    overflow-wrap: break-word;
    word-break: keep-all;

}

#dialog-box button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
}

.button-container2 {
    position: relative;
    width: 80%;
    background: var(--Main-Pink, #F0D7CA);
    margin-top: calc(5 * var(--vh));


}

.button-container2 button {
    width: 100%;
    padding: 10px;
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
</style>