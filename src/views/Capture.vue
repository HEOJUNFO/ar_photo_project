<template>
    <div class="main">
        <div v-show="showOverlay" @click="showOverlay = false" class="overlay">
            <img src="@resource/common/AR_Logo_02.png" alt="overlay" />
            <div class="tutorial-inner">
                <p>안녕! 반가워</p>
                <p>마음 드는 <span style="color:#FFFF80">사진프레임</span>과</p>
                <p><span style="color:#FFFF80">스티커</span>를 선택해서</p>
                <p>지금부터 사진 촬영을 시작해볼까?</p>
                <br>
                <br>
                <p><span style="color:#FFFF80">#드래그</span>로 캐릭터 이동 가능</p>
                <p><span style="color:#FFFF80">#핀치줌</span>으로 크기 변경도 가능</p>
            </div>
            <div class="bottom-section3">
                <button><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <mask id="mask0_541_2068" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                            height="28">
                            <rect width="28" height="28" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_541_2068)">
                            <path
                                d="M3.5 15.1667V12.8333H5.83333V15.1667H3.5ZM3.5 10.5V8.16667H5.83333V10.5H3.5ZM8.16667 5.83333V3.5H10.5V5.83333H8.16667ZM12.8333 24.5V22.1667H15.1667V24.5H12.8333ZM12.8333 5.83333V3.5H15.1667V5.83333H12.8333ZM17.5 24.5V22.1667H19.8333V24.5H17.5ZM22.1667 19.8333V17.5H24.5V19.8333H22.1667ZM22.1667 15.1667V12.8333H24.5V15.1667H22.1667ZM23.3333 10.5C23.0028 10.5 22.7257 10.3882 22.5021 10.1646C22.2785 9.94097 22.1667 9.66389 22.1667 9.33333V5.83333H18.6667C18.3361 5.83333 18.059 5.72153 17.8354 5.49792C17.6118 5.27431 17.5 4.99722 17.5 4.66667C17.5 4.33611 17.6118 4.05903 17.8354 3.83542C18.059 3.61181 18.3361 3.5 18.6667 3.5H22.1667C22.8083 3.5 23.3576 3.72847 23.8146 4.18542C24.2715 4.64236 24.5 5.19167 24.5 5.83333V9.33333C24.5 9.66389 24.3882 9.94097 24.1646 10.1646C23.941 10.3882 23.6639 10.5 23.3333 10.5ZM5.83333 24.5C5.19167 24.5 4.64236 24.2715 4.18542 23.8146C3.72847 23.3576 3.5 22.8083 3.5 22.1667V18.6667C3.5 18.3361 3.61181 18.059 3.83542 17.8354C4.05903 17.6118 4.33611 17.5 4.66667 17.5C4.99722 17.5 5.27431 17.6118 5.49792 17.8354C5.72153 18.059 5.83333 18.3361 5.83333 18.6667V22.1667H9.33333C9.66389 22.1667 9.94097 22.2785 10.1646 22.5021C10.3882 22.7257 10.5 23.0028 10.5 23.3333C10.5 23.6639 10.3882 23.941 10.1646 24.1646C9.94097 24.3882 9.66389 24.5 9.33333 24.5H5.83333ZM22.1667 24.5V22.1667H24.5C24.5 22.8083 24.2715 23.3576 23.8146 23.8146C23.3576 24.2715 22.8083 24.5 22.1667 24.5ZM3.5 5.83333C3.5 5.19167 3.72847 4.64236 4.18542 4.18542C4.64236 3.72847 5.19167 3.5 5.83333 3.5V5.83333H3.5Z"
                                fill="white" />
                        </g>
                    </svg>프레임 <div class="icon-tutorial-skin">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="35" fill="none" stroke-width="2" stroke="#ffffff"></circle>
                            <circle cx="50" cy="50" r="30" fill="none" stroke-width="2" stroke="#ffffff"></circle>
                        </svg>
                    </div></button>

                <button></button>
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
                    </svg>스티커<div class="icon-tutorial-skin">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="35" fill="none" stroke-width="2" stroke="#ffffff"></circle>
                            <circle cx="50" cy="50" r="30" fill="none" stroke-width="2" stroke="#ffffff"></circle>
                        </svg>
                    </div></button>
            </div>
        </div>
        <div class="top-section">
            <button><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="#D50F4A" stroke-width="2" />
                    <mask id="mask0_541_1822" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                        height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1822)">
                        <path
                            d="M14 27H17V22C17 21.7167 17.0958 21.4792 17.2875 21.2875C17.4792 21.0958 17.7167 21 18 21H22C22.2833 21 22.5208 21.0958 22.7125 21.2875C22.9042 21.4792 23 21.7167 23 22V27H26V18L20 13.5L14 18V27ZM12 27V18C12 17.6833 12.0708 17.3833 12.2125 17.1C12.3542 16.8167 12.55 16.5833 12.8 16.4L18.8 11.9C19.15 11.6333 19.55 11.5 20 11.5C20.45 11.5 20.85 11.6333 21.2 11.9L27.2 16.4C27.45 16.5833 27.6458 16.8167 27.7875 17.1C27.9292 17.3833 28 17.6833 28 18V27C28 27.55 27.8042 28.0208 27.4125 28.4125C27.0208 28.8042 26.55 29 26 29H22C21.7167 29 21.4792 28.9042 21.2875 28.7125C21.0958 28.5208 21 28.2833 21 28V23H19V28C19 28.2833 18.9042 28.5208 18.7125 28.7125C18.5208 28.9042 18.2833 29 18 29H14C13.45 29 12.9792 28.8042 12.5875 28.4125C12.1958 28.0208 12 27.55 12 27Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
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
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>

        <div class="bottom-section">
            <button class="button2" @click="frameToggle()"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                    viewBox="0 0 28 28" fill="none">
                    <mask id="mask0_541_1841" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28"
                        height="28">
                        <rect width="28" height="28" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1841)">
                        <path
                            d="M3.5 15.1667V12.8333H5.83333V15.1667H3.5ZM3.5 10.5V8.16667H5.83333V10.5H3.5ZM8.16667 5.83333V3.5H10.5V5.83333H8.16667ZM12.8333 24.5V22.1667H15.1667V24.5H12.8333ZM12.8333 5.83333V3.5H15.1667V5.83333H12.8333ZM17.5 24.5V22.1667H19.8333V24.5H17.5ZM22.1667 19.8333V17.5H24.5V19.8333H22.1667ZM22.1667 15.1667V12.8333H24.5V15.1667H22.1667ZM23.3333 10.5C23.0028 10.5 22.7257 10.3882 22.5021 10.1646C22.2785 9.94097 22.1667 9.66389 22.1667 9.33333V5.83333H18.6667C18.3361 5.83333 18.059 5.72153 17.8354 5.49792C17.6118 5.27431 17.5 4.99722 17.5 4.66667C17.5 4.33611 17.6118 4.05903 17.8354 3.83542C18.059 3.61181 18.3361 3.5 18.6667 3.5H22.1667C22.8083 3.5 23.3576 3.72847 23.8146 4.18542C24.2715 4.64236 24.5 5.19167 24.5 5.83333V9.33333C24.5 9.66389 24.3882 9.94097 24.1646 10.1646C23.941 10.3882 23.6639 10.5 23.3333 10.5ZM5.83333 24.5C5.19167 24.5 4.64236 24.2715 4.18542 23.8146C3.72847 23.3576 3.5 22.8083 3.5 22.1667V18.6667C3.5 18.3361 3.61181 18.059 3.83542 17.8354C4.05903 17.6118 4.33611 17.5 4.66667 17.5C4.99722 17.5 5.27431 17.6118 5.49792 17.8354C5.72153 18.059 5.83333 18.3361 5.83333 18.6667V22.1667H9.33333C9.66389 22.1667 9.94097 22.2785 10.1646 22.5021C10.3882 22.7257 10.5 23.0028 10.5 23.3333C10.5 23.6639 10.3882 23.941 10.1646 24.1646C9.94097 24.3882 9.66389 24.5 9.33333 24.5H5.83333ZM22.1667 24.5V22.1667H24.5C24.5 22.8083 24.2715 23.3576 23.8146 23.8146C23.3576 24.2715 22.8083 24.5 22.1667 24.5ZM3.5 5.83333C3.5 5.19167 3.72847 4.64236 4.18542 4.18542C4.64236 3.72847 5.19167 3.5 5.83333 3.5V5.83333H3.5Z"
                            fill="#D50F4A" />
                    </g>
                </svg>프레임</button>
            <button class="button1" onclick="captureImage()"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                    viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                    <circle opacity="0.3" cx="35" cy="35" r="33.5" stroke="#D50F4A" stroke-width="3" />
                    <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                </svg></button>
            <button class="button2" @click="stickerToggle()"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
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
                <img @click="setFrame(imageObj)" v-for="(imageObj, index) in FRAMES" :key="index" :src="imageObj.src"
                    :alt="imageObj.text" />
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
                <img @click="setCharacter()" src="@resource/icon/bell_model.png"
                    :class="{ 'selected': selectedCharacter }" />
                <img @click="setSticker(imageObj)" v-for="(imageObj, index) in STICKERS" :key="index" :src="imageObj.src"
                    :alt="imageObj.text" :class="{ 'selected': selectedSticker === index }" />
            </div>
        </div>

        <div v-if="showModal" class="modal">
            <p>뒤로 돌아갑니다.</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
        <div v-if="setFrameSrc" class="frame">
            <img :src="setFrameSrc" alt="봄" />
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { useImageDataStore } from '../stores/imageData.js'
import Experience from '../ar/capture/Experience.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../router';

