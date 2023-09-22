<template>
    <div class="loading-container" @click.stop="next()" :style="bgStyle">
        <div class=" top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="characterContent.src" alt="Side Image" />
            </div>
        </div>
        <div v-show="index <= 0">
            <div v-for="icon in icons" :key="icon.id" class="icon-container" :style="{ left: icon.x, top: icon.y }">
                <img v-show="(icon.id === iconId) || (icon.id === clearIcon)" :src="currentCharacter.maker"
                    style="position:absolute; width: auto; height:100%; margin-top: -100%; " />
                <img @click.stop="nextMap(icon)" :src="icon.active ? icon.imgSrcA : icon.imgSrcB"
                    style="width: 100%; height: 100%; pointer-events: auto;" />
                <p
                    style="color: #111;font-size: 10px; font-style: normal;font-weight: 700;line-height: 34px;letter-spacing: -0.6px; position:absolute; font-family: 'NanumSquare', sans-serif; margin-top:100%;">
                    {{ icon.text }}</p>
            </div>
        </div>
        <div v-show="index === 1 || index === 2" class="icon-container2" :style="{ left: iconX, top: iconY }">
            <img v-show="iconId === 1" src="@resource/tutorial/Gemston_Green.png" />
            <img v-show="iconId !== 1" src="@resource/tutorial/Gemston_Pink.png" />
        </div>
        <div class="image-container">
            <img v-show="index <= 0" src="@resource/tutorial/story_tree_bg.png">
            <img v-show="index === 1 || index === 2" src="@resource/tutorial/map.png">
        </div>
        <div v-show="index >= 3" class="image-container2">
            <img :src="currentMap" :style="{ transform: `scale(${zoom}) translate(${currentX}px, ${currentY}px)` }"
                alt="Loading..." @touchstart="startDrag" @touchmove="drag" @touchend="endDrag" @touchcancel="endDrag" />
        </div>
        <div v-show="index >= 3" class="button-container1">
            <button @click.stop="zoomIn">+</button>
            <button @click.stop="zoomOut">-</button>
        </div>
        <div v-show="index >= 3" class="bottom-container2">
            <div class="text-content">
                <p class="medium-text">{{ currentText }}</p>
                <p class="large-text">{{ currentLargeText }}</p>
            </div>
            <div class="image-right">
                <img :src="currentMiniMap" alt="Description of Image">
            </div>
        </div>
        <div v-show="index >= 3" class="footer">
            <button @click.stop="storeBox()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_291_2249" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                        height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_291_2249)">
                        <path
                            d="M5 20C4.45 20 3.97917 19.8042 3.5875 19.4125C3.19583 19.0208 3 18.55 3 18V4C3 3.45 3.19583 2.97917 3.5875 2.5875C3.97917 2.19583 4.45 2 5 2H19C19.55 2 20.0208 2.19583 20.4125 2.5875C20.8042 2.97917 21 3.45 21 4V18C21 18.55 20.8042 19.0208 20.4125 19.4125C20.0208 19.8042 19.55 20 19 20H5ZM5 18H19V15H16C15.5 15.6333 14.9042 16.125 14.2125 16.475C13.5208 16.825 12.7833 17 12 17C11.2167 17 10.4792 16.825 9.7875 16.475C9.09583 16.125 8.5 15.6333 8 15H5V18ZM12 15C12.6333 15 13.2083 14.8167 13.725 14.45C14.2417 14.0833 14.6 13.6 14.8 13H19V4H5V13H9.2C9.4 13.6 9.75833 14.0833 10.275 14.45C10.7917 14.8167 11.3667 15 12 15Z"
                            fill="#111111" />
                    </g>
                </svg>보관함</button>
            <button @click.stop="picture()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_291_2263" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                        height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_291_2263)">
                        <path
                            d="M12 17.5C13.25 17.5 14.3125 17.0625 15.1875 16.1875C16.0625 15.3125 16.5 14.25 16.5 13C16.5 11.75 16.0625 10.6875 15.1875 9.8125C14.3125 8.9375 13.25 8.5 12 8.5C10.75 8.5 9.6875 8.9375 8.8125 9.8125C7.9375 10.6875 7.5 11.75 7.5 13C7.5 14.25 7.9375 15.3125 8.8125 16.1875C9.6875 17.0625 10.75 17.5 12 17.5ZM12 15.5C11.3 15.5 10.7083 15.2583 10.225 14.775C9.74167 14.2917 9.5 13.7 9.5 13C9.5 12.3 9.74167 11.7083 10.225 11.225C10.7083 10.7417 11.3 10.5 12 10.5C12.7 10.5 13.2917 10.7417 13.775 11.225C14.2583 11.7083 14.5 12.3 14.5 13C14.5 13.7 14.2583 14.2917 13.775 14.775C13.2917 15.2583 12.7 15.5 12 15.5ZM4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V7C2 6.45 2.19583 5.97917 2.5875 5.5875C2.97917 5.19583 3.45 5 4 5H7.15L8.4 3.65C8.58333 3.45 8.80417 3.29167 9.0625 3.175C9.32083 3.05833 9.59167 3 9.875 3H14.125C14.4083 3 14.6792 3.05833 14.9375 3.175C15.1958 3.29167 15.4167 3.45 15.6 3.65L16.85 5H20C20.55 5 21.0208 5.19583 21.4125 5.5875C21.8042 5.97917 22 6.45 22 7V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM4 19H20V7H15.95L14.125 5H9.875L8.05 7H4V19Z"
                            fill="#1C1B1F" />
                    </g>
                </svg>사진</button>
            <button @click.stop="guestBook()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_291_2256" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                        height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_291_2256)">
                        <path
                            d="M5 18H19V8.825L14.175 4H5V18ZM5 20C4.45 20 3.97917 19.8042 3.5875 19.4125C3.19583 19.0208 3 18.55 3 18V4C3 3.45 3.19583 2.97917 3.5875 2.5875C3.97917 2.19583 4.45 2 5 2H15L21 8V18C21 18.55 20.8042 19.0208 20.4125 19.4125C20.0208 19.8042 19.55 20 19 20H5ZM7 16H17V14H7V16ZM7 12H17V10H7V12ZM7 8H14V6H7V8Z"
                            fill="#111111" />
                    </g>
                </svg>방명록</button>
        </div>
    </div>
