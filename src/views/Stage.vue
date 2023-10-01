<template>
    <div class="main" :style="bgStyle">
        <div class="top-section">
            <div class="text-container1">
                <p id="typed-text"></p>
            </div>
        </div>
        <div class="side-image-container">
            <img :src="characterContent.src" alt="Side Image" />
        </div>
        <div v-show="!eventModal" class="list-container">
            <div v-for="item in eventData" :key="item.id" @click="setEvent(item)">
                <img :src="item.icon" :class="{ 'grayscale': setGrayscale(item), 'odd-background': isOdd(item.id) }"
                    :key="item.id" />
                <div class="text-conainer2" :class="{ 'grayscale': setGrayscale(item) }">
                    <p class="p1" :class="setGrayText(item)">{{ item.title1 }}</p>
                    <p class="p2" :class="setGrayText(item)">{{ item.title2 }}</p>
                </div>
                <p :class="setGrayText(item)">{{ item.title3 }}</p>
                <button v-if="item.required === 'true'" class="used-button">참여완료</button>
            </div>
        </div>
        <div class="button-container2">
            <button @click="normalReward()"><img src="@resource/reward/reward_active.png" />일반보상</button>
            <button @click="home()"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24"
                    fill="none">
                    <g clip-path="url(#clip0_541_2147)">
                        <path
                            d="M17.2484 23.9912C17.2484 23.9176 17.2484 23.8577 17.2484 23.7982C17.2484 21.5947 17.2359 19.3909 17.2559 17.1874C17.2621 16.5041 16.7792 16.0095 16.1148 16.0247C15.0577 16.049 13.9992 16.0548 12.9424 16.0229C12.2393 16.0016 11.7427 16.4883 11.7516 17.2294C11.7775 19.3973 11.7608 21.5655 11.7608 23.7337C11.7608 23.814 11.7608 23.8942 11.7608 23.9906C11.6989 23.9936 11.6464 23.9985 11.594 23.9985C9.58325 23.9988 7.57221 24.0003 5.56148 23.9982C4.71804 23.9973 4.08791 23.4744 3.94401 22.6604C3.92316 22.5419 3.92167 22.4184 3.92167 22.2972C3.92047 19.6022 3.92137 16.9071 3.91809 14.2121C3.91809 14.1024 3.95623 14.0395 4.03786 13.975C7.49237 11.2563 10.9454 8.5358 14.3966 5.81283C14.4777 5.74899 14.5256 5.74261 14.6108 5.80979C18.0698 8.53914 21.5312 11.2651 24.9893 13.9954C25.0411 14.0364 25.0846 14.1261 25.0846 14.193C25.0894 16.9084 25.0914 19.6234 25.0876 22.3388C25.0861 23.3097 24.4241 23.9939 23.4814 23.9967C21.4457 24.0024 19.4102 23.9985 17.3744 23.9982C17.3399 23.9982 17.3056 23.9945 17.249 23.9912H17.2484Z"
                            fill="#D50F4A" />
                        <path
                            d="M21.7068 5.2941C21.7068 5.20078 21.7068 5.14697 21.7068 5.09317C21.7068 4.15086 21.7065 3.20855 21.7074 2.26624C21.7077 1.73734 22.0023 1.4361 22.5177 1.4358C22.8902 1.43549 23.2626 1.43519 23.635 1.4358C24.1564 1.43671 24.4525 1.74159 24.4525 2.2784C24.4528 3.94507 24.4534 5.61174 24.4504 7.27872C24.4504 7.39484 24.4811 7.46901 24.5753 7.54287C25.8704 8.55783 27.164 9.57461 28.4522 10.5984C29.1556 11.1574 29.1845 12.2246 28.5225 12.7824C28.0116 13.2131 27.3025 13.2216 26.7636 12.7979C25.5328 11.8307 24.3038 10.8607 23.074 9.89226C20.2526 7.67084 17.4303 5.45034 14.6107 3.22649C14.526 3.15961 14.4781 3.16448 14.3964 3.22892C10.3782 6.39629 6.35707 9.55972 2.33947 12.728C1.88572 13.0858 1.40159 13.2396 0.854883 13.0165C0.363297 12.8158 0.0749002 12.4222 0.0120368 11.8909C-0.0472515 11.389 0.104991 10.9522 0.513752 10.6303C4.74169 7.30121 8.96903 3.97091 13.1967 0.640913C13.3263 0.538779 13.4556 0.436037 13.5858 0.334511C14.1578 -0.112022 14.8281 -0.112022 15.3972 0.335423C17.096 1.67046 18.7945 3.0058 20.493 4.34084C20.8857 4.64968 21.2786 4.9579 21.7068 5.2941Z"
                            fill="#D50F4A" />
                    </g>
                    <defs>
                        <clipPath id="clip0_541_2147">
                            <rect width="29" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg></button>
            <button @click="premiumReward()"><img src="@resource/reward/premium_active.png" />프리미엄보상</button>
        </div>
        <div class="bottom-section">
        </div>
        <div v-if="eventModal" class="event-modal">
            <button @click="eventModal = false" class="close-button"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                    height="25" viewBox="0 0 24 25" fill="none">
                    <mask id="mask0_541_1012" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                        height="25">
                        <rect width="24" height="24.2118" fill="#D9D9D9"
                            :class="{ 'grayscale': setGrayscale(selectEvent) }" />
                    </mask>
                    <g mask="url(#mask0_541_1012)">
                        <path
                            d="M12 13.5182L7.10005 18.4614C6.91672 18.6464 6.68338 18.7389 6.40005 18.7389C6.11672 18.7389 5.88338 18.6464 5.70005 18.4614C5.51672 18.2765 5.42505 18.0411 5.42505 17.7553C5.42505 17.4694 5.51672 17.234 5.70005 17.0491L10.6 12.1059L5.70005 7.16262C5.51672 6.97767 5.42505 6.74228 5.42505 6.45644C5.42505 6.17061 5.51672 5.93522 5.70005 5.75027C5.88338 5.56531 6.11672 5.47284 6.40005 5.47284C6.68338 5.47284 6.91672 5.56531 7.10005 5.75027L12 10.6935L16.9 5.75027C17.0834 5.56531 17.3167 5.47284 17.6 5.47284C17.8834 5.47284 18.1167 5.56531 18.3 5.75027C18.4834 5.93522 18.575 6.17061 18.575 6.45644C18.575 6.74228 18.4834 6.97767 18.3 7.16262L13.4 12.1059L18.3 17.0491C18.4834 17.234 18.575 17.4694 18.575 17.7553C18.575 18.0411 18.4834 18.2765 18.3 18.4614C18.1167 18.6464 17.8834 18.7389 17.6 18.7389C17.3167 18.7389 17.0834 18.6464 16.9 18.4614L12 13.5182Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
            <div class="top-area" :class="{ 'grayscale': setGrayscale(selectEvent) }">
                <img :src="selectEvent.icon" class="top-image" :class="{ 'odd-background': isOdd(selectEvent.id) }" />
                <div class="text-area">
                    <p class="p_1">{{ selectEvent.content1 }}</p>
                    <p class="p_2">{{ selectEvent.content2 }}</p>
                    <p class="p_3">{{ selectEvent.content3 }}</p>
                </div>
            </div>
            <div class="grey-area" :class="{ 'grayscale': setGrayscale(selectEvent) }">
                <img src="@resource/common/event_logo.png" class="image_1" />
                <img :src="selectEvent.src" alt="Image 2" class="image_2" />
                <p class="p_4">{{ selectEvent.content4 }}</p>
                <p class="p_5">{{ selectEvent.content5 }}</p>
            </div>
            <button v-if="selectEvent.required === 'true'" class="used-button2">참여완료</button>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { useEventStore } from '../stores/event.js'
