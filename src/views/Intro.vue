<template>
    <div>
        <div class="loading-container" :style="bgStyle">
            <div class=" top-section">
                <img src="@resource/common/AR_Logo_02.png" alt="logo" />
            </div>
            <p class="name">{{ characterName }}</p>
            <div class="image-container">
                <button @click.stop="navigateToPreviousImage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                        <g filter="url(#filter0_d_541_79)">
                            <circle cx="26" cy="22" r="21" fill="white" />
                            <circle cx="26" cy="22" r="21.5" stroke="#F8F9FA" />
                        </g>
                        <mask id="mask0_541_79" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="14" y="10" width="24"
                            height="24">
                            <rect x="14.5" y="10.5" width="23" height="23" fill="#D50F4A" stroke="#D50F4A" />
                        </mask>
                        <g mask="url(#mask0_541_79)">
                            <path
                                d="M23.1965 21.6464L22.8429 22L23.1965 22.3535L30.5465 29.7035C30.7062 29.8632 30.7674 30.025 30.7627 30.2125C30.7577 30.4093 30.6868 30.5811 30.5215 30.7464C30.3589 30.909 30.1921 30.975 30 30.975C29.808 30.975 29.6411 30.909 29.4786 30.7464L29.478 30.7459L21.7786 23.0714C21.7785 23.0714 21.7785 23.0713 21.7784 23.0713C21.6239 22.9167 21.5128 22.7482 21.4393 22.5643C21.361 22.3688 21.325 22.1816 21.325 22C21.325 21.8184 21.361 21.6312 21.4393 21.4357C21.5128 21.2517 21.624 21.0831 21.7786 20.9285L29.4786 13.2285C29.6356 13.0715 29.8007 13.0075 30.0003 13.0123C30.2088 13.0174 30.3838 13.0909 30.5465 13.2535C30.709 13.4161 30.775 13.5829 30.775 13.775C30.775 13.967 30.709 14.1339 30.5465 14.2964L23.1965 21.6464Z"
                                fill="#D50F4A" stroke="#D50F4A" />
                        </g>
                        <defs>
                            <filter id="filter0_d_541_79" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_541_79" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_541_79" result="shape" />
                            </filter>
                        </defs>
                    </svg></button>
                <img :src="currentImageSrc" alt="Loading..." />
                <button @click.stop="navigateToNextImage()"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52"
                        viewBox="0 0 52 52" fill="none">
                        <g filter="url(#filter0_d_541_84)">
                            <circle cx="26" cy="22" r="21" fill="white" />
                            <circle cx="26" cy="22" r="21.5" stroke="#F8F9FA" />
                        </g>
                        <mask id="mask0_541_84" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="15" y="10" width="24"
                            height="24">
                            <rect x="15.5" y="10.5" width="23" height="23" fill="#D50F4A" stroke="#D50F4A" />
                        </mask>
                        <g mask="url(#mask0_541_84)">
                            <path
                                d="M29.8285 22.3536L30.1821 22L29.8285 21.6464L22.4785 14.2964C22.3215 14.1394 22.2575 13.9743 22.2623 13.7747C22.2674 13.5662 22.3409 13.3912 22.5035 13.2286C22.6634 13.0687 22.8335 13 23.0375 13C23.2414 13 23.4114 13.0686 23.5712 13.2283C23.5713 13.2284 23.5714 13.2285 23.5714 13.2286L31.2459 20.928L31.2464 20.9286C31.401 21.0831 31.5122 21.2517 31.5858 21.4357C31.664 21.6312 31.7 21.8184 31.7 22C31.7 22.1816 31.664 22.3688 31.5858 22.5643C31.5122 22.7483 31.401 22.9169 31.2464 23.0714L23.5464 30.7714C23.3867 30.9311 23.2249 30.9923 23.0375 30.9877C22.8407 30.9827 22.6689 30.9118 22.5035 30.7464C22.3437 30.5866 22.275 30.4165 22.275 30.2125C22.275 30.0085 22.3437 29.8384 22.5035 29.6786L29.8285 22.3536Z"
                                fill="#D50F4A" stroke="#D50F4A" />
                        </g>
                        <defs>
                            <filter id="filter0_d_541_84" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_541_84" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_541_84" result="shape" />
                            </filter>
                        </defs>
                    </svg></button>
            </div>
            <div id="dialog-box">
                <p id="typed-text"></p>

            </div>
            <div class="button-container2">
                <button @click="selectCharacter()">선택하기</button>
            </div>
            <img class="guide2" src="@resource/common/tap.png" alt="Image 1" />
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { ref, computed, watch, onMounted } from 'vue'
import router from '../router'
import { postData } from '../js/api';


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
            let characterName;
            switch (imageIndex.value) {
                case 0:
                    characterName = 'bell'
                    break;
                case 1:
                    characterName = 'sorina'
                    break;
                case 2:
                    characterName = 'uno'
                    break;
            }
            postData('character_select', characterName)
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
    transition: background-color 0.3s;
    animation: beat2 .35s infinite alternate;
    border: none
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
    justify-content: center
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
    max-width: 19ch;
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
    margin-top: calc(2 * var(--vh));
    margin-bottom: calc(2 * var(--vh));
    background-color: rgba(0, 0, 0, 0);


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



.guide2 {
    width: auto;
    height: 7.5%;
    position: absolute;
    top: calc(90 * var(--vh));
    left: 70%;
    transform: translate(-50%, -50%);
    z-index: 3;
    animation: beat .35s infinite alternate;
    pointer-events: none;
}

@keyframes beat {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.5);
    }
}

@keyframes beat2 {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.2);
    }
}</style>