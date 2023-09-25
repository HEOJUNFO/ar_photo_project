<template>
    <div class="main">
        <div class="top-section">
            <button></button>
            <button></button>
            <button @click="back()"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                    fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="#D50F4A" stroke-width="2" />
                    <mask id="mask0_541_1827" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                        height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1827)">
                        <path
                            d="M20 21.4L15.1 26.3C14.9167 26.4833 14.6833 26.575 14.4 26.575C14.1167 26.575 13.8833 26.4833 13.7 26.3C13.5167 26.1167 13.425 25.8833 13.425 25.6C13.425 25.3167 13.5167 25.0833 13.7 24.9L18.6 20L13.7 15.1C13.5167 14.9167 13.425 14.6833 13.425 14.4C13.425 14.1167 13.5167 13.8833 13.7 13.7C13.8833 13.5167 14.1167 13.425 14.4 13.425C14.6833 13.425 14.9167 13.5167 15.1 13.7L20 18.6L24.9 13.7C25.0833 13.5167 25.3167 13.425 25.6 13.425C25.8833 13.425 26.1167 13.5167 26.3 13.7C26.4833 13.8833 26.575 14.1167 26.575 14.4C26.575 14.6833 26.4833 14.9167 26.3 15.1L21.4 20L26.3 24.9C26.4833 25.0833 26.575 25.3167 26.575 25.6C26.575 25.8833 26.4833 26.1167 26.3 26.3C26.1167 26.4833 25.8833 26.575 25.6 26.575C25.3167 26.575 25.0833 26.4833 24.9 26.3L20 21.4Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
        </div>

        <div class="image-container">
            <img :src="imageDataStore.imageData" />
        </div>
        <div class="bottom-section">
            <button @click="showModal = true"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                    viewBox="0 0 28 28" fill="none">
                    <mask id="mask0_541_1944" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                        height="28">
                        <rect width="28" height="28" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1944)">
                        <path
                            d="M9.12917 15.1667L14.8458 20.8833C15.0792 21.1167 15.191 21.3889 15.1813 21.7C15.1715 22.0111 15.05 22.2833 14.8167 22.5167C14.5833 22.7306 14.3111 22.8424 14 22.8521C13.6889 22.8618 13.4167 22.75 13.1833 22.5167L5.48334 14.8167C5.36667 14.7 5.28403 14.5736 5.23542 14.4375C5.18681 14.3014 5.16251 14.1556 5.16251 14C5.16251 13.8445 5.18681 13.6986 5.23542 13.5625C5.28403 13.4264 5.36667 13.3 5.48334 13.1833L13.1833 5.48334C13.3972 5.26945 13.6646 5.16251 13.9854 5.16251C14.3063 5.16251 14.5833 5.26945 14.8167 5.48334C15.05 5.71667 15.1667 5.99376 15.1667 6.31459C15.1667 6.63542 15.05 6.91251 14.8167 7.14584L9.12917 12.8333H22.1667C22.4972 12.8333 22.7743 12.9451 22.9979 13.1688C23.2215 13.3924 23.3333 13.6695 23.3333 14C23.3333 14.3306 23.2215 14.6076 22.9979 14.8313C22.7743 15.0549 22.4972 15.1667 22.1667 15.1667H9.12917Z"
                            fill="#D50F4A" />
                    </g>
                </svg>뒤로</button>
            <button @click="saveImage()"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"
                    fill="none">
                    <mask id="mask0_541_1954" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                        height="28">
                        <rect width="28" height="28" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1954)">
                        <path
                            d="M14 18.1708C13.8444 18.1708 13.6986 18.1465 13.5625 18.0979C13.4264 18.0493 13.3 17.9667 13.1833 17.85L8.98332 13.65C8.74999 13.4167 8.63818 13.1444 8.64791 12.8333C8.65763 12.5222 8.76943 12.25 8.98332 12.0167C9.21666 11.7833 9.49374 11.6618 9.81457 11.6521C10.1354 11.6424 10.4125 11.7542 10.6458 11.9875L12.8333 14.175V5.83332C12.8333 5.50277 12.9451 5.22568 13.1687 5.00207C13.3924 4.77846 13.6694 4.66666 14 4.66666C14.3305 4.66666 14.6076 4.77846 14.8312 5.00207C15.0549 5.22568 15.1667 5.50277 15.1667 5.83332V14.175L17.3542 11.9875C17.5875 11.7542 17.8646 11.6424 18.1854 11.6521C18.5062 11.6618 18.7833 11.7833 19.0167 12.0167C19.2305 12.25 19.3424 12.5222 19.3521 12.8333C19.3618 13.1444 19.25 13.4167 19.0167 13.65L14.8167 17.85C14.7 17.9667 14.5736 18.0493 14.4375 18.0979C14.3014 18.1465 14.1555 18.1708 14 18.1708ZM6.99999 23.3333C6.35832 23.3333 5.80902 23.1049 5.35207 22.6479C4.89513 22.191 4.66666 21.6417 4.66666 21V18.6667C4.66666 18.3361 4.77846 18.059 5.00207 17.8354C5.22568 17.6118 5.50277 17.5 5.83332 17.5C6.16388 17.5 6.44096 17.6118 6.66457 17.8354C6.88818 18.059 6.99999 18.3361 6.99999 18.6667V21H21V18.6667C21 18.3361 21.1118 18.059 21.3354 17.8354C21.559 17.6118 21.8361 17.5 22.1667 17.5C22.4972 17.5 22.7743 17.6118 22.9979 17.8354C23.2215 18.059 23.3333 18.3361 23.3333 18.6667V21C23.3333 21.6417 23.1049 22.191 22.6479 22.6479C22.191 23.1049 21.6417 23.3333 21 23.3333H6.99999Z"
                            fill="#D50F4A" />
                    </g>
                </svg>저장</button>
            <button class="share-button" @click="shareImage(), premiumModal = true"><svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="23" viewBox="0 0 24 23" fill="none">
                    <path
                        d="M2.66665 17.8333V20.1667H21.3333V17.8333H2.66665ZM2.66665 5.00001H5.23331C5.13609 4.82501 5.0729 4.64029 5.04373 4.44584C5.01456 4.2514 4.99998 4.04723 4.99998 3.83334C4.99998 2.86112 5.34026 2.03473 6.02081 1.35418C6.70137 0.673621 7.52776 0.333344 8.49998 0.333344C9.08331 0.333344 9.6229 0.484038 10.1187 0.785427C10.6146 1.08682 11.0472 1.46112 11.4166 1.90834L12 2.66668L12.5833 1.90834C12.9333 1.44168 13.3611 1.06251 13.8666 0.770844C14.3722 0.479177 14.9166 0.333344 15.5 0.333344C16.4722 0.333344 17.2986 0.673621 17.9791 1.35418C18.6597 2.03473 19 2.86112 19 3.83334C19 4.04723 18.9854 4.2514 18.9562 4.44584C18.9271 4.64029 18.8639 4.82501 18.7666 5.00001H21.3333C21.975 5.00001 22.5243 5.22848 22.9812 5.68543C23.4382 6.14237 23.6666 6.69168 23.6666 7.33334V20.1667C23.6666 20.8083 23.4382 21.3576 22.9812 21.8146C22.5243 22.2715 21.975 22.5 21.3333 22.5H2.66665C2.02498 22.5 1.47567 22.2715 1.01873 21.8146C0.561785 21.3576 0.333313 20.8083 0.333313 20.1667V7.33334C0.333313 6.69168 0.561785 6.14237 1.01873 5.68543C1.47567 5.22848 2.02498 5.00001 2.66665 5.00001ZM2.66665 14.3333H21.3333V7.33334H15.3833L17.1333 9.72501C17.3278 9.99723 17.4055 10.284 17.3666 10.5854C17.3278 10.8868 17.1722 11.1347 16.9 11.3292C16.6278 11.5236 16.341 11.5965 16.0396 11.5479C15.7382 11.4993 15.4903 11.3486 15.2958 11.0958L12 6.63334L8.70415 11.0958C8.5097 11.3486 8.26179 11.4993 7.9604 11.5479C7.65901 11.5965 7.3722 11.5236 7.09998 11.3292C6.82776 11.1347 6.66734 10.8868 6.61873 10.5854C6.57012 10.284 6.64304 9.99723 6.83748 9.72501L8.55831 7.33334H2.66665V14.3333ZM8.49998 5.00001C8.83054 5.00001 9.10762 4.8882 9.33123 4.66459C9.55484 4.44098 9.66665 4.1639 9.66665 3.83334C9.66665 3.50279 9.55484 3.2257 9.33123 3.00209C9.10762 2.77848 8.83054 2.66668 8.49998 2.66668C8.16942 2.66668 7.89234 2.77848 7.66873 3.00209C7.44512 3.2257 7.33331 3.50279 7.33331 3.83334C7.33331 4.1639 7.44512 4.44098 7.66873 4.66459C7.89234 4.8882 8.16942 5.00001 8.49998 5.00001ZM15.5 5.00001C15.8305 5.00001 16.1076 4.8882 16.3312 4.66459C16.5548 4.44098 16.6666 4.1639 16.6666 3.83334C16.6666 3.50279 16.5548 3.2257 16.3312 3.00209C16.1076 2.77848 15.8305 2.66668 15.5 2.66668C15.1694 2.66668 14.8923 2.77848 14.6687 3.00209C14.4451 3.2257 14.3333 3.50279 14.3333 3.83334C14.3333 4.1639 14.4451 4.44098 14.6687 4.66459C14.8923 4.8882 15.1694 5.00001 15.5 5.00001Z"
                        fill="#D50F4A" />
                </svg>공유 이벤트</button>
        </div>

        <div v-if="showModal" class="modal">
            <p>사진 촬영으로 돌아갑니다.</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
        <div v-if="premiumModal" class="modal2" @click="premiumModal = false">
            <div class="modal-content2">
                <button @click="premiumModal = false" class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" width="40"
                        height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="20" fill="white" />
                        <mask id="mask0_549_2138" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                            height="24">
                            <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_549_2138)">
                            <path
                                d="M20 21.4L15.1 26.3C14.9167 26.4833 14.6834 26.575 14.4 26.575C14.1167 26.575 13.8834 26.4833 13.7 26.3C13.5167 26.1167 13.425 25.8833 13.425 25.6C13.425 25.3167 13.5167 25.0833 13.7 24.9L18.6 20L13.7 15.1C13.5167 14.9167 13.425 14.6833 13.425 14.4C13.425 14.1167 13.5167 13.8833 13.7 13.7C13.8834 13.5167 14.1167 13.425 14.4 13.425C14.6834 13.425 14.9167 13.5167 15.1 13.7L20 18.6L24.9 13.7C25.0834 13.5167 25.3167 13.425 25.6 13.425C25.8834 13.425 26.1167 13.5167 26.3 13.7C26.4834 13.8833 26.575 14.1167 26.575 14.4C26.575 14.6833 26.4834 14.9167 26.3 15.1L21.4 20L26.3 24.9C26.4834 25.0833 26.575 25.3167 26.575 25.6C26.575 25.8833 26.4834 26.1167 26.3 26.3C26.1167 26.4833 25.8834 26.575 25.6 26.575C25.3167 26.575 25.0834 26.4833 24.9 26.3L20 21.4Z"
                                fill="#D50F4A" />
                        </g>
                    </svg>
                </button>
                <img :src="premiumImageSrc" />
                <p class="p1">{{ premiumText }}</p>
                <p class="p2">획득기회!</p>
            </div>
        </div>
        <div v-show="finishModal" class="image-container2">
            <div class="reward-container">
                <img class="image1" src="@resource/common/label.png" />
                <p class="p_1">{{ premiumText }}</p>
                <p class="p_2">'증정장소 : 5F 사은행사장'</p>
                <img class="image2" :src="premiumImageSrc" />
                <button @click="next()">상품획득 성공</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { useImageDataStore } from '../stores/imageData.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../router';

