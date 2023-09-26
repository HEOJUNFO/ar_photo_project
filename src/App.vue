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

        const getBrowserName = () => {
            var userAgent = navigator.userAgent.toLowerCase();
            let browserName = "";

            if (userAgent.match(/chrome|chromium|crios/i)) {
                browserName = "chrome";
            } else if (userAgent.match(/firefox|fxios/i)) {
                browserName = "firefox";
            } else if (userAgent.match(/safari/i)) {
                browserName = "safari";
            } else if (userAgent.match(/opr\//i)) {
                browserName = "opera";
            } else if (userAgent.match(/edg/i)) {
                browserName = "edge";
            } else if (userAgent.match(/samsung/i)) {
                browserName = "samsung";
            } else {
                browserName = "other";
            }

            if (userAgent.match(/kakao/i)) {
                browserName = "kakao";
            }

            if (userAgent.match(/whale/i)) {
                browserName = "whale";
            }


            return browserName;
        }


        const getIosVersion = () => {
            var agent = navigator.userAgent,
                start = agent.indexOf('OS');
            if ((agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1) && start > -1) {
                return window.Number(agent.slice(start + 3, 3).replace('_', '.'));
            }
            return 0;
        }

        const getOsName = () => {
            var os, ua = navigator.userAgent;
            if (ua.match(/Win(dows )?NT 6\.0/)) {
                os = "Windows Vista";
            } else if (ua.match(/Win(dows )?(NT 5\.1|XP)/)) {
                os = "Windows XP";
            } else {
                if ((ua.indexOf("Windows NT 5.1") != -1) || (ua.indexOf("Windows XP") != -1)) {
                    os = "Windows XP";
                } else if ((ua.indexOf("Windows NT 7.0") != -1) || (ua.indexOf("Windows NT 6.1") != -1)) {
                    os = "Windows 7";
                } else if ((ua.indexOf("Windows NT 8.0") != -1) || (ua.indexOf("Windows NT 6.2") != -1)) {
                    os = "Windows 8";
                } else if ((ua.indexOf("Windows NT 8.1") != -1) || (ua.indexOf("Windows NT 6.3") != -1)) {
                    os = "Windows 8.1";
                } else if ((ua.indexOf("Windows NT 10.0") != -1) || (ua.indexOf("Windows NT 6.4") != -1)) {
                    os = "Windows 10";
                } else if ((ua.indexOf("iPad") != -1)) {
                    os = "iPad iOS " + getIosVersion();
                } else if ((ua.indexOf("iPhone") != -1)) {
                    os = "iPhone iOS " + getIosVersion();
                } else if ((ua.indexOf("iPod") != -1)) {
                    os = "iPod iOS " + getIosVersion();
                } else if (ua.indexOf("Android" != -1)) {
                    os = "Android";
                } else if (ua.match(/Win(dows )?NT( 4\.0)?/)) {
                    os = "Windows NT";
                } else if (ua.match(/Mac|PPC/)) {
                    os = "Mac OS";
                } else if (ua.match(/Linux/)) {
                    os = "Linux";
                } else if (ua.match(/(Free|Net|Open)BSD/)) {
                    os = RegExp.$1 + "BSD";
                } else if (ua.match(/SunOS/)) {
                    os = "Solaris";
                } else {
                    os = "Other";
                }
            }
            if (os.indexOf("Windows") != -1) {
                if (navigator.userAgent.indexOf('WOW64') > -1 || navigator.userAgent.indexOf('Win64') > -1) {
                    os += ' 64bit';
                } else {
                    os += ' 32bit';
                }
            }

            return os;
        }


        const checkBrowser = (useChange) => {
            let os = getOsName();
            let browser = getBrowserName();

            if (os.match(/iPhone|iPad|iPod/i)) { // 아이폰 접속 경우
                // if(browser == 'kakao' || browser == 'whale')
                if (browser == 'kakao') {
                    if (useChange == true) {
                        var url = window.location.href;
                        var link = url.slice(0, url.lastIndexOf("/")) + "/kakao.html";
                        location.href = link;
                    }

                    return false;
                }
            }
            else {
                if (browser == 'kakao' || browser == 'samsung') { // 안드로이드
                    // 먼저, 카카오 인앱 브라우저 닫기
                    if (useChange == true) {
                        if (browser == 'kakao')
                            location.href = 'kakaotalk://inappbrowser/close';

                        location.href = "intent://" + tartgetUrl + "#Intent;scheme=https;package=com.android.chrome;end";

                    }
                    return false;
                }
            }

            return true;
        }



        onMounted(() => {
            let os2 = getOsName();
            let browser2 = getBrowserName();

            alert(os2 + " " + browser2)

            checkBrowser(true)


            if (location.protocol !== 'https:') {
                location.protocol = 'https:';
            }



            // window.onload = () => {
            //     if (navigator.userAgent.match(/inapp|NAVER|KAKAOTALK|Snapchat|Line|WirtschaftsWoche|Thunderbird|Instagram|everytimeApp|WhatsApp|Electron|wadiz|AliApp|zumapp|iPhone(.*)Whale|Android(.*)Whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1-9]/)) {
            //         document.body.innerHTML = "";
            //         var tartgetUrl = window.location.host + window.location.pathname + window.location.search;

            //         if (navigator.userAgent.match(/iPhone|iPad/i)) {
            //             //ios
            //             var visitedAt = (new Date()).getTime(); // 방문 시간
            //             setTimeout(
            //                 function () {
            //                     if ((new Date()).getTime() - visitedAt < 2000) {
            //                         location.href = IOS_CHROME_MARKET_URL;
            //                     }
            //                 }, 500);

            //             setTimeout(function () {
            //                 location.href = "googlechromes://" + tartgetUrl;
            //             }, 0);
            //         } else {
            //             //android
            //             location.href = "intent://" + tartgetUrl + "#Intent;scheme=https;package=com.android.chrome;end";
            //         }
            //     }
            // };

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