<template>
    <div @click.stop="next()" style="background-image: url('../resource/common/bg.png');" class="main">
        <div class=" top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="currentCharacter.src" alt="Side Image" />
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
        const textIndex = ref(4)


        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.culture[textIndex.value] || {}
        })


        const next = () => {
            if (index.value === 0) {
                index.value = 1
                textIndex.value = 5

            } else if (index.value === 1) {
                index.value = 2
            }
            else if (index.value === 2) {


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
    margin-top: calc(7.5 * var(--vh));
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
    font-size: 15px;
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
    position: relative;
    overflow: hidden;
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container img {
    background-color: #FFECD6;
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: block;
    clip-path: circle(30%);
    object-fit: cover;
}
</style>