import { ref, computed, watch, onMounted, inject } from 'vue'
import router from '../router'


export default {
    name: 'Stage',
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

        const eventModal = ref(false)
        const selectEvent = ref(null)
        const eventData = ref([])
        const characterStore = useCharacterStore()
        const eventStore = useEventStore();
        const textIndex = ref(3)
        const bgImageUrl = new URL('@resource/common/bg.png', import.meta.url).href;

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter
            return char?.common4[textIndex.value] || {}
        })

        const fechData = () => {
            eventStore.setEventsData()
            const data = eventStore.fetchData()
            eventData.value = data
        }

        let typingTimeout;

        const typeText = () => {
            const content = "자, 다음은 어디로 갈래? 원하는 곳을 누르면 위치를 알려줄게."
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

        const setGrayscale = (item) => {
            return item.required === 'true' ? 'grayscale' : '';
        };

        const setGrayText = (item) => {
            return item.required === 'true' ? 'graytext' : '';
        };

        const isOdd = (id) => {
            return id !== 7 && id % 2 === 1;
        }

        const setEvent = (item) => {
            playAudio()
            selectEvent.value = item;
            eventModal.value = true;
        }

        const normalReward = () => {
            playAudio()
            router.push('/storagebox2')
        }
        const premiumReward = () => {
            playAudio()
            router.push('/storagebox')
        }

        const home = () => {
            playAudio()

            router.push('/stage')
        }


        const bgStyle = computed(() => {
            return {
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: 'cover',
            }
        })

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            if (!sessionStorage.getItem('hasReloaded3')) {
                sessionStorage.setItem('hasReloaded3', 'true');
                window.location.reload();
                return;
            }
            setVH();

            window.addEventListener('resize', setVH);

            fechData()

            setTimeout(() => {
                typeText()
            }, 1000);
        })

        return {
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter?.src,
            eventData,
            setGrayscale,
            setGrayText,
            bgStyle,
            isOdd,
            eventModal,
            setEvent,
            selectEvent,
            normalReward,
            premiumReward,
            home
        }
    }
}
</script>

