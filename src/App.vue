<template>
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
</template>

<script>
import { ref, onMounted, provide, onUnmounted } from 'vue'
import router from './router'

export default {
    name: 'App',
    setup() {
        const IOS_CHROME_MARKET_URL = "https://apps.apple.com/kr/app/google-chrome/id535886823";

        const getBrowserName = () => {
            var userAgent = navigator.userAgent.toLowerCase();
            let browserName = "";

            if (userAgent.match(/chrome|chromium|crios/i)) {
                browserName = "chrome";
            }
            if (userAgent.match(/firefox|fxios/i)) {
                browserName = "firefox";
            }
            if (userAgent.match(/safari/i)) {
                browserName = "safari";
            }
            if (userAgent.match(/opr\//i)) {
                browserName = "opera";
            }
            if (userAgent.match(/edg/i)) {
                browserName = "edge";
            }
            if (userAgent.match(/samsung/i)) {
                browserName = "samsung";
            }

            if (userAgent.match(/kakao/i)) {
                browserName = "kakao";
            }

            if (userAgent.match(/whale/i)) {
                browserName = "whale";
            }

            if (userAgent.match(/NAVER/i)) {
                browserName = "naver";
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

        const changeBrowser = () => {


            var targetUrl = window.location.host + window.location.pathname + window.location.hash;
            if (navigator.userAgent.match(/iPhone|iPad/i)) {
                //ios
                var visitedAt = (new Date()).getTime();
                setTimeout(
                    function () {
                        if ((new Date()).getTime() - visitedAt < 2000) {
                            location.href = IOS_CHROME_MARKET_URL;
                        }
                    }, 500);

                setTimeout(function () {
                    location.href = "googlechromes://" + targetUrl;
                }, 0);
            } else {
                //android
                location.href = "intent://" + targetUrl + "#Intent;scheme=https;package=com.android.chrome;end";
            }
        }

        const checkBrowser = (useChange) => {
            let os = getOsName();
            let browser = getBrowserName();

            if (browser === 'naver' || browser === 'samsung' || browser === 'whale') {
                if (browser === 'samsung' || browser === 'whale') {
                    alert("본 서비스는 Chrome을 권장합니다. 브라우저 팝업이 나타나면 Chrome을 선택해주세요.")
                }

                changeBrowser();
            }


            var targetUrl = window.location.host + window.location.pathname + window.location.hash;
            if (os.match(/iPhone|iPad|iPod/i)) { // 아이폰 접속 경우

                if (browser == 'kakao') {

                    if (useChange == true) {

                        let hash = window.location.hash;
                        hash = hash.slice(2, hash.length);

                        router.push({ path: '/ios', query: { hash: hash } });
                    }

                    return false;
                }
            }
            else {
                if (browser == 'kakao') { // 안드로이드
                    // 먼저, 카카오 인앱 브라우저 닫기
                    if (useChange == true) {
                        if (browser == 'kakao')
                            location.href = 'kakaotalk://inappbrowser/close';

                        location.href = "intent://" + targetUrl + "#Intent;scheme=https;package=com.android.chrome;end";

                    }
                    return false;
                }
            }

            return true;
        }



        onMounted(() => {
            if (location.protocol !== 'https:') {
                location.protocol = 'https:';
            }

            checkBrowser(true)
        });


        return {}
    }
}
</script>

<style >
@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

@media screen and (orientation: landscape) {
    body::after {
        content: '가로 모드는 지원하지 않습니다. \A 갤럭시 FOLD 기종은 접힌 상태에서만 이벤트 참여 가능 합니다.';
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 20px;
        z-index: 9999;
        white-space: pre-wrap;
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