<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
import { ref, onMounted, provide, onUnmounted } from 'vue'

export default {
    name: 'App',
    setup() {
        const audio = ref(null);

        onMounted(() => {
            if (location.protocol !== 'https:') {
                location.protocol = 'https:';
            }

            window.onload = () => {
                if (navigator.userAgent.match(/inapp|NAVER|KAKAOTALK|Snapchat|Line|WirtschaftsWoche|Thunderbird|Instagram|everytimeApp|WhatsApp|Electron|wadiz|AliApp|zumapp|iPhone(.*)Whale|Android(.*)Whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1-9]/)) {
                    document.body.innerHTML = "";
                    var tartgetUrl = window.location.host + window.location.pathname + window.location.search;

                    if (navigator.userAgent.match(/iPhone|iPad/i)) {
                        //ios
                        var visitedAt = (new Date()).getTime(); // 방문 시간
                        setTimeout(
                            function () {
                                if ((new Date()).getTime() - visitedAt < 2000) {
                                    location.href = IOS_CHROME_MARKET_URL;
                                }
                            }, 500);

                        setTimeout(function () {
                            location.href = "googlechromes://" + tartgetUrl;
                        }, 0);
                    } else {
                        //android
                        location.href = "intent://" + tartgetUrl + "#Intent;scheme=https;package=com.android.chrome;end";
                    }
                }
            };





        });


        return {}
    }
}
</script>

<style >
@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

@media screen and (orientation: landscape) {
    body::after {
        content: '가로 모드는 지원하지 않습니다.';
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.85);
        /* 반투명한 검은색 배경 */
        color: white;
        /* 텍스트 색상 */
        font-size: 20px;
        z-index: 9999;
        /* 다른 요소 위에 오버레이가 표시되도록 z-index 설정 */
    }
}

* {
    margin: 0;
    padding: 0;
}



.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}
</style>