export default {
    name: 'captureReview',
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

        const audio2 = ref(null);

        import('@resource/sounds/acquired.wav')
            .then(src => {
                audio2.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio2 = () => {
            if (audio2.value) {
                if (!audio2.value.paused) {
                    audio2.value.pause();
                    audio2.value.currentTime = 0;
                }
                audio2.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        const audio3 = ref(null);

        import('@resource/sounds/success.wav')
            .then(src => {
                audio3.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio3 = () => {
            if (audio3.value) {
                if (!audio3.value.paused) {
                    audio3.value.pause();
                    audio3.value.currentTime = 0;
                }
                audio3.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        const showModal = ref(false);
        const premiumModal = ref(false);
        const premiumImageSrc = ref('');
        const premiumText = ref('');
        const eventId = ref(0);
        const finishModal = ref(false);

        const IMAGES = [
            { id: 0, src: new URL('@resource/storageBox/02_Coupon_active.png', import.meta.url).href, name: 'test' },
            { id: 0, src: new URL('@resource/storageBox/03_Coupon_active.png', import.meta.url).href, name: 'test' },
            { id: 0, src: new URL('@resource/storageBox/04_Coupon_active.png', import.meta.url).href, name: 'test' },
            { id: 0, src: new URL('@resource/storageBox/IceCream_active.png', import.meta.url).href, name: 'test' },

        ]

        const characterStore = useCharacterStore()
        const imageDataStore = useImageDataStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common4[textIndex.value] || {}
        })

        const confirmBack = () => {
            showModal.value = false;
            router.go(-1);
        };

        const closeModal = () => {
            showModal.value = false;
        };


        const back = () => {
            showModal.value = true;
        };

        const saveImage = () => {
            playAudio();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = imageDataStore.imageData;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = 'image.png';
                a.click();
            };
        }

        const shareImage = async () => {
            playAudio();
            const blob = await (await fetch(imageDataStore.imageData)).blob();
            const filesArray = [
                new File([blob], "image.png", {
                    type: blob.type,
                }),
            ];

            const shareData = {
                files: filesArray,
                text: '이미지를 공유합니다!'
            };

            if (!navigator.share) {
                alert("공유하기 기능을 지원하지 않는 브라우저입니다.");
                return;
            }
            navigator
                .share(shareData)
                .then(() => {
                    playAudio2();
                    premiumModal.value = false;
                    finishModal.value = true;
                })
                .catch(console.error);
        }


        const next = () => {
            playAudio3();
            if (eventId.value === '2') {
                localStorage.setItem('clearId2', 'true')
                localStorage.setItem('premiumItem0', 'true')
            } else if (eventId.value === '4') {
                localStorage.setItem('clearId4', 'true')
                localStorage.setItem('premiumItem1', 'true')
            } else if (eventId.value === '10') {
                localStorage.setItem('clearId10', 'true')
                localStorage.setItem('premiumItem3', 'true')
            }

            router.push('/eventout')
        }


        const setVH = () => {
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            eventId.value = localStorage.getItem('eventId')
            if (eventId.value === '2') {
                premiumImageSrc.value = IMAGES[0].src;
                premiumText.value = '패션·잡화 1만원 금액할인권';
                localStorage.setItem('premiumItem0', 'true')
            } else if (eventId.value === '4') {
                premiumImageSrc.value = IMAGES[1].src;
                premiumText.value = 'F&B 5천원 금액할인권';
            } else if (eventId.value === '6') {
                premiumImageSrc.value = IMAGES[2].src;
                premiumText.value = '몽드 이가자 1만원 금액할인권';
            } else if (eventId.value === '10') {
                premiumImageSrc.value = IMAGES[3].src;
                premiumText.value = '백미당 아이스크림 증정 쿠폰 교환권';
            }

        });

        onBeforeRouteLeave(() => {

        });

        return {
            back,
            showModal,
            confirmBack,
            closeModal,
            imageDataStore,
            saveImage,
            shareImage,
            premiumModal,
            premiumImageSrc,
            premiumText,
            finishModal,
            next
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.image-container {
    height: calc(75 * var(--vh));
    width: calc((4/6) * 75 * var(--vh));
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.image-container img {
    width: 100%;
    height: 100%;
    position: absolute;
}

.bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(15 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: #fff;
    position: absolute;
    bottom: 0;
}


.bottom-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.bottom-section button svg {
    width: auto;
    height: calc(5* var(--vh));

}


.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: calc(15 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: none;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;
    z-index: 3;
    padding-top: 20px;
    padding-bottom: 10px;
    transform: translate(-50%, -50%);
}

.modal p {
    color: #111;
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.modal-buttons {
    display: flex;
    justify-content: center;
    width: 100%;
}

.modal button {
    width: 40%;
    padding: 10px;
}


.modal button:first-child {
    border-radius: 100px;
    border: 2px solid var(--Text-Gray, #767676);
    background: #D9D9D9;
    color: var(--Text-Gray, #545454);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin-right: 2%;
    box-shadow: 0px 3px #767676
}

.modal button:last-child {
    border-radius: 100px;
    border: 2px solid var(--Dark-Red, #922142);
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-Black, #fff);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    box-shadow: 0px 3px #922142
}

.top-section {
    display: flex;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    background: #fff
}

.top-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 15%;
    height: 100%;

}

.top-section button svg {
    width: auto;
    height: calc(5* var(--vh));

}

.modal2 {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    top: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5)
}

.modal-content2 {
    position: fixed;
    top: calc(40 * var(--vh));
    left: 50%;
    width: 80vw;
    height: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;
    z-index: 3;
    transform: translate(-50%, -50%);
}

.modal-content2 img {
    pointer-events: none;
    position: absolute;
    top: calc(1* var(--vh));
    width: auto;
    height: 70%;
}

.p1 {
    position: absolute;
    top: 70%;
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.p2 {
    position: absolute;
    top: 80%;
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}


.close-btn {
    position: absolute;
    top: -45px;
    right: 0px;
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    outline: none;
}

.share-button {
    animation: beat 2s infinite;
}

@keyframes beat {
    0% {
        transform: scale(0.5);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(0.5);
    }
}

.image-container2 {
    position: absolute;
    width: 80%;
    height: auto;
    z-index: 10;
    background-color: #fff;
    border-radius: 16px;
    left: 50%;
    top: calc(50 * var(--vh));
    transform: translate(-50%, -50%);
    padding-bottom: calc(3 * var(--vh));
}


.reward-container {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: calc(-3 * var(--vh));

}


.image1 {
    position: relative;
    width: 100%;
    height: auto;
}

.image2 {
    position: relative;
    width: 60%;
    height: auto;
}

.p_1 {
    position: relative;
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    max-width: 20ch;
    overflow-wrap: break-word;
    word-break: keep-all;

}

.p_2 {
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.3px;
}

.reward-container button {
    width: 80%;
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