import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', {

    state: () => ({
        selectCharacterIndex: 0,
        selectCharacter: [
            { name: "벨", src: 'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png' },
            { name: "벨2", src: 'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png' },
            { name: "벨3", src: 'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png' },
        ],
        characters: [
            {
                name: "벨", 
                src: 'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png',
                intro: [
                    { text: "롯데백화점 분당점 어쩌구" },
                    { text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
                    { text: "좋아. 우리 같이 신비의 숲 문을 열어볼까" },
                    { text: "신비의 숲 문을 두드려 볼래?" }
                ],
                shopping: [
                    { text: "헤메진 않았어?" },
                    { text: "손가락을 화면에 대고 빗자루" },
                ],
            },
            {
                name: "벨2",
                src: 'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png',
                intro: [
                    { text: "롯데백화점 분당점 어쩌구" },
                    { text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
                    { text: "좋아. 우리 같이 신비의 숲 문을 열어볼까" },
                    { text: "신비의 숲 문을 두드려 볼래?" }
                ],
                shopping: [
                    { text: "헤메진 않았어?" },
                    { text: "손가락을 화면에 대고 빗자루" },
                ],
                
            },
            {
                name: "벨3",
                src: 'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png',
                intro: [
                    { text: "롯데백화점 분당점 어쩌구" },
                    { text: "안녕, 우리 같이 즐거운 시간 보내보자!" },
                    { text: "좋아. 우리 같이 신비의 숲 문을 열어볼까" },
                    { text: "신비의 숲 문을 두드려 볼래?" }
                ],
                shopping: [
                    { text: "헤메진 않았어?" },
                    { text: "손가락을 화면에 대고 빗자루" },
                ],
            }
        ],
    }),
    getters: {
        currentCharacter: (state) => state.characters[state.selectCharacterIndex],
    },
    actions: {
        setCharacterIndex(index) {
            this.selectCharacterIndex = index
        },
    },
})