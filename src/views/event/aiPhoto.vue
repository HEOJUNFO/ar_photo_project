<template>
    <div class="main">
        <div class="top-section">
            <button></button>
            <button></button>
            <button @click="showModal = true"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                    viewBox="0 0 40 40" fill="none">
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

        <div v-if="loading" class="loading-container">
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
            <p class="loading-text">{{ currentMessage }}</p>
        </div>

        <div class="image-container" :style="{ width: imageDataStore.width, height: imageDataStore.height }">
            <img :src="imageDataStore.imageData" />
        </div>
        <div v-if="!isCapture" class="bottom-section">
            <button @click="changeImageKorea()">한국</button>
            <button @click="changeImageJapan()">일본</button>
            <button @click="changeImageUSA()">미국</button>
        </div>

        <div v-if="isCapture" class="bottom-section">
            <button @click="replay()"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"
                    fill="none">
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
            <button @click="saveImage()"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                    viewBox="0 0 28 28" fill="none">
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
            <button class="share-button" @click="showHashTag = true"><svg xmlns="http://www.w3.org/2000/svg" width="28"
                    height="28" viewBox="0 0 28 28" fill="none">
                    <mask id="mask0_541_1949" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                        height="28">
                        <rect width="28" height="28" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1949)">
                        <path
                            d="M21 25.6667C20.0278 25.6667 19.2014 25.3264 18.5208 24.6458C17.8403 23.9653 17.5 23.1389 17.5 22.1667C17.5 22.0306 17.5097 21.8896 17.5292 21.7438C17.5486 21.5979 17.5778 21.4667 17.6167 21.35L9.39167 16.5667C9.06111 16.8583 8.69167 17.0868 8.28333 17.2521C7.875 17.4174 7.44722 17.5 7 17.5C6.02778 17.5 5.20139 17.1597 4.52083 16.4792C3.84028 15.7986 3.5 14.9722 3.5 14C3.5 13.0278 3.84028 12.2014 4.52083 11.5208C5.20139 10.8403 6.02778 10.5 7 10.5C7.44722 10.5 7.875 10.5827 8.28333 10.7479C8.69167 10.9132 9.06111 11.1417 9.39167 11.4333L17.6167 6.65001C17.5778 6.53334 17.5486 6.40209 17.5292 6.25626C17.5097 6.11043 17.5 5.96945 17.5 5.83334C17.5 4.86112 17.8403 4.03473 18.5208 3.35418C19.2014 2.67362 20.0278 2.33334 21 2.33334C21.9722 2.33334 22.7986 2.67362 23.4792 3.35418C24.1597 4.03473 24.5 4.86112 24.5 5.83334C24.5 6.80557 24.1597 7.63196 23.4792 8.31251C22.7986 8.99307 21.9722 9.33334 21 9.33334C20.5528 9.33334 20.125 9.2507 19.7167 9.08543C19.3083 8.92015 18.9389 8.69168 18.6083 8.40001L10.3833 13.1833C10.4222 13.3 10.4514 13.4313 10.4708 13.5771C10.4903 13.7229 10.5 13.8639 10.5 14C10.5 14.1361 10.4903 14.2771 10.4708 14.4229C10.4514 14.5688 10.4222 14.7 10.3833 14.8167L18.6083 19.6C18.9389 19.3083 19.3083 19.0799 19.7167 18.9146C20.125 18.7493 20.5528 18.6667 21 18.6667C21.9722 18.6667 22.7986 19.007 23.4792 19.6875C24.1597 20.3681 24.5 21.1945 24.5 22.1667C24.5 23.1389 24.1597 23.9653 23.4792 24.6458C22.7986 25.3264 21.9722 25.6667 21 25.6667ZM21 7.00001C21.3306 7.00001 21.6076 6.88821 21.8312 6.66459C22.0549 6.44098 22.1667 6.1639 22.1667 5.83334C22.1667 5.50279 22.0549 5.2257 21.8312 5.00209C21.6076 4.77848 21.3306 4.66668 21 4.66668C20.6694 4.66668 20.3924 4.77848 20.1688 5.00209C19.9451 5.2257 19.8333 5.50279 19.8333 5.83334C19.8333 6.1639 19.9451 6.44098 20.1688 6.66459C20.3924 6.88821 20.6694 7.00001 21 7.00001ZM7 15.1667C7.33056 15.1667 7.60764 15.0549 7.83125 14.8313C8.05486 14.6077 8.16667 14.3306 8.16667 14C8.16667 13.6695 8.05486 13.3924 7.83125 13.1688C7.60764 12.9452 7.33056 12.8333 7 12.8333C6.66944 12.8333 6.39236 12.9452 6.16875 13.1688C5.94514 13.3924 5.83333 13.6695 5.83333 14C5.83333 14.3306 5.94514 14.6077 6.16875 14.8313C6.39236 15.0549 6.66944 15.1667 7 15.1667ZM21 23.3333C21.3306 23.3333 21.6076 23.2215 21.8312 22.9979C22.0549 22.7743 22.1667 22.4972 22.1667 22.1667C22.1667 21.8361 22.0549 21.559 21.8312 21.3354C21.6076 21.1118 21.3306 21 21 21C20.6694 21 20.3924 21.1118 20.1688 21.3354C19.9451 21.559 19.8333 21.8361 19.8333 22.1667C19.8333 22.4972 19.9451 22.7743 20.1688 22.9979C20.3924 23.2215 20.6694 23.3333 21 23.3333Z"
                            fill="#D50F4A" />
                    </g>
                </svg>공유</button>
        </div>

        <div v-if="showModal" class="modal">
            <p>정말 종료하시겠습니까?</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="back()">확인</button>
            </div>
        </div>

        <div v-if="showHashTag">
            <div id="dialog-box">
                <p>#성결대학교 #XR센터 #컬쳐커넥션 </p>
                <p>#Culture_Connection</p>
                <p>#과천시청소년진로페스티벌</p>
                <button @click="showHashTag = false, hashTagCopy(), share()">해시태그 복사하기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useImageDataStore } from '../../stores/imageData.js'
