<template>
    <transition name="fade" mode="out-in">
        <div :key="index === 5 ? 'animate' : 'static'" @click="handleIndexTransition()" class="loading-container">
            <div :class="{ 'hidden-content': index >= 3 }" class="text-container1">
                <p>{{ currentData.text1 }}</p>
            </div>
            <div class="image-container">
                <button v-show="index === 2" @click.stop="navigateToPreviousImage()">◀</button>
                <img :src="currentImageSrc" alt="Loading..." />
                <button v-show="index === 2" @click.stop="navigateToNextImage()">▶</button>
            </div>
            <div :class="{ 'hidden-content': !(index === 0 || index >= 2) }" class="text-container2">
                <img v-if="index === 5" :src="selectCharacterSrc" alt="Description" class="overlap-image" />
                <p v-show="index >= 2">{{ characterContent.name }}</p>
                <p v-show="index >= 2">{{ characterContent.text }}</p>
                <div class="button-container">
                    <button v-show="index === 0 || index === 2 || index === 3" @click.stop="handleIndexTransition()">{{
                        currentData.buttonText1
                    }}</button>
                    <button v-show="index === 0 || index === 3" @click.stop="handleIndexTransition()">{{
                        currentData.buttonText2
                    }}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { ref, computed, watch } from 'vue'

const IMAGES = [
    'https://playar.syrup.co.kr/sodarimg/is/marketing/202308/17TZcrb5Q*38b3ed16b02bec43416b4a7dec923cb0.gif',
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png',
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png',
    'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png'
]

const DATA = [
    { text1: "신비의 숲으로 떠날 준비는 됐나요?", buttonText1: "그런...거 같아?", buttonText2: "너무 기대된다!" },
    { text1: "좋아요! 함께 여행할 다른 친구들을 만나보는 건 어떨까?", buttonText1: "", buttonText2: "" },
    { text1: "당신의 마음에 드는 친구를 선택해주세요.", buttonText1: "선택하기", buttonText2: "" },
    { text1: "", buttonText1: "응, 숲 속으로 가보자!", buttonText2: "얼른 신비의 숲을 보고 싶어." }
]

const CHARACTER_DATAS = [
    [
        { name: "벨", text: "롯데백화점 분당점 어쩌구" },
        { name: "벨", text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
        { name: "벨", text: "좋아. 우리 같이 신비의 숲 문을 열어볼까" },
        { name: "벨", text: "신비의 숲 문을 두드려 볼래?" }
    ],
    [
        { name: "벨2", text: "롯데백화점 분당점 어쩌구" },
        { name: "벨2", text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
        { name: "벨2", text: "좋아. 우리 같이 신비의 숲 문을 열어볼까" },
        { name: "벨2", text: "신비의 숲 문을 두드려 볼래?" }
    ],
    [
        { name: "벨3", text: "롯데백화점 분당점 어쩌구" },
        { name: "벨3", text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
        { name: "벨3", text: "좋아. 우리 같이 신비의 숲 문을 열어볼까" },
        { name: "벨3", text: "신비의 숲 문을 두드려 볼래?" }
    ]
]

export default {
    name: 'Intro',
    setup() {
        const characterStore = useCharacterStore()
        const index = ref(0)
        const imageIndex = ref(0)
        const characterIndex = ref(0)
        const characterContent = ref({ name: "", text: "" })

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])
        const selectCharacterSrc = computed(() => characterStore.currentCharacterSrc)
        const currentData = computed(() => DATA[index.value] || {})

        const updateCharacterContent = () => {
            const charData = CHARACTER_DATAS[imageIndex.value - 1]
            characterContent.value = charData ? charData[characterIndex.value] || {} : { name: "", text: "" }
        }

        const transitions = {
            0: () => index.value = 1,
            1: () => index.value = 2,
            2: () => {
                index.value = 3
                characterIndex.value = 1
            },
            3: () => {
                index.value = 4
                characterIndex.value = 2
                characterStore.setCharacterIndex(imageIndex.value - 1)
            },
            4: () => {
                index.value = 5
                characterIndex.value = 3
            }
        }

        const handleIndexTransition = () => {
            if (transitions[index.value]) {
                transitions[index.value]()
            }
        }

        const navigateToNextImage = () => {
            imageIndex.value = (imageIndex.value + 1) % IMAGES.length || 1
        }

        const navigateToPreviousImage = () => {
            imageIndex.value = (imageIndex.value - 1) || IMAGES.length - 1
        }

        watch([imageIndex, characterIndex], updateCharacterContent, { deep: true })

        watch(index, (value) => {
            console.log(value)
            if (value === 2) {
                imageIndex.value = 1
            }
        })

        return {
            currentData,
            index,
            handleIndexTransition,
            currentImageSrc,
            navigateToNextImage,
            navigateToPreviousImage,
            characterContent,
            selectCharacterSrc
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
    height: 100vh;
    background-color: #fff;
}

.text-container1 {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
    background-color: #fff;
}

.text-container1 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 1.5rem;
}

.text-container2 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 0.5rem;
}

.text-container2 {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
    background-color: #fff;
}

.button-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}

.button-container button {
    background-color: #fff;
    color: black;
    border: 1px solid black;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button-container button:hover {
    background-color: #eee;
}

.hidden-content {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    height: 10vh;
    overflow: hidden;
}

.image-container {
    display: flex;
    align-items: center;
    margin-top: 7vh;
    margin-bottom: 7vh;
}

.image-container img {
    width: 100%;
    height: 100%;
}

.image-container button {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
}

.image-container button:hover {
    background: rgba(0, 0, 0, 0.7);
}

.overlap-image {
    position: absolute;
    top: 50%;
    right: -100px;
    width: 150px;
    height: auto;
    z-index: 1;
    transform: translateY(-50%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}
</style>