export default {
    name: 'capture',
    setup() {
        let experience;
        const showModal = ref(false);
        const eventName = ref('capture')
        const frameList = ref(false)
        const showOverlay = ref(true)
        const stickerList = ref(false)
        const selectedSticker = ref(null)
        const selectedCharacter = ref(false)
        const setFrameSrc = ref(null)

        const enableFilp = ref(true)

        const characterStore = useCharacterStore()
        const imageDataStore = useImageDataStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common4[textIndex.value] || {}
        })

        const FRAMES = [
            { id: 0, src: new URL('@resource/frame/frame_01.png', import.meta.url).href, text: '봄' },
            { id: 1, src: new URL('@resource/frame/frame_02.png', import.meta.url).href, text: '여름' },
            { id: 2, src: new URL('@resource/frame/frame_03.png', import.meta.url).href, text: '가을' },
            { id: 3, src: new URL('@resource/frame/frame_04.png', import.meta.url).href, text: '겨울' },
        ];

        const STICKERS = [
            { id: 0, src: new URL('@resource/icon/Bell_01.png', import.meta.url).href, name: 'bellNormal' },
            { id: 1, src: new URL('@resource/icon/Bell_02.png', import.meta.url).href, name: 'bellHappy' },
            { id: 2, src: new URL('@resource/icon/Bell_03.png', import.meta.url).href, name: 'bellWelcome' },
            { id: 3, src: new URL('@resource/icon/uno_01.png', import.meta.url).href, name: 'sorinaNormal' },
            { id: 4, src: new URL('@resource/icon/uno_02.png', import.meta.url).href, name: 'sorinaHappy' },
            { id: 5, src: new URL('@resource/icon/uno_03.png', import.meta.url).href, name: 'sorinaWelcome' },
            { id: 6, src: new URL('@resource/icon/sorina_01.png', import.meta.url).href, name: 'unoNormal' },
            { id: 7, src: new URL('@resource/icon/sorina_02.png', import.meta.url).href, name: 'unoHappy' },
            { id: 8, src: new URL('@resource/icon/sorina_03.png', import.meta.url).href, name: 'unoWelcome' },
        ]

        const stickerToggle = () => {
            stickerList.value = !stickerList.value
            frameList.value = false
        }

        const frameToggle = () => {
            stickerList.value = false
            frameList.value = !frameList.value
        }

        const setSticker = (image) => {
            experience.world.setSticker(image.name)
            selectedSticker.value = image.id
        }
        const setCharacter = () => {
            experience.world.setCharacter()
            selectedCharacter.value = true
        }

        const setFrame = (image) => {
            setFrameSrc.value = image.src
        }

        const saveImage = (image) => {
            imageDataStore.setImageData(image)
            imageDataStore.setEventName(eventName.value)
            router.push({ path: '/capturereview' });
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

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);
            experience.resources.on('ready', () => {
            })
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
    height: calc(70 * var(--vh));
    width: calc((4/6) * 70 * var(--vh));
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
    height: calc(20 * var(--vh));
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
    top: calc(68 * var(--vh));
    left: 3%;
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
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
}

.overlay img {
    position: absolute;
    top: calc(30 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: auto;
}

.tutorial-inner {
    position: absolute;
    top: calc(50 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: auto;
}

.tutorial-inner p {
    color: var(--Text-White, #FFF);
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
    height: calc(20 * var(--vh));
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
    height: calc(70 * var(--vh));
    width: calc((4/6) * 70 * var(--vh));
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
    opacity: 0.5;
    margin-top: 5%;
}

@keyframes beat {
    from {
        transform: scale(2);
    }

    to {
        transform: scale(3);
    }
}

.selected {
    filter: grayscale(100%);
}
</style>