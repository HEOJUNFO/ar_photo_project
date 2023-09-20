<template>
    <div @click.stop="next()" style="background-image: url('../resource/common/bg.png'); background-size: cover;"
        class="main">
        <div class=" top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="characterContent.src" alt="Side Image" />
            </div>
        </div>
        <div v-show="index <= 1">
            <div v-for="icon in icons" :key="icon.id" class="icon-container" :style="{ left: icon.x, top: icon.y }">
                <img v-show="icon.id === iconId" :src="currentCharacter.maker"
                    style="position:absolute; width: 20%; height:auto; margin-top: -25%;" />
                <img @click.stop="nextMap(icon)" :src="icon.active ? icon.imgSrcA : icon.imgSrcB"
                    style="width: 10; height: 10%; pointer-events: auto;" />
                <p
                    style="color: #111;font-size: 10px; font-style: normal;font-weight: 700;line-height: 34px;letter-spacing: -0.6px; position:absolute; font-family: 'NanumSquare', sans-serif; margin-top: 22%;">
                    {{ icon.text }}</p>
            </div>
        </div>
        <div v-show="index === 2" class="icon-container2" :style="{ left: iconX, top: iconY }">
            <img v-show="iconId === 1" src="../resource/tutorial/Gemston_Green.png" />
            <img v-show="iconId !== 1" src="../resource/tutorial/Gemston_Pink.png" />
        </div>
        <div class="image-container">
            <img v-show="index <= 1" src="../resource/tutorial/story_tree_bg.png">
            <img v-show="index === 2" src="../resource/tutorial/map.png">
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
    </div>
</template>

