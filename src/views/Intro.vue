<template>
    <div @click="screenClick()" class="loading-container">
        <div :class="{ 'hidden-content': index >= 3 }" class="text-container1">
            <p>{{ currentData.text1 }}</p>
        </div>
        <div class="image-container">
            <button v-show="index === 2" @click.stop="prevImage()">◀</button>
            <img :src="currentImageSrc" alt="Loading..." />
            <button v-show="index === 2" @click.stop="nextImage()">▶</button>
        </div>
        <div :class="{ 'hidden-content': !(index === 0 || index >= 2) }" class="text-container2">
            <p v-show="index >= 2">{{ characterContent.name }}</p>
            <p v-show="index >= 2">{{ characterContent.text }}</p>
            <div class="button-container">
                <button v-show="index === 0 || index >= 2" @click.stop="buttonClick()">{{ currentData.buttonText1
                }}</button>
                <button v-show="index === 0 || index >= 3" @click.stop="buttonClick()">{{ currentData.buttonText2
                }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
    name: 'Intro',
    setup() {
        const index = ref(0)
        const imageIndex = ref(0)
        const characterIndex = ref(0)
        const images = [
            'https://playar.syrup.co.kr/sodarimg/is/marketing/202308/17TZcrb5Q*38b3ed16b02bec43416b4a7dec923cb0.gif',
            'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png',
            'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png',
            'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png'
        ]

        const currentImageSrc = computed(() => images[imageIndex.value])

        const data = [
            { text1: "신비의 숲으로 떠날 준비는 됐나요?", buttonText1: "그런...거 같아?", buttonText2: "너무 기대된다!" },
            { text1: "좋아요! 함께 여행할 다른 친구들을 만나보는 건 어떨까?", buttonText1: "", buttonText2: "" },
            { text1: "당신의 마음에 드는 친구를 선택해주세요.", buttonText1: "선택하기", buttonText2: "" },
            { text1: "", buttonText1: "응, 숲 속으로 가보자!", buttonText2: "얼른 신비의 숲을 보고 싶어." }
        ]

        const characterData1 = [
            { name: "벨", text: "롯데백화점 분당점 어쩌구" },
            { name: "벨", text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
        ]

        const characterData2 = [
            { name: "벨2", text: "롯데백화점 분당점 어쩌구" },
            { name: "벨2", text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
        ]

        const characterData3 = [
            { name: "벨3", text: "롯데백화점 분당점 어쩌구" },
            { name: "벨3", text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
        ]

        const currentData = computed(() => data[index.value] || {})

        const characterContent = ref({ name: "", text: "" })

        watch(imageIndex, (newIndex) => {
            switch (newIndex) {
                case 1:
                    characterContent.value = characterData1[characterIndex.value]
                    break
                case 2:
                    characterContent.value = characterData2[characterIndex.value]
                    break
                case 3:
                    characterContent.value = characterData3[characterIndex.value]
                    break
                default:
                    characterContent.value = { name: "", text: "" }
                    break
            }
        }, { deep: true })

        watch(characterIndex, (newIndex) => {
            console.log(newIndex)
            switch (imageIndex.value) {
                case 1:
                    characterContent.value = characterData1[newIndex]
                    break
                case 2:
                    characterContent.value = characterData2[newIndex]
                    break
                case 3:
                    characterContent.value = characterData3[newIndex]
                    break
                default:
                    characterContent.value = { name: "", text: "" }
                    break
            }
        }, { deep: true })

        const screenClick = () => {
            if (index.value === 1) {
                index.value = 2
            }
        }

        const buttonClick = () => {
            if (index.value === 0) {
                index.value = 1
            }
            if (index.value === 2) {
                index.value = 3
                characterIndex.value = 1
            }
        }

        const nextImage = () => {
            if (imageIndex.value < images.length - 1) {
                imageIndex.value++
            } else {
                imageIndex.value = 1
            }
        }

        const prevImage = () => {
            if (imageIndex.value > 1) {
                imageIndex.value--
            } else {
                imageIndex.value = images.length - 1
            }
        }

        watch(index, (value) => {
            if (value === 2) {
                imageIndex.value = 1
            }
        })

        return { currentData, index, screenClick, buttonClick, currentImageSrc, nextImage, prevImage, characterContent }
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
</style>