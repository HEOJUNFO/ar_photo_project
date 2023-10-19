<template>
    <div class="main">
        <div v-show="showLoading" class="overlay2" :style="bgStyle">
            <div class="tutorial-inner2">
                <p class="large-text" style="color: #ffffff;">
                    <span class="extra-large-text">더플래쉬</span>와 함께<br>컬쳐버스로 <span class="extra-large-text">GoGo!</span>
                </p>
                <img src="@resource/common/bell.png">
            </div>
            <progress class="loadingbar" value="0" max="100"></progress>
            <div class="tutorial-inner3">
                <p style="color:#ffffff">AR 준비중...</p>
            </div>
        </div>
        <div v-show="showOverlay" @click="showOverlay = false, setFrame(FRAMES[0])" class="overlay">
            <img src="@resource/common/bell.png" alt="overlay" />
            <div class="tutorial-inner">
                <h1><span style="color:#d50f4a">벨, 소리나, 우노</span></h1>
                <h1>마음에 드는 캐릭터를 선택해서</h1>
                <h1>촬영을 시작해 볼까?</h1>
                <br>
                <p><span style="color:#d50f4a">#드래그</span>로 이동 가능</p>
                <p><span style="color:#d50f4a">#핀치줌</span>으로 크기 변경도 가능</p>
            </div>
            <div class="bottom-section3">
                <button><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <mask id="mask0_541_2073" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                            height="28">
                            <rect width="28" height="28" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_541_2073)">
                            <path
                                d="M14 14C12.7167 14 11.6181 13.543 10.7042 12.6292C9.7903 11.7153 9.33335 10.6167 9.33335 9.33332C9.33335 8.04999 9.7903 6.95138 10.7042 6.03749C11.6181 5.1236 12.7167 4.66666 14 4.66666C15.2834 4.66666 16.382 5.1236 17.2959 6.03749C18.2097 6.95138 18.6667 8.04999 18.6667 9.33332C18.6667 10.6167 18.2097 11.7153 17.2959 12.6292C16.382 13.543 15.2834 14 14 14ZM4.66669 21V20.0667C4.66669 19.4055 4.83683 18.7979 5.1771 18.2437C5.51738 17.6896 5.96946 17.2667 6.53335 16.975C7.73891 16.3722 8.96391 15.9201 10.2084 15.6187C11.4528 15.3174 12.7167 15.1667 14 15.1667C15.2834 15.1667 16.5472 15.3174 17.7917 15.6187C19.0361 15.9201 20.2611 16.3722 21.4667 16.975C22.0306 17.2667 22.4827 17.6896 22.8229 18.2437C23.1632 18.7979 23.3334 19.4055 23.3334 20.0667V21C23.3334 21.6417 23.1049 22.191 22.6479 22.6479C22.191 23.1049 21.6417 23.3333 21 23.3333H7.00002C6.35835 23.3333 5.80905 23.1049 5.3521 22.6479C4.89516 22.191 4.66669 21.6417 4.66669 21ZM7.00002 21H21V20.0667C21 19.8528 20.9465 19.6583 20.8396 19.4833C20.7327 19.3083 20.5917 19.1722 20.4167 19.075C19.3667 18.55 18.307 18.1562 17.2375 17.8937C16.1681 17.6312 15.0889 17.5 14 17.5C12.9111 17.5 11.832 17.6312 10.7625 17.8937C9.69308 18.1562 8.63335 18.55 7.58335 19.075C7.40835 19.1722 7.26738 19.3083 7.16044 19.4833C7.05349 19.6583 7.00002 19.8528 7.00002 20.0667V21ZM14 11.6667C14.6417 11.6667 15.191 11.4382 15.6479 10.9812C16.1049 10.5243 16.3334 9.97499 16.3334 9.33332C16.3334 8.69166 16.1049 8.14235 15.6479 7.68541C15.191 7.22846 14.6417 6.99999 14 6.99999C13.3584 6.99999 12.809 7.22846 12.3521 7.68541C11.8952 8.14235 11.6667 8.69166 11.6667 9.33332C11.6667 9.97499 11.8952 10.5243 12.3521 10.9812C12.809 11.4382 13.3584 11.6667 14 11.6667Z"
                                fill="white" />
                        </g>
                    </svg>캐릭터 <div class="icon-tutorial-skin">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="35" fill="none" stroke-width="2" stroke="#d50f4a"></circle>
                            <circle cx="50" cy="50" r="30" fill="none" stroke-width="2" stroke="#d50f4a"></circle>
                        </svg>
                    </div></button>

                <button></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path
                            d="M15 25.5903C16.3269 26.7779 18.0791 27.5 20 27.5C24.1421 27.5 27.5 24.1422 27.5 20C27.5 16.5413 25.1588 13.6295 21.9748 12.7627M8.02522 12.7627C4.84117 13.6295 2.5 16.5413 2.5 20C2.5 24.1421 5.85786 27.5 10 27.5C14.1421 27.5 17.5 24.1421 17.5 20C17.5 19.0244 17.3137 18.0923 16.9748 17.2373M22.5 10C22.5 14.1421 19.1421 17.5 15 17.5C10.8579 17.5 7.5 14.1421 7.5 10C7.5 5.85786 10.8579 2.5 15 2.5C19.1421 2.5 22.5 5.85786 22.5 10Z"
                            stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>스티커<div class="icon-tutorial-skin">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="35" fill="none" stroke-width="2" stroke="#d50f4a"></circle>
                            <circle cx="50" cy="50" r="30" fill="none" stroke-width="2" stroke="#d50f4a"></circle>
                        </svg>
                    </div></button>
            </div>
        </div>
        <div class="top-section">
            <button></button>
            <button onclick="switchCamera()"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                    viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="#D50F4A" stroke-width="2" />
                    <path
                        d="M20 30C17.8667 30 15.9458 29.3917 14.2375 28.175C12.5292 26.9583 11.3167 25.3667 10.6 23.4C10.5167 23.15 10.5417 22.9167 10.675 22.7C10.8083 22.4833 11.0083 22.3333 11.275 22.25C11.5417 22.1667 11.7958 22.1958 12.0375 22.3375C12.2792 22.4792 12.45 22.675 12.55 22.925C13.15 24.4417 14.125 25.6667 15.475 26.6C16.825 27.5333 18.3333 28 20 28C21.4333 28 22.7667 27.6458 24 26.9375C25.2333 26.2292 26.2 25.25 26.9 24H25C24.7167 24 24.4792 23.9042 24.2875 23.7125C24.0958 23.5208 24 23.2833 24 23C24 22.7167 24.0958 22.4792 24.2875 22.2875C24.4792 22.0958 24.7167 22 25 22H29C29.2833 22 29.5208 22.0958 29.7125 22.2875C29.9042 22.4792 30 22.7167 30 23V27C30 27.2833 29.9042 27.5208 29.7125 27.7125C29.5208 27.9042 29.2833 28 29 28C28.7167 28 28.4792 27.9042 28.2875 27.7125C28.0958 27.5208 28 27.2833 28 27V26C27.05 27.2667 25.875 28.25 24.475 28.95C23.075 29.65 21.5833 30 20 30ZM20 12C18.5667 12 17.2333 12.3542 16 13.0625C14.7667 13.7708 13.8 14.75 13.1 16H15C15.2833 16 15.5208 16.0958 15.7125 16.2875C15.9042 16.4792 16 16.7167 16 17C16 17.2833 15.9042 17.5208 15.7125 17.7125C15.5208 17.9042 15.2833 18 15 18H11C10.7167 18 10.4792 17.9042 10.2875 17.7125C10.0958 17.5208 10 17.2833 10 17V13C10 12.7167 10.0958 12.4792 10.2875 12.2875C10.4792 12.0958 10.7167 12 11 12C11.2833 12 11.5208 12.0958 11.7125 12.2875C11.9042 12.4792 12 12.7167 12 13V14C12.95 12.7333 14.125 11.75 15.525 11.05C16.925 10.35 18.4167 10 20 10C22.1333 10 24.0542 10.6083 25.7625 11.825C27.4708 13.0417 28.6833 14.6333 29.4 16.6C29.4833 16.85 29.4583 17.0833 29.325 17.3C29.1917 17.5167 28.9917 17.6667 28.725 17.75C28.4583 17.8333 28.2042 17.8042 27.9625 17.6625C27.7208 17.5208 27.55 17.325 27.45 17.075C26.85 15.5583 25.875 14.3333 24.525 13.4C23.175 12.4667 21.6667 12 20 12Z"
                        fill="#D50F4A" />
                </svg></button>
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
        <div id="webgl" class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>

        <div class="bottom-section">
            <button class="button2" @click="frameToggle()"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                    viewBox="0 0 28 28" fill="none">
                    <mask id="mask0_541_1846" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                        height="28">
                        <rect width="28" height="28" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1846)">
                        <path
                            d="M14 14C12.7167 14 11.618 13.543 10.7042 12.6292C9.79027 11.7153 9.33332 10.6167 9.33332 9.33332C9.33332 8.04999 9.79027 6.95138 10.7042 6.03749C11.618 5.1236 12.7167 4.66666 14 4.66666C15.2833 4.66666 16.3819 5.1236 17.2958 6.03749C18.2097 6.95138 18.6667 8.04999 18.6667 9.33332C18.6667 10.6167 18.2097 11.7153 17.2958 12.6292C16.3819 13.543 15.2833 14 14 14ZM4.66666 21V20.0667C4.66666 19.4055 4.8368 18.7979 5.17707 18.2437C5.51735 17.6896 5.96943 17.2667 6.53332 16.975C7.73888 16.3722 8.96388 15.9201 10.2083 15.6187C11.4528 15.3174 12.7167 15.1667 14 15.1667C15.2833 15.1667 16.5472 15.3174 17.7917 15.6187C19.0361 15.9201 20.2611 16.3722 21.4667 16.975C22.0305 17.2667 22.4826 17.6896 22.8229 18.2437C23.1632 18.7979 23.3333 19.4055 23.3333 20.0667V21C23.3333 21.6417 23.1049 22.191 22.6479 22.6479C22.191 23.1049 21.6417 23.3333 21 23.3333H6.99999C6.35832 23.3333 5.80902 23.1049 5.35207 22.6479C4.89513 22.191 4.66666 21.6417 4.66666 21ZM6.99999 21H21V20.0667C21 19.8528 20.9465 19.6583 20.8396 19.4833C20.7326 19.3083 20.5917 19.1722 20.4167 19.075C19.3667 18.55 18.3069 18.1562 17.2375 17.8937C16.168 17.6312 15.0889 17.5 14 17.5C12.9111 17.5 11.8319 17.6312 10.7625 17.8937C9.69305 18.1562 8.63332 18.55 7.58332 19.075C7.40832 19.1722 7.26735 19.3083 7.16041 19.4833C7.05346 19.6583 6.99999 19.8528 6.99999 20.0667V21ZM14 11.6667C14.6417 11.6667 15.191 11.4382 15.6479 10.9812C16.1049 10.5243 16.3333 9.97499 16.3333 9.33332C16.3333 8.69166 16.1049 8.14235 15.6479 7.68541C15.191 7.22846 14.6417 6.99999 14 6.99999C13.3583 6.99999 12.809 7.22846 12.3521 7.68541C11.8951 8.14235 11.6667 8.69166 11.6667 9.33332C11.6667 9.97499 11.8951 10.5243 12.3521 10.9812C12.809 11.4382 13.3583 11.6667 14 11.6667Z"
                            fill="#D50F4A" />
                    </g>
                </svg>캐릭터</button>
            <button class="button1" onclick="captureImage()"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                    viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                    <circle opacity="0.3" cx="35" cy="35" r="33.5" stroke="#D50F4A" stroke-width="3" />
                    <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                </svg></button>
            <button class="button2" @click="stickerToggle()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                    viewBox="0 0 30 30" fill="none">
                    <path
                        d="M15 25.5903C16.3269 26.7779 18.0791 27.5 20 27.5C24.1421 27.5 27.5 24.1422 27.5 20C27.5 16.5413 25.1588 13.6295 21.9748 12.7627M8.02522 12.7627C4.84117 13.6295 2.5 16.5413 2.5 20C2.5 24.1421 5.85786 27.5 10 27.5C14.1421 27.5 17.5 24.1421 17.5 20C17.5 19.0244 17.3137 18.0923 16.9748 17.2373M22.5 10C22.5 14.1421 19.1421 17.5 15 17.5C10.8579 17.5 7.5 14.1421 7.5 10C7.5 5.85786 10.8579 2.5 15 2.5C19.1421 2.5 22.5 5.85786 22.5 10Z"
                        stroke="#D50F4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>스티커</button>
        </div>

        <div v-if="frameList">
            <div class="image-container">

                <button @click="frameList = false"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"
                        viewBox="0 0 56 56" fill="none">
                        <rect width="56" height="56" rx="8" fill="white" />
                        <mask id="mask0_541_1787" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="14" y="14"
                            width="28" height="28">
                            <rect x="14" y="42" width="28" height="28" transform="rotate(-90 14 42)" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_541_1787)">
                            <path
                                d="M28.0001 30.8584L36.5751 22.2834C36.8668 21.9917 37.2071 21.8507 37.596 21.8605C37.9849 21.8702 38.3251 22.0209 38.6168 22.3126C38.9085 22.6042 39.0543 22.9445 39.0543 23.3334C39.0543 23.7223 38.9085 24.0625 38.6168 24.3542L29.6626 33.3376C29.4293 33.5709 29.1668 33.7459 28.8751 33.8626C28.5835 33.9792 28.2918 34.0376 28.0001 34.0376C27.7085 34.0376 27.4168 33.9792 27.1251 33.8626C26.8335 33.7459 26.571 33.5709 26.3376 33.3376L17.3543 24.3542C17.0626 24.0626 16.9217 23.7174 16.9314 23.3188C16.9411 22.9202 17.0918 22.5751 17.3835 22.2834C17.6751 21.9917 18.0154 21.8459 18.4043 21.8459C18.7932 21.8459 19.1335 21.9917 19.4251 22.2834L28.0001 30.8584Z"
                                fill="#9F9F9F" />
                        </g>
                    </svg></button>

                <img @click="setCharacter(imageObj)" v-for="(imageObj, index) in CHARACTERS" :src="imageObj.src"
                    :class="{ 'selected': selectedCharacter === index }" />
            </div>
        </div>

        <div v-if="stickerList">
            <div class="image-container">
                <button @click="stickerList = false"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"
                        viewBox="0 0 56 56" fill="none">
                        <rect width="56" height="56" rx="8" fill="white" />
                        <mask id="mask0_541_1787" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="14" y="14"
                            width="28" height="28">
                            <rect x="14" y="42" width="28" height="28" transform="rotate(-90 14 42)" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_541_1787)">
                            <path
                                d="M28.0001 30.8584L36.5751 22.2834C36.8668 21.9917 37.2071 21.8507 37.596 21.8605C37.9849 21.8702 38.3251 22.0209 38.6168 22.3126C38.9085 22.6042 39.0543 22.9445 39.0543 23.3334C39.0543 23.7223 38.9085 24.0625 38.6168 24.3542L29.6626 33.3376C29.4293 33.5709 29.1668 33.7459 28.8751 33.8626C28.5835 33.9792 28.2918 34.0376 28.0001 34.0376C27.7085 34.0376 27.4168 33.9792 27.1251 33.8626C26.8335 33.7459 26.571 33.5709 26.3376 33.3376L17.3543 24.3542C17.0626 24.0626 16.9217 23.7174 16.9314 23.3188C16.9411 22.9202 17.0918 22.5751 17.3835 22.2834C17.6751 21.9917 18.0154 21.8459 18.4043 21.8459C18.7932 21.8459 19.1335 21.9917 19.4251 22.2834L28.0001 30.8584Z"
                                fill="#9F9F9F" />
                        </g>
                    </svg></button>
                <img @click="setSticker(imageObj)" v-for="(imageObj, index) in STICKERS" :key="index" :src="imageObj.src"
                    :class="{ 'selected': selectedSticker === index }" />
            </div>
        </div>

        <div v-if="showModal" class="modal">
            <p>정말 종료하시겠습니까?</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
        <div v-show="setFrameSrc" class="frame">
            <img :src="setFrameSrc" alt="봄" />
        </div>
    </div>