</template>

<script>

const premium_active = new URL('@resource/tutorial/map_icon_premium_active.png', import.meta.url).href
const premium_inactive = new URL('@resource/tutorial/map_icon_premium_inactive.png', import.meta.url).href
const normal_active = new URL('@resource/tutorial/map_icon_normal_active.png', import.meta.url).href
const normal_inactive = new URL('@resource/tutorial/map_icon_normal_inactive.png', import.meta.url).href
const map10 = new URL('@resource/tutorial/map_10.png', import.meta.url).href
const minmap10 = new URL('@resource/tutorial/mini_map_10.png', import.meta.url).href
const map09 = new URL('@resource/tutorial/map_09.png', import.meta.url).href
const minmap09 = new URL('@resource/tutorial/mini_map_09.png', import.meta.url).href
const map08 = new URL('@resource/tutorial/map_08.png', import.meta.url).href
const minmap08 = new URL('@resource/tutorial/mini_map_08.png', import.meta.url).href
const map07 = new URL('@resource/tutorial/map_07.png', import.meta.url).href
const minmap07 = new URL('@resource/tutorial/mini_map_07.png', import.meta.url).href
const map06 = new URL('@resource/tutorial/map_06.png', import.meta.url).href
const minmap06 = new URL('@resource/tutorial/mini_map_06.png', import.meta.url).href
const map05 = new URL('@resource/tutorial/map_05.png', import.meta.url).href
const minmap05 = new URL('@resource/tutorial/mini_map_05.png', import.meta.url).href
const map02 = new URL('@resource/tutorial/map_02.png', import.meta.url).href
const minmap02 = new URL('@resource/tutorial/mini_map_02.png', import.meta.url).href
const map01 = new URL('@resource/tutorial/map_01.png', import.meta.url).href
const minmap01 = new URL('@resource/tutorial/mini_map_01.png', import.meta.url).href
const map04 = new URL('@resource/tutorial/map_04.png', import.meta.url).href
const minmap04 = new URL('@resource/tutorial/mini_map_04.png', import.meta.url).href
const map03 = new URL('@resource/tutorial/map_03.png', import.meta.url).href
const minmap03 = new URL('@resource/tutorial/mini_map_03.png', import.meta.url).href


