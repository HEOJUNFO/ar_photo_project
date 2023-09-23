import * as THREE from 'three'
import Experience from './Experience.js'
import { DeviceOrientationControls } from '../../js/DeviceOrientationControls.js'
import loadImage from '../../js/loadImage.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
    
        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000)
        this.instance.position.set(0, 2.3, 8)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new DeviceOrientationControls(this.instance);
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if(this.controls){
        this.controls.update();
        }
    }

    bindMethods() {
        window.captureImage = this.captureImage.bind(this);
    }
    
    captureScene() {
        const renderer = this.experience.renderer.instance;

        const width = Math.floor(this.sizes.height * 0.75);
    const height = this.sizes.height;
        
        const rt = new THREE.WebGLRenderTarget(width, height,{
            format: THREE.RGBAFormat,
            colorSpace: THREE.SRGBColorSpace
        });
        renderer.setRenderTarget(rt);
        renderer.render(this.scene, this.instance);
    
        const gl = renderer.getContext();
        const pixels = new Uint8Array(4 * width * height);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    
        const imageData = new ImageData(width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = y * (4 * width) + (x * 4);
                const flipIndex = (height - y - 1) * (4 * width) + (x * 4);
                imageData.data[flipIndex] = pixels[index];
                imageData.data[flipIndex + 1] = pixels[index + 1];
                imageData.data[flipIndex + 2] = pixels[index + 2];
                imageData.data[flipIndex + 3] = pixels[index + 3];
            }
        }
    
        renderer.setRenderTarget(null); // Reset render target
        return imageData;
    }

    async captureImage() {
        const data = this.captureScene();
        const canvas = document.createElement('canvas');
        canvas.width = data.width;
        canvas.height = data.height;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(data, 0, 0);

        // const sticker = document.querySelector('.side-image-container').style.backgroundImage.slice(5, -2);
        // console.log(sticker);
        // let stickerImg = null;
        // stickerImg = await loadImage(sticker);

        // ctx.drawImage(stickerImg, 0, 0, stickerImg.width, stickerImg.height, 0, 0, canvas.width/2, canvas.height/2);
        
        const image = canvas.toDataURL('image/png');
  
        this.experience.saveImage(image)

        return image;
    }

}