import { onMounted, ref } from 'vue';
import router from '../../router';
import axios from "axios";
import FormData from "form-data";

export default {
    name: 'captureReview',
    setup() {
        const isGenerating = ref(false);
        const showModal = ref(false);
        const showHashTag = ref(false);
        const imageDataStore = useImageDataStore();
        const originalImage = ref(null);
        const originalFile = ref(null);
        const loading = ref(false);
        const currentMessageIndex = ref(0);
        const currentMessage = ref("");
        const isCapture = ref(false);
        const generationLimit = 3;

        const messages = [
            "이미지 생성중...",
            "조금만 기다려 주세요...",
            "잠시 후 이미지가 완성됩니다...",
            "이미지 처리 중...",
            "곧 완료됩니다..."
        ];

        const startMessageRotation = () => {
            currentMessage.value = messages[currentMessageIndex.value];
            setInterval(() => {
                currentMessageIndex.value = (currentMessageIndex.value + 1) % messages.length;
                currentMessage.value = messages[currentMessageIndex.value];
            }, 5500);
        };

        const API_URL = 'https://api.stability.ai/v2beta/stable-image/control/structure';
        const API_KEY = 'sk-cD8t0xqaanFuazdUufkpiFTw4yGxjS6QU8oNs5z3shUzMJnN';

        const dbPromise = window.indexedDB.open('ImageGenDB', 1);

        dbPromise.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('generationStore')) {
                db.createObjectStore('generationStore', { keyPath: 'id', autoIncrement: true });
            }
        };

        const incrementGenerationCount = async () => {
            return new Promise((resolve, reject) => {
                const request = dbPromise.result.transaction('generationStore', 'readwrite')
                    .objectStore('generationStore')
                    .get(1);

                request.onsuccess = (event) => {
                    const data = event.target.result || { id: 1, count: 0 };
                    data.count += 1;
                    dbPromise.result.transaction('generationStore', 'readwrite')
                        .objectStore('generationStore')
                        .put(data);

                    resolve(data.count);
                };

                request.onerror = (event) => {
                    reject(event);
                };
            });
        };

        const getGenerationCount = async () => {
            return new Promise((resolve, reject) => {
                const request = dbPromise.result.transaction('generationStore', 'readonly')
                    .objectStore('generationStore')
                    .get(1);

                request.onsuccess = (event) => {
                    const data = event.target.result || { count: 0 };
                    resolve(data.count);
                };

                request.onerror = (event) => {
                    reject(event);
                };
            });
        };

        const transformImage = async (prompt) => {
            if (isGenerating.value) {
                alert("이미지 생성 중입니다. 잠시만 기다려 주세요.");
                return;
            }
            isGenerating.value = true;

            // const generationCount = await getGenerationCount();
            // if (generationCount >= generationLimit) {
            //     alert("이미지 생성 제한 횟수를 초과했습니다.");
            //     return;
            // }

            loading.value = true;
            startMessageRotation();

            try {
                const payload = {
                    image: originalFile.value,
                    prompt: prompt,
                    control_strength: 0.9,
                    output_format: "png",
                };

                const response = await axios.postForm(
                    API_URL,
                    axios.toFormData(payload, new FormData()),
                    {
                        validateStatus: undefined,
                        responseType: "arraybuffer",
                        headers: {
                            Authorization: `Bearer ${API_KEY}`,
                            Accept: "image/*",
                        },
                    }
                );

                if (response.status === 200) {
                    const blob = new Blob([response.data], { type: "image/png" });
                    const url = URL.createObjectURL(blob);
                    imageDataStore.imageData = url;
                    await incrementGenerationCount();
                } else {
                    console.error(`${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error transforming image:', error);
            } finally {
                loading.value = false;
                isGenerating.value = false;
                isCapture.value = true;
            }
        };

        const changeImageKorea = () => transformImage("A child in a stylized Korean webtoon drawing style, with extremely cute, exaggerated, and vibrant features. The person has very large, sparkling eyes, a small, rounded face, and an adorable expression, looking directly at the viewer. The style should be overwhelmingly adorable, with cartoonish qualities being the most prominent aspect.");
        const changeImageJapan = () => transformImage("A child in a Ghibli-style drawing, with exceptionally cute, soft, and whimsical features. The person has rounded cheeks, big, expressive eyes, and a sweet, gentle expression, looking at the viewer. The design should radiate a sense of overwhelming cuteness, with artistic, animation-like qualities being infused with a high level of sweetness.");
        const changeImageUSA = () => transformImage("A child in a Disney animation style, with extremely cute, soft, and expressive features. The person has slightly larger, more expressive eyes, a youthful, rounded face, and a charmingly cute expression, looking at the viewer. The style should strongly emphasize the classic Disney animation characteristics while making the overall look irresistibly adorable.");

        const replay = () => {
            imageDataStore.imageData = originalImage.value;
            isCapture.value = false;
        };

        const saveImage = () => {
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
        };

        const hashTagCopy = () => {
            const textToCopy = '#성결대학교 #XR센터 #컬쳐커넥션 #Culture_Connection #과천시청소년진로페스티벌';

            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    console.log('Text copied to clipboard successfully!');
                }).catch(err => {
                    console.error('Unable to copy text to clipboard:', err);
                });
            }
            else {
                const el = document.createElement('textarea');
                el.value = textToCopy;
                document.body.appendChild(el);
                el.select();
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        console.log('Text copied to clipboard successfully!');
                    } else {
                        console.error('Unable to copy text to clipboard');
                    }
                } catch (err) {
                    console.error('Unable to copy text to clipboard:', err);
                }
                document.body.removeChild(el);
            }
        }

        const share = async () => {
            const blob = await (await fetch(imageDataStore.imageData)).blob();
            const filesArray = [
                new File([blob], "image.png", {
                    type: blob.type,
                }),
            ];
            const shareData = {
                files: filesArray,
            };

            if (!navigator.share) {
                alert("공유하기 기능을 지원하지 않는 브라우저입니다.");
                return;
            }
            navigator
                .share(shareData)
                .catch(console.error);
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const back = () => {
            router.push('/review');
        };

        const setVH = () => {
            document.body.style.overflow = 'hidden';
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        const base64ToBlob = (base64, mime) => {
            const byteString = atob(base64);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ab], { type: mime });
        };

        const base64ToFile = (base64, filename) => {
            const [header, data] = base64.split(',');
            const mime = header.match(/:(.*?);/)[1];
            const blob = base64ToBlob(data, mime);
            return new File([blob], filename, { type: mime });
        };

        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);

            imageDataStore.getImageData();
            originalImage.value = imageDataStore.imageData;
            imageDataStore.getCanvasSize();

            if (originalImage.value) {
                originalFile.value = base64ToFile(originalImage.value, "image.png");
            }
        });

        return {
            back,
            showModal,
            closeModal,
            imageDataStore,
            changeImageKorea,
            changeImageJapan,
            changeImageUSA,
            loading,
            currentMessage,
            isCapture,
            replay,
            saveImage,
            share,
            showHashTag,
            hashTagCopy
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

.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
}

.progress-bar-container {
    width: 100%;
    height: 4px;
    background-color: #f3f3f3;
}

.progress-bar {
    width: 100%;
    height: 100%;
    background-color: #D50F4A;
    animation: progressAnimation 25s linear;
}

.loading-text {
    margin-top: 10px;
    font-size: 16px;
    color: #D50F4A;
}

@keyframes progressAnimation {
    0% {
        width: 0;
    }

    100% {
        width: 100%;
    }
}

#dialog-box {
    position: absolute;
    border-radius: 16px;
    border: 2px dashed #D50F4A;
    background: #FFF;
    padding: 10px;
    width: 80%;
    height: calc(30 * var(--vh));
    top: calc(50 * var(--vh));
    transform: translate(-50%, -50%);
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    max-width: 25ch;
    overflow-wrap: break-word;
    word-break: keep-all;
}

#dialog-box button {
    width: 60%;
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
    box-shadow: 0px 3px #922142;
    margin-top: 5%;
}
</style>