</template>

<script>
import Experience from '../../ar/capture/Experience.js'
import { onMounted, ref, computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../../router';
import { useImageDataStore } from '../../stores/imageData.js'

const bell01 = new URL('@resource/icon/bell_01.png', import.meta.url).href
const bell02 = new URL('@resource/icon/bell_02.png', import.meta.url).href
const bell03 = new URL('@resource/icon/bell_03.png', import.meta.url).href
const bell04 = new URL('@resource/icon/bell_04.png', import.meta.url).href
const uno01 = new URL('@resource/icon/uno_01.png', import.meta.url).href
const uno02 = new URL('@resource/icon/uno_02.png', import.meta.url).href
const uno03 = new URL('@resource/icon/uno_03.png', import.meta.url).href
const uno04 = new URL('@resource/icon/uno_04.png', import.meta.url).href
const sorina01 = new URL('@resource/icon/sorina_01.png', import.meta.url).href
const sorina02 = new URL('@resource/icon/sorina_02.png', import.meta.url).href
const sorina03 = new URL('@resource/icon/sorina_03.png', import.meta.url).href
const sorina04 = new URL('@resource/icon/sorina_04.png', import.meta.url).href

const frame = new URL('@resource/frame/skin_05.png', import.meta.url).href

const bellCharacter = new URL('@resource/frame/frame_bell.png', import.meta.url).href

const sorinaCharacter = new URL('@resource/frame/frame_sorina.png', import.meta.url).href

const unoCharacter = new URL('@resource/frame/frame_uno.png', import.meta.url).href

export default {
    name: 'capture',
    setup() {
        const audio = ref(null);
        const audio2 = ref(null);

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

        import('@resource/sounds/shutter.wav')
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
        let experience;
        const imageDataStore = useImageDataStore()
        const showModal = ref(false);
        const eventName = ref('capture')
        const frameList = ref(false)
        const showOverlay = ref(true)
        const stickerList = ref(false)
        const selectedSticker = ref(null)
        const setFrameSrc = ref(null)
        const selectedCharacter = ref(false)
        const showLoading = ref(true)
        const enableFilp = ref(true)

        const bgImageUrl = new URL('@resource/common/bg2.png', import.meta.url).href;

        const bgStyle = computed(() => {
            return {
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: 'cover',
                zIndex: 9999,
            }
        })

        const CHARACTERS = ref([
            { id: 0, src: bellCharacter, name: 'bell' },
            { id: 1, src: sorinaCharacter, name: 'uno' },
            { id: 2, src: unoCharacter, name: 'sorina' },
        ])

        const FRAMES = ref([{ id: 0, src: frame, text: '없음' },])



        const STICKERS = ref([{ id: 0, src: bell04, name: 'bellBody' },
        { id: 1, src: bell01, name: 'bellNormal' },
        { id: 2, src: bell02, name: 'bellHappy' },
        { id: 3, src: bell03, name: 'bellWelcome' },
        { id: 4, src: uno04, name: 'unoBody' },
        { id: 5, src: uno01, name: 'unoNormal' },
        { id: 6, src: uno02, name: 'unoHappy' },
        { id: 7, src: uno03, name: 'unoWelcome' },
        { id: 8, src: sorina04, name: 'sorinaBody' },
        { id: 9, src: sorina01, name: 'sorinaNormal' },
        { id: 10, src: sorina02, name: 'sorinaHappy' },
        { id: 11, src: sorina03, name: 'sorinaWelcome' },])

        const stickerToggle = () => {
            playAudio();
            stickerList.value = !stickerList.value
            frameList.value = false
            if (stickerList.value) {
                enableScroll();
            }
            else {
                disableScroll();
            }
        }


        const frameToggle = () => {
            playAudio();
            stickerList.value = false
            frameList.value = !frameList.value
            if (frameList.value) {
                enableScroll();
            }
            else {
                disableScroll();
            }
        }

        const setSticker = (image) => {
            playAudio();
            experience.world.setSticker(image.name)
            experience.world.removeCharacter()
            selectedSticker.value = image.id
            selectedCharacter.value = false
        }
        const setCharacter = (image) => {
            playAudio();
            experience.world.removeSticker()
            experience.world.setCharacter(image.id)
            selectedSticker.value = null
            selectedCharacter.value = image.id
        }

        const setFrame = (image) => {

            setFrameSrc.value = image.src
        }

        const saveImage = (image) => {
            playAudio2();
            imageDataStore.setImageData(image)
            imageDataStore.setEventName(eventName.value)
            let canvas = document.querySelector('canvas.webgl')
            let width = canvas.style.width
            let height = canvas.style.height
            imageDataStore.setCanvasSize(width, height)

            router.push({ path: '/busan3' });
        }

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

        const setVH = () => {
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        const preventTouchMove = (e) => {
            e.preventDefault();
        }

        const disableScroll = () => {
            document.body.addEventListener('touchmove', preventTouchMove, { passive: false });
        }

        const enableScroll = () => {
            document.body.removeEventListener('touchmove', preventTouchMove, { passive: false });
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            disableScroll();

            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);
            experience.resources.on('ready', () => {
                setTimeout(() => {
                    showLoading.value = false
                }, 1000);
            })

            STICKERS.value.forEach(sticker => {
                const img = new Image();
                img.src = sticker.src;
            });

            var progressBar = document.querySelector('.loadingbar');
            var progressValue = 0;
            var intervalDuration = 35; // milliseconds
            var incrementValue = (intervalDuration / 3500) * 100; // this will increment the value so it fills up in 3 seconds

            var interval = setInterval(function () {
                progressValue += incrementValue;
                progressBar.value = progressValue;

                if (progressValue >= 100) {
                    clearInterval(interval);
                }
            }, intervalDuration);
        });

        onBeforeRouteLeave(() => {

            experience.dispose()
            experience.destroy()
            experience.init()


        });


        return {
            enableFilp,
            back,
            showModal,
            confirmBack,
            closeModal,
            frameList,
            showOverlay,
            FRAMES,
            stickerList,
            stickerToggle,
            frameToggle,
            STICKERS,
            setSticker,
            setCharacter,
            selectedSticker,
            selectedCharacter,
            setFrame,
            setFrameSrc,
            CHARACTERS,
            showLoading,
            bgStyle,
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

.webgl-container {
    height: calc(75 * var(--vh));
    width: calc((4/6) * 75 * var(--vh));
    top: calc(10 * var(--vh));
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

}

.webgl {
    position: relative;
    outline: none;
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
    align-items: center;
    justify-content: center;
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.button1 svg {
    width: auto;
    height: calc(10* var(--vh));

}

.button2 svg {
    width: auto;
    height: calc(5* var(--vh));

}

.image-container {
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: calc(10 * var(--vh));
    position: absolute;
    z-index: 2;
    top: calc(70 * var(--vh));
    left: 2%;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;

}

.image-container button {
    background-color: #FFF;
    border-radius: 8px;
    border: none;
    width: calc(10 * var(--vh));
    height: calc(10 * var(--vh));
    margin-right: 3%;
}



.image-container img {
    width: calc(10 * var(--vh));
    height: calc(10 * var(--vh));
    margin-right: 3%;
    background-color: #FFF;
    border-radius: 8px;
}



.image-container::-webkit-scrollbar {
    display: none !important;
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

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    z-index: 3;
}

.overlay img {
    position: absolute;
    top: calc(35 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
}

.overlay2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    z-index: 5;
}

.overlay2 img {
    position: absolute;
    top: calc(30 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
}

.tutorial-inner {
    position: absolute;
    top: calc(60 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: auto;
}

.tutorial-inner p {
    color: var(--Text-White, #000);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.tutorial-inner h1 {
    color: var(--Text-White, #000);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.4px;
}


.tutorial-inner2 {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: calc(20 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
}

.tutorial-inner2 p {
    color: var(--Text-White, #000);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    letter-spacing: -0.4px;
}


.tutorial-inner3 {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: calc(70 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: auto;
}

.tutorial-inner3 p {
    color: var(--Text-White, #000);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.bottom-section3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(15 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
}


.bottom-section3 button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.bottom-section3 button svg {
    width: auto;
    height: calc(5* var(--vh));

}

.frame {
    position: absolute;
    top: calc(10* var(--vh));
    height: calc(75 * var(--vh));
    width: calc((4/6) * 75 * var(--vh));
    pointer-events: none;
}

.frame img {
    width: 100%;
    height: 100%;
}

.icon-tutorial-skin {
    position: absolute;
    width: 100%;
    animation: beat .35s infinite alternate;
    transform-origin: center;
    opacity: 1;
    margin-top: calc(4 * var(--vh));
}

@keyframes beat {
    from {
        transform: scale(3);
    }

    to {
        transform: scale(5);
    }
}

.selected {
    filter: grayscale(100%);
}

.loadingbar {
    position: absolute;
    top: calc(65 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: calc(5 * var(--vh));
    z-index: 10;
}

.large-text {
    font-size: 1.5em;
}

.extra-large-text {
    font-size: 1.6em;
    font-weight: bold;
}
</style>