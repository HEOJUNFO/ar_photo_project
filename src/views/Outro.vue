<template>
    <div @click.stop="next()">
        <loading-container>
        </loading-container>
        <div class="loading-container" style="background-image: url('../resource/common/bg.png'); background-size: cover;">
            <div class="image-container2">
                <div class="reward-container">
                    <img src="../resource/common/reward_success_bg.png" />
                    <img :src="rewardSrc" />
                    <p class="p">{{ rewardText }}</p>
                </div>
            </div>
            <div class="text-container2">
                <img :src="characterContent?.src" alt="Description" class="overlap-image" />
                <p class="character-name">{{ selectCharacterName }}</p>
                <hr class="character-line">
                <p class="character-text">{{ characterContent?.text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { useImageDataStore } from '../stores/imageData'
import { useRewardsStore } from '../stores/reward'
import { ref, computed, watch, onMounted } from 'vue'
import router from '../router'
import LoadingContainer from '../components/LoadingContainer.vue'

export default {
    name: 'Culture2',
    components: {
        LoadingContainer
    },
    setup() {
        const characterStore = useCharacterStore()
        const imageDataStore = useImageDataStore()
        const rewardsStore = useRewardsStore()
        const eventName = ref('')

        const index = ref(0)
        const textIndex = ref(7)
        const rewardSrc = ref('')
        const rewardText = ref('')

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter
            if (eventName.value === 'shopping2Clear') {
                return char?.shopping2[textIndex.value] || {}
            } else if (eventName.value === 'culture2Clear') {
                return char?.culture2[textIndex.value] || {}
            } else if (eventName.value === 'eatingOut2Clear') {
                return char?.eatingOut2[textIndex.value] || {}
            }

        })


        const next = () => {
            if (index.value === 0) {
                index.value = 1
                textIndex.value = 8

            } else if (index.value === 1) {



                router.push('/map')
            }


        }
        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }


        onMounted(() => {
            document.body.style.overflow = 'hidden';

            setVH();
            window.addEventListener('resize', setVH);


            eventName.value = imageDataStore.getEventName();

            if (eventName.value === 'shopping2Clear') {
                rewardSrc.value = '../resource/storageBox/02_Coupon_active.png'
                rewardText.value = '패션·잡화 1만원 금액할인권'
            } else if (eventName.value === 'culture2Clear') {
                rewardSrc.value = '../resource/storageBox/04_Coupon_active.png'
                rewardText.value = '몽드이기자 1만원 금액할인권'
            } else if (eventName.value === 'eatingOut2Clear') {
                rewardSrc.value = '../resource/storageBox/03_Coupon_active.png'
                rewardText.value = 'F&B 5천원 금액할인권'
            }
        })

        return {
            index,
            next,
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter?.src,
            selectCharacterName: characterStore.currentCharacter?.name,
            rewardSrc: rewardSrc,
            rewardText: rewardText
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

.text-container2 {
    bottom: 0%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
    padding: 7.5px 15px;
    color: #767676;
    font-family: "NanumSquare", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.45px;
    align-self: flex-start;
    text-align: left;
    max-width: 20ch;
    overflow-wrap: break-word;
    word-break: keep-all;
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

.image-container2 {
    width: 80%;
    height: calc(40 * var(--vh));
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
    top: calc(-10 * var(--vh));
    left: 0;
    width: 100%;
    height: auto;
}

.reward-container img:nth-child(2) {
    position: absolute;
    top: -15%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 80%;
}

.reward-container p {
    position: absolute;
    top: 50%;
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;

}
</style>