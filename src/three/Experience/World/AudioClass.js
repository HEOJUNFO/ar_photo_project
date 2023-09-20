import * as THREE from 'three';
import Experience from '../Experience.js';

export default class AudioClass {
    constructor(audioName) {
        this.experience = new Experience();
        this.resources = this.experience.resources;

        this.audioName = audioName;
        this.audioListener = new THREE.AudioListener();
        this.sound = new THREE.Audio(this.audioListener);

        this.setAudio();
    }

    setAudio() {
        if (this.resources.items[this.audioName]) {
            this.sound.setBuffer(this.resources.items[this.audioName]);
        } else {
            console.error(`Audio resource ${this.audioName} not found!`);
        }
    }

    play() {
        if (!this.sound.isPlaying) {
            this.sound.play();
            this.loop();
        }
    }

    pause() {
        if (this.sound.isPlaying) {
            this.sound.pause();
        }
    }

    stop() {
        if (this.sound.isPlaying) {
            this.sound.stop();
        }
    }
    loop(){
        this.sound.setLoop(true);
    }

    setVolume(volume) {
        this.sound.setVolume(volume);
    }

    update() {

    }
}