import { onMounted, ref, computed, onBeforeUnmount, hasInjectionContext } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'

export default {
    name: 'Culture',
    data() {
        return {
            icons: [
                {
                    id: 1,
                    imgSrcA: premium_active,
                    imgSrcB: premium_inactive,
                    text: '신비의 숲',
                    x: '13%', y: 'calc(24 * var(--vh))',
                    active: true
                },
                {
                    id: 2,
                    imgSrcA: normal_active,
                    imgSrcB: normal_inactive,
                    text: '휴게공간',
                    x: '55%', y: 'calc(24 * var(--vh))',
                    active: true
                },
                {
                    id: 3,
                    imgSrcA: normal_active,
                    imgSrcB: normal_inactive,
                    text: '부암동 가든',
                    x: '25%', y: 'calc(38 * var(--vh))',
                    active: true
                },
                {
                    id: 4,
                    imgSrcA: normal_active,
                    imgSrcB: normal_inactive,
                    text: '휴게 공간',
                    x: '50%', y: 'calc(38 * var(--vh))',
                    active: true
                },
                {
                    id: 5,
                    imgSrcA: premium_active,
                    imgSrcB: premium_inactive,
                    text: '몽드 이기자',
                    x: '15%', y: 'calc(52 * var(--vh))',
                    active: true
                },
                {
                    id: 6,
                    imgSrcA: normal_active,
                    imgSrcB: normal_inactive,
                    text: 'VP존',
                    x: '39%', y: 'calc(52 * var(--vh))',
                    active: true
                },
                {
                    id: 7,
                    imgSrcA: premium_active,
                    imgSrcB: premium_inactive,
                    text: '휴게공간',
                    x: '63%', y: 'calc(52 * var(--vh))',
                    active: true
                },
                {
                    id: 8,
                    imgSrcA: normal_active,
                    imgSrcB: normal_inactive,
                    text: '더웨이브',
                    x: '39%', y: 'calc(65 * var(--vh))',
                    active: true
                },
                {
                    id: 9,
                    imgSrcA: premium_active,
                    imgSrcB: premium_inactive,
                    text: 'F&B 중앙',
                    x: '25%', y: 'calc( 77* var(--vh))',
                    active: true
                },
                {
                    id: 10,
                    imgSrcA: normal_active,
                    imgSrcB: normal_inactive,
                    text: '푸드에비뉴',
                    x: '50%', y: 'calc(77 * var(--vh))',
                    active: true
                },

            ]
        }
    },
    mounted() {
        for (let i = 1; i < 10; i++) {
            const itemValue = localStorage.getItem(`clear${i}`);

            if (itemValue === 'true') {
                this.icons[i - 1].active = false
            }

        }
    },
    setup() {

        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(10)
        const zoom = ref(1)
        const dragging = ref(false)
        const currentX = ref(0)
        const currentY = ref(0)
        const lastX = ref(0)
        const lastY = ref(0)
        const iconId = ref(0)
        const iconX = ref('')
        const iconY = ref('')
        const currentMap = ref('')
        const currentMiniMap = ref('')
        const currentText = ref('')
        const currentLargeText = ref('')
        const previewicon = ref(null)
        const clearIcon = ref(null)

        const bgImageUrl = new URL('@resource/common/bg.png', import.meta.url).href;

        const bgStyle = computed(() => {
            return {
                backgroundImage: `url(${bgImageUrl})`,
            }
        })


        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            if (index.value === 0) {
                return currentCharacter.value.intro[textIndex.value] || {}
            } else {
                if (iconId.value === 1) {
                    iconX.value = '37%';
                    iconY.value = 'calc(28* var(--vh))';
                    currentMap.value = map10
                    currentMiniMap.value = minmap10
                    currentText.value = '5F 남문 방면 휴게공간'
                    currentLargeText.value = '신비의 숲'
                    return currentCharacter.value.common4[textIndex.value]
                } else if (iconId.value === 2) {
                    iconX.value = '50%';
                    iconY.value = 'calc(36 * var(--vh))';
                    currentMap.value = map09
                    currentMiniMap.value = minmap09
                    currentX.value = -250
                    currentY.value = -10
                    currentText.value = '4F 북문 방면 중앙창문 앞'
                    currentLargeText.value = '휴게공간'
                    return currentCharacter.value.common3[textIndex.value]
                } else if (iconId.value === 3) {
                    iconX.value = '40%';
                    iconY.value = 'calc(50 * var(--vh))';
                    currentMap.value = map08
                    currentMiniMap.value = minmap08
                    currentY.value = -100
                    currentText.value = '3F 그린동 남문 방면'
                    currentLargeText.value = '부암동 가든'
                    return currentCharacter.value.common2[textIndex.value]
                } else if (iconId.value === 4) {
                    iconX.value = '49%';
                    iconY.value = 'calc(48 * var(--vh))';
                    currentMap.value = map07
                    currentMiniMap.value = minmap07
                    currentX.value = -250
                    currentY.value = -10
                    currentText.value = '3F 북문 방면 중앙창문 앞'
                    currentLargeText.value = '휴게공간'
                    return currentCharacter.value.common1[textIndex.value]
                } else if (iconId.value === 5) {
                    iconX.value = '44%';
                    iconY.value = 'calc(57 * var(--vh))';
                    currentMap.value = map06
                    currentMiniMap.value = minmap06
                    currentX.value = -330
                    currentText.value = '2F 오렌지동 북문 방면'
                    currentLargeText.value = '몽드 이기자'
                    return currentCharacter.value.culture2[textIndex.value]
                } else if (iconId.value === 6) {
                    iconX.value = '41%';
                    iconY.value = 'calc(61 * var(--vh))';
                    currentMap.value = map05
                    currentMiniMap.value = minmap05
                    currentX.value = -250
                    currentY.value = -80
                    currentText.value = '2F 북문 방면 중앙창문 앞'
                    currentLargeText.value = 'VP존'
                    return currentCharacter.value.culture[textIndex.value]
                } else if (iconId.value === 7) {
                    iconX.value = '51%';
                    iconY.value = 'calc(59 * var(--vh))';
                    currentMap.value = map02
                    currentMiniMap.value = minmap02
                    currentX.value = -60
                    currentY.value = -70
                    currentText.value = '2F 남문 방면 중앙창문 앞'
                    currentLargeText.value = '휴게공간'
                    return currentCharacter.value.shopping2[textIndex.value]
                } else if (iconId.value === 8) {
                    iconX.value = '39%';
                    iconY.value = 'calc(70 * var(--vh))';
                    currentMap.value = map01
                    currentMiniMap.value = minmap01
                    currentX.value = -180
                    currentY.value = 40
                    currentText.value = '1F 오렌지동 에스컬레이터 옆'
                    currentLargeText.value = 'The Wave'
                    return currentCharacter.value.shopping[textIndex.value]
                } else if (iconId.value === 9) {
                    iconX.value = '45%';
                    iconY.value = 'calc(84 * var(--vh))';
                    currentMap.value = map04
                    currentMiniMap.value = minmap04
                    currentY.value = -100
                    currentText.value = 'B1 중앙 에스컬레이터 앞'
                    currentLargeText.value = 'F&B 중앙'
                    return currentCharacter.value.eatingOut2[textIndex.value]
                } else if (iconId.value === 10) {
                    iconX.value = '50%';
                    iconY.value = 'calc(81 * var(--vh))';
                    currentX.value = -180
                    currentMap.value = map03
                    currentMiniMap.value = minmap03
                    currentText.value = 'B1 식품관 입구'
                    currentLargeText.value = '푸드 애비뉴'
                    return currentCharacter.value.eatingOut[textIndex.value]
                }
            }
        })

        const storeBox = () => {
            router.push({ name: 'StorageBox' })
        }
        const picture = () => {
            router.push({ name: 'Capture' })
        }
        const guestBook = () => {
            router.push({ name: 'GuestBook' })
        }

        const nextMap = (icon) => {

            if (index.value === 0) {
                previewicon.value = icon
                index.value = 1
                textIndex.value = 0
                iconId.value = icon.id

                clearIcon.value = 0

            }

        }

        const next = () => {
            console.log(index.value)
            if (index.value === 1) {
                index.value = 2
                textIndex.value = 1
                localStorage.setItem(`clear${iconId.value}`, true)
                return;
            }
            if (index.value === 2) {
                index.value = 3
                textIndex.value = 2
                return;
            }

        }

        const zoomIn = () => {
            zoom.value += 0.1;
        }

        const zoomOut = () => {
            if (zoom.value > 0) {
                zoom.value -= 0.1;
            }
        }

        const startDrag = (event) => {
            event.preventDefault()
            dragging.value = true
            lastX.value = event.touches[0].clientX
            lastY.value = event.touches[0].clientY
        }

        const drag = (event) => {
            if (!dragging.value) return
            event.preventDefault()
            const deltaX = event.touches[0].clientX - lastX.value
            const deltaY = event.touches[0].clientY - lastY.value
            currentX.value += deltaX
            currentY.value += deltaY
            lastX.value = event.touches[0].clientX
            lastY.value = event.touches[0].clientY
        }

        const endDrag = () => {
            console.log(currentX.value, currentY.value)
            dragging.value = false
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            document.body.style.overflowY = 'hidden';
            setVH();

            window.addEventListener('resize', setVH);

            if (router.currentRoute.value.query.eventName === 'common4Clear') {
                clearIcon.value = 1
            }
        });

        return {
            index,
            currentCharacter,
            characterContent: currentCharacterContent,
            next,
            zoomIn,
            zoomOut,
            zoom,
            startDrag,
            drag,
            endDrag,
            currentX,
            currentY,
            nextMap,
            iconX,
            iconY,
            iconId,
            currentMap,
            currentMiniMap,
            currentText,
            currentLargeText,
            clearIcon,
            storeBox,
            picture,
            guestBook,
            bgStyle
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
    margin-top: calc(5 * var(--vh));
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
    right: -10px;
    top: 30%;
    transform: translateY(-50%);
}

