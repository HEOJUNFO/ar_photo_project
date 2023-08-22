import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', {
    state: () => ({
        selectCharacterIndex: 0,
        selectCharacter: [
            { name: "벨", src: 'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png' },
            { name: "벨2", src: 'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png' },
            { name: "벨3", src: 'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png' },
        ],
    }),
    getters: {
        currentCharacterSrc: (state) => state.selectCharacter[state.selectCharacterIndex].src,
    },
    actions: {
        setCharacterIndex(index) {
            this.selectCharacterIndex = index
        },
    },
})