<style scoped>
.main {
    position: fixed;
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    flex-direction: column;
    align-items: center;
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
    top: calc(5 * var(--vh));
}


.text-container1 {
    overflow: visible;
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 90%;
    position: relative;
    border: 2px dashed #D50F4A;
    border-radius: 16px;
    margin-top: calc(10 * var(--vh));
}

.text-container1 p {
    overflow: hidden;
    padding: 20px 10px 20px 10px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    max-width: 25ch;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: left;
}

.side-image-container {
    width: 20%;
    display: flex;
    align-items: center;
    position: fixed;
    right: 2.5%;
    top: calc(2.5 * var(--vh));
    z-index: 2;
}

.side-image-container img {
    background-color: #fff;
    overflow: hidden;
    height: 70%;
    width: 70%;
    display: block;
    clip-path: circle(50%);
    object-fit: cover;
    border: 1px solid #D50F4A;
    border-radius: 100px;
}

.event-modal {
    position: fixed;
    width: 90%;
    height: calc(65 * var(--vh));
    display: flex;
    flex-direction: column;
    align-items: center;
    top: calc(17.5* var(--vh));
    border-radius: 16px;
    border: 2px solid var(--Point-REd, #D50F4A);
    background: #FFF;
    z-index: 90;
}

.grey-area {
    width: 90%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: rgba(217, 217, 217, 0.20);

}

.image_1 {
    width: 80%;
    height: auto;

}

.image_2 {
    width: 65%;
    height: auto;

}


.top-area {
    pointer-events: none;
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.top-image {
    width: 15%;
    height: auto;
    border-radius: 100px;
    background-color: #F0D7CA;
    padding: 10px;


}

.text-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 15%;
}

.p_1 {
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    text-align: left;
}

.p_2 {
    color: var(--Text-Gray, #767676);
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.35px;
    text-align: left;
}

.p_3 {
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    text-align: left;
}

.p_4 {
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.p_5 {
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.3px;
}

.list-container {
    position: fixed;
    width: 100%;
    height: calc(70 * var(--vh));
    display: flex;
    flex-direction: column;
    align-items: center;
    top: calc(17.5* var(--vh));
    overflow-y: scroll;
}

.list-container>div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 85%;
    padding: 10px;
    border-radius: 16px;
    border: 2px solid #D50F4A;
    background: #fff;
    z-index: 1;
    box-shadow: 0px 3px #D50F4A;
}

.list-container img {
    width: auto;
    height: calc(5 * var(--vh));
    margin-right: 10px;
    border-radius: 100px;
    background-color: #F0D7CA;
    padding: 10px;
}

.text-conainer2 {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.text-conainer2 p {
    margin: 0;
}

.list-container>div>p {
    margin-left: 10px;
    color: var(--text_lightgray, #9F9F9F);
    text-align: right;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.grayscale {
    filter: grayscale(100%);
}

.graytext {
    color: gray !important
}

.odd-background {
    background-color: #f9e2b7 !important;
}

.button-container2 {
    position: fixed;
    bottom: calc(4 * var(--vh));
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: calc(10 * var(--vh));
    background-color: rgba(0, 0, 0, 0);
    z-index: 2;
}

.button-container2 button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: var(--Text-White, #FFF);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
    font-family: "NanumSquare", sans-serif;
}

.button-container2 button img {
    width: auto;
    height: calc(5 * var(--vh));
    background-color: #fff;
    border: 4px solid #D50F4A;
    border-radius: 100px;
    padding: 10px;
}

.button-container2 button svg {
    width: calc(5 * var(--vh));
    height: calc(5 * var(--vh));
    background-color: #fff;
    border: 4px solid #D50F4A;
    border-radius: 100px;
    padding: 10px;
    position: absolute;
    bottom: calc(2 * var(--vh));
}

.bottom-section {
    overflow: visible;
    position: fixed;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(12.5 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: #D50F4A;
    bottom: 0;
}

.p1 {
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.p2 {
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #FFF;
    border: NONE;
    padding: 5px 10px;
    cursor: pointer;
}

.used-button {
    position: absolute;
    width: 35%;
    padding: 10px;
    border-radius: 100px;
    background: var(--Main-Green, #06734C);
    border: none;
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
    left: 50%;
    transform: translateX(-50%);
}

.used-button::before {
    content: "";
    position: absolute;
    top: -3px;
    right: -3px;
    bottom: -3px;
    left: -3px;
    border: 1px solid #06734C;
    border-radius: 100px;
    z-index: -1;
}


.used-button2 {
    width: 60%;
    padding: 20px;
    border-radius: 100px;
    background: var(--Main-Green, #06734C);
    border: none;
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    text-align: center;
    z-index: 1;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.used-button2::before {
    content: "";
    position: absolute;
    top: -3px;
    right: -3px;
    bottom: -3px;
    left: -3px;
    border: 1px solid #06734C;
    border-radius: 100px;
    z-index: -1;
}
</style>