.text-container1 p {
    overflow: hidden;
    padding: 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    overflow-wrap: break-word;
    word-break: keep-all;
}



.side-image-container {
    margin-top: calc(-5 * var(--vh));
    position: absolute;
    overflow: hidden;
    width: 20%;
    display: flex;
    align-items: center;
    right: 0%;
}

.side-image-container img {
    background-color: #FFECD6;
    overflow: hidden;
    height: 70%;
    width: 70%;
    display: block;
    clip-path: circle(50%);
    object-fit: cover;
}

.image-container {
    overflow: hidden;
    width: 100%;
    height: calc(80 * var(--vh));
    position: absolute;
    bottom: 0;
    z-index: 0;
}

.image-container img {
    width: 100%;
    height: 100%;
}

.image-container2 {
    overflow: hidden;
    width: 100%;
    height: calc(80 * var(--vh));
    position: absolute;
    bottom: 0;
    z-index: 0;
}

.image-container2 img {
    width: auto;
    height: 100%;
}

.button-container1 {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    bottom: calc(15 * var(--vh));
    z-index: 10;
}

.button-container1 button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
    display: flex;
    border: none;
    color: #fff;
    font-size: 32px;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.bottom-container2 {
    position: absolute;
    bottom: calc(15 * var(--vh));
    left: 20%;
    transform: translateX(-20%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
    padding: 10px 30px 10px 20px;
    width: 65%;
}

.text-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.medium-text {
    color: #111;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    max-width: 15ch;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.large-text {
    color: #111;
    font-family: "NanumSquare", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 34px;
    letter-spacing: -0.6px;
}

.image-right {
    width: 40%;
    height: 20%;
    background-color: rgba(0, 0, 0, 0.0);

}

.image-right img {
    padding-left: 5%;
    padding-top: 5%;
    clip-path: circle(35%);

}

.icon-container {
    overflow: visible;
    pointer-events: none;
    position: absolute;
    width: auto;
    height: calc(10 * var(--vh));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
    bottom: 0;

}

.icon-container2 {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    width: 10%;
    height: calc(10 * var(--vh));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.footer {
    position: absolute;
    bottom: 0%;
    height: calc(10 * var(--vh));
    width: 100%;
    background-color: #fff;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    align-items: center;
    justify-content: center;
    border-radius: 16px 16px 0px 0px;

}

.footer button {
    margin: 0;
    padding: 0;
    background-color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: NanumSquare;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: -0.3px;
    border-radius: 16px 16px 0px 0px;
}

.footer button:hover {
    background-color: #777;
}
</style>