<template>
    <div @click="next()" style="background-image: url('../resource/common/bg.png'); background-size: cover;" class="main">
        <div class=" top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="characterContent.src" alt="Side Image" />
            </div>
        </div>
        <div class="image-container1">
            <img v-show="index === 0" src="../resource/tutorial/story_tree.png">

        </div>
        <div class="image-container2">

            <img v-show="index >= 1" src="../resource/tutorial/map_01.png"
                :style="{ transform: `scale(${zoom}) translate(${currentX}px, ${currentY}px)` }" alt="Loading..."
                @touchstart="startDrag" @touchmove="drag" @touchend="endDrag" @touchcancel="endDrag" />
        </div>

        <div v-show="index >= 1" class="button-container1">
            <button @click.stop="zoomIn">+</button>
            <button @click.stop="zoomOut">-</button>
        </div>
        <div v-show="index >= 1" class="bottom-container2">
            <div class="text-content">
                <p class="medium-text">1F 오렌지동 에스컬레이터 옆</p>
                <p class="large-text">The Wave</p>
            </div>
            <div class="image-right">
                <img src="../resource/tutorial/mini_map_01.png" alt="Description of Image">
            </div>
        </div>
    </div>
</template>

<script>

import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'


export default {
    name: 'Culture',
    setup() {

        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(6)
        const zoom = ref(2)
        const dragging = ref(false)
        const currentX = ref(0)
        const currentY = ref(0)
        const lastX = ref(0)
        const lastY = ref(0)


        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.intro[textIndex.value] || {}
        })


        const next = () => {
            if (index.value === 0) {
                index.value = 1
                textIndex.value = 7

            } else if (index.value === 1) {
                index.value = 2
                textIndex.value = 8
            }
            else if (index.value === 2) {
                index.value = 3
                textIndex.value = 9
            }
            else if (index.value === 3) {
                router.push('map')
            }
        }

        const zoomIn = () => {
            zoom.value += 0.1;
        }

        const zoomOut = () => {
            if (zoom.value > 1) {
                zoom.value -= 0.1;
            }
        }

        let startTime;

        const startDrag = (event) => {
            event.preventDefault()
            dragging.value = true
            lastX.value = event.touches[0].clientX
            lastY.value = event.touches[0].clientY
            startTime = Date.now();
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
            dragging.value = false
            const endTime = Date.now();  // 종료 시간 기록
            if (endTime - startTime <= 500) {  // 1초 이내인지 확인
                next();  // 1초 이내라면 next() 호출
            }
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

.image-container1 {
    overflow: auto;
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
}

.image-container1 img {
    width: 100%;
    height: 100%;
}

.image-container2 {
    overflow: hidden;
    width: 100%;
    height: calc(80 * var(--vh));
    position: absolute;
    bottom: 0;
}

.image-container2 img {
    width: 100%;
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
</style>