<script>

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
                    imgSrcA: '../resource/tutorial/map_icon_premium_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_premium_inactive.png',
                    text: '신비의 숲',
                    x: '-27%', y: 'calc(-21 * var(--vh))',
                    active: true
                },
                {
                    id: 2,
                    imgSrcA: '../resource/tutorial/map_icon_normal_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_normal_inactive.png',
                    text: '휴게공간',
                    x: '15%', y: 'calc(-21 * var(--vh))',
                    active: true
                },
                {
                    id: 3,
                    imgSrcA: '../resource/tutorial/map_icon_normal_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_normal_inactive.png',
                    text: '부암동 가든',
                    x: '-15%', y: 'calc(-7 * var(--vh))',
                    active: true
                },
                {
                    id: 4,
                    imgSrcA: '../resource/tutorial/map_icon_normal_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_normal_inactive.png',
                    text: '휴게 공간',
                    x: '12%', y: 'calc(-7 * var(--vh))',
                    active: true
                },
                {
                    id: 5,
                    imgSrcA: '../resource/tutorial/map_icon_premium_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_premium_inactive.png',
                    text: '몽드 이기자',
                    x: '-27%', y: 'calc(7 * var(--vh))',
                    active: true
                },
                {
                    id: 6,
                    imgSrcA: '../resource/tutorial/map_icon_normal_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_normal_inactive.png',
                    text: 'VP존',
                    x: '-2%', y: 'calc(7 * var(--vh))',
                    active: true
                },
                {
                    id: 7,
                    imgSrcA: '../resource/tutorial/map_icon_premium_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_premium_inactive.png',
                    text: '휴게공간',
                    x: '25%', y: 'calc(7 * var(--vh))',
                    active: true
                },
                {
                    id: 8,
                    imgSrcA: '../resource/tutorial/map_icon_normal_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_normal_inactive.png',
                    text: '더웨이브',
                    x: '-2%', y: 'calc(21 * var(--vh))',
                    active: true
                },
                {
                    id: 9,
                    imgSrcA: '../resource/tutorial/map_icon_premium_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_premium_inactive.png',
                    text: 'F&B 중앙',
                    x: '-16%', y: 'calc(33 * var(--vh))',
                    active: true
                },
                {
                    id: 10,
                    imgSrcA: '../resource/tutorial/map_icon_normal_active.png',
                    imgSrcB: '../resource/tutorial/map_icon_normal_inactive.png',
                    text: '푸드에비뉴',
                    x: '13%', y: 'calc(33 * var(--vh))',
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


        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            if (index.value === 0) {
                return currentCharacter.value.intro[textIndex.value] || {}
            } else {
                if (iconId.value === 1) {
                    iconX.value = '-8%';
                    iconY.value = 'calc(-17 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_10.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_10.png'
                    currentText.value = '5F 남문 방면 휴게공간'
                    currentLargeText.value = '신비의 숲'
                    return currentCharacter.value.common4[textIndex.value]
                } else if (iconId.value === 2) {
                    iconX.value = '4%';
                    iconY.value = 'calc(-8 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_09.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_09.png'
                    currentX.value = -250
                    currentY.value = -10
                    currentText.value = '4F 북문 방면 중앙창문 앞'
                    currentLargeText.value = '휴게공간'
                    return currentCharacter.value.common3[textIndex.value]
                } else if (iconId.value === 3) {
                    iconX.value = '-4%';
                    iconY.value = 'calc(5.5 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_08.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_08.png'
                    currentY.value = -100
                    currentText.value = '3F 그린동 남문 방면'
                    currentLargeText.value = '부암동 가든'
                    return currentCharacter.value.common2[textIndex.value]
                } else if (iconId.value === 4) {
                    iconX.value = '4%';
                    iconY.value = 'calc(3 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_07.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_07.png'
                    currentX.value = -250
                    currentY.value = -10
                    currentText.value = '3F 북문 방면 중앙창문 앞'
                    currentLargeText.value = '휴게공간'
                    return currentCharacter.value.common1[textIndex.value]
                } else if (iconId.value === 5) {
                    iconX.value = '-1%';
                    iconY.value = 'calc(12 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_06.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_06.png'
                    currentX.value = -330
                    currentText.value = '2F 오렌지동 북문 방면'
                    currentLargeText.value = '몽드 이기자'
                    return currentCharacter.value.culture2[textIndex.value]
                } else if (iconId.value === 6) {
                    iconX.value = '-6%';
                    iconY.value = 'calc(16 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_05.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_05.png'
                    currentX.value = -250
                    currentY.value = -80
                    currentText.value = '2F 북문 방면 중앙창문 앞'
                    currentLargeText.value = 'VP존'
                    return currentCharacter.value.culture[textIndex.value]
                } else if (iconId.value === 7) {
                    iconX.value = '4%';
                    iconY.value = 'calc(14 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_02.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_02.png'
                    currentX.value = -60
                    currentY.value = -70
                    currentText.value = '2F 남문 방면 중앙창문 앞'
                    currentLargeText.value = '휴게공간'
                    return currentCharacter.value.shopping2[textIndex.value]
                } else if (iconId.value === 8) {
                    iconX.value = '-6%';
                    iconY.value = 'calc(25.5 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_01.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_01.png'
                    currentX.value = -180
                    currentY.value = 40
                    currentText.value = '1F 오렌지동 에스컬레이터 옆'
                    currentLargeText.value = 'The Wave'
                    return currentCharacter.value.shopping[textIndex.value]
                } else if (iconId.value === 9) {
                    iconX.value = '0%';
                    iconY.value = 'calc(39 * var(--vh))';
                    currentMap.value = '../resource/tutorial/map_04.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_04.png'
                    currentY.value = -100
                    currentText.value = 'B1 중앙 에스컬레이터 앞'
                    currentLargeText.value = 'F&B 중앙'
                    return currentCharacter.value.eatingOut2[textIndex.value]
                } else if (iconId.value === 10) {
                    iconX.value = '5%';
                    iconY.value = 'calc(36 * var(--vh))';
                    currentX.value = -180
                    currentMap.value = '../resource/tutorial/map_03.png'
                    currentMiniMap.value = '../resource/tutorial/mini_map_03.png'
                    currentText.value = 'B1 식품관 입구'
                    currentLargeText.value = '푸드 애비뉴'
                    return currentCharacter.value.eatingOut[textIndex.value]
                }
            }
        })

        const nextMap = (icon) => {

            if (index.value === 0) {
                previewicon.value = icon
                index.value = 1
                textIndex.value = 0
                iconId.value = icon.id
                icon.active = false
            }
            if (index.value === 1) {
                index.value = 1
                textIndex.value = 0
                iconId.value = icon.id
                if (localStorage.getItem(`clear${previewicon.value.id}`) === 'true') {
                    previewicon.value.active = false;
                } else {
                    previewicon.value.active = true;
                }
                icon.active = false
                previewicon.value = icon
            }
        }

        const next = () => {
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
            setVH();

            window.addEventListener('resize', setVH);


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
            currentLargeText
        }
    }
}
</script>

<style scoped>
.main {
    width: 100%;
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
    width: 75%;
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
    margin-right: -4%;
    position: relative;
    overflow: hidden;
    width: 20%;
    display: flex;
    align-items: center;
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
    bottom: 10px;
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
    bottom: 10px;
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
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;

}

.icon-container2 {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;

}
</style>