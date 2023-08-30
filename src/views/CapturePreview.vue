<template>
    <div class="capture-preview">
        <div class="top-section">
            <div class="side-image-container">
                <button @click="back()">뒤로</button>
            </div>
            <div :class="{ 'hidden-content': index >= 3 }" class="text-container1">
                <p>사진 촬영 프리뷰</p>
            </div>
        </div>
        <div ref="konvaContainer" class="konva-container"></div>
        <div class="footer">
            <button @click="showToolbox = true">편집</button>
            <button @click="saveImage()">저장</button>
            <button @click="toggleFooter2()">공유</button>
        </div>
        <div v-show="showFooter2" class="footer2">
            <p>공유 방법을 선택해 주세요.</p>
            <button>방명록에 공유하기</button>
            <button @click="share()">다른 곳에 공유하기</button>
            <button @click="toggleFooter2()">닫기</button>
        </div>
        <div v-if="showModal" class="modal">
            <p>뒤로 가시겠습니까?</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
        <div v-if="showToolbox" class="toolbox">
            <div class="toolbox-left">
                <button @click="activateTool('draw')" :class="{ active: currentTool === 'draw' }">그리기</button>
                <button @click="activateTool('text'), addText()" :class="{ active: currentTool === 'text' }">텍스트</button>
            </div>
            <div class="toolbox-center">
                <div v-if="currentTool === 'draw'" class="toolbox-button">
                    <button @click="setDrawingTool('pen')">펜</button>
                    <button @click="setDrawingTool('highlighter')">형광펜</button>
                    <button @click="setDrawingTool('eraser')">지우개</button>
                </div>

                <div v-if="currentTool === 'text'" class="toolbox-button">
                    <button @click="setTextTool('normal')">일반</button>
                    <button @click="setTextTool('bold')">굵게</button>
                    <button @click="setTextTool('underline')">밑줄</button>
                </div>

                <div class="color-palette">
                    <div class="color-row" v-for="row in 2" :key="row">
                        <div v-for="color in colors.slice((row - 1) * 5, row * 5)" :key="color"
                            :style="{ backgroundColor: color }" @click="setColor(color)"></div>
                    </div>
                </div>
            </div>
            <button @click="showToolbox = false, drawComplete()">완료</button>
        </div>
        <div v-if="showToolbox" class="button-container">
            <button @click="undo">Undo</button>
            <button @click="redo">Redo</button>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import router from '../router';
import Konva from 'konva';

export default {
    name: 'CapturePreview',
    setup() {
        const index = ref(0)
        const imgData = ref('')
        const showFooter2 = ref(false);
        const showModal = ref(false);

        const showToolbox = ref(false);
        const currentTool = ref('draw');
        const currentDrawingTool = ref(null);
        const currentTextTool = ref(null);
        const currentColor = ref('black');
        const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown', 'black', 'white', 'gray'];

        const line = ref(null);
        const isDrawing = ref(false);


        const activateTool = (tool) => {
            currentTool.value = tool;
        }

        const setColor = (color) => {
            currentColor.value = color;
        }

        const setDrawingTool = (tool) => {
            currentDrawingTool.value = tool;
        }

        const setTextTool = (tool) => {
            currentTextTool.value = tool;
        }

        const konvaContainer = ref(null);
        const history = ref([]);
        const historyIndex = ref(-1);
        let stage;
        let layer;
        let drawingLayer;

        const undo = () => {
            if (historyIndex.value <= 0) return;

            historyIndex.value--;
            const imageObj = new Image();
            imageObj.src = history.value[historyIndex.value];
            imageObj.onload = () => {
                const prevImage = new Konva.Image({
                    x: 0,
                    y: 0,
                    image: imageObj,
                    width: stage.width(),
                    height: stage.height(),
                });
                drawingLayer.destroyChildren();
                drawingLayer.add(prevImage);
                drawingLayer.draw();
            };
        };

        // redo 기능
        const redo = () => {
            if (historyIndex.value >= history.value.length - 1) return;

            historyIndex.value++;
            const imageObj = new Image();
            imageObj.src = history.value[historyIndex.value];
            imageObj.onload = () => {
                const nextImage = new Konva.Image({
                    x: 0,
                    y: 0,
                    image: imageObj,
                    width: stage.width(),
                    height: stage.height(),
                });
                drawingLayer.destroyChildren();
                drawingLayer.add(nextImage);
                drawingLayer.draw();
            };
        };

        const addHistory = () => {
            if (historyIndex.value < history.value.length - 1) {
                history.value = history.value.slice(0, historyIndex.value + 1);
            }

            history.value.push(drawingLayer.toDataURL());
            historyIndex.value++;
        };


        const back = () => {
            showModal.value = true;
        }

        const confirmBack = () => {
            showModal.value = false;
            router.push('/capture');
        }

        const closeModal = () => {
            showModal.value = false;
        }

        const drawComplete = () => {
            imgData.value = stage.toDataURL();
        }

        const saveImage = () => {
            const link = document.createElement('a');
            link.download = 'image.png';
            link.href = imgData.value;
            link.click();
        }

        const toggleFooter2 = () => {
            showFooter2.value = !showFooter2.value;
        }

        const share = async () => {
            const blob = await (await fetch(imgData.value)).blob();

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
                .then(() => {
                    console.log("Thanks for sharing!");
                })
                .catch(console.error);
        }

        const startDrawing = () => {
            if (!showToolbox.value) return;
            isDrawing.value = true;
            const pos = stage.getPointerPosition();

            line.value = new Konva.Line({
                stroke: currentColor.value,
                strokeWidth: currentDrawingTool.value === 'pen' ? 5 : 15,
                opacity: currentDrawingTool.value === 'highlighter' ? 0.5 : 1,
                globalCompositeOperation: currentDrawingTool.value === 'eraser' ? 'destination-out' : 'source-over',
                points: [pos.x, pos.y],
                draggable: false
            });

            drawingLayer.add(line.value);
        }

        const endDrawing = () => {
            if (!showToolbox.value) return;
            isDrawing.value = false;
            addHistory();
        }

        const draw = () => {
            if (!showToolbox.value) return;
            if (!isDrawing.value) return;
            const pos = stage.getPointerPosition();
            const newPoints = line.value.points().concat([pos.x, pos.y],);
            line.value.points(newPoints);
            layer.batchDraw();
        }

        const addText = () => {
            if (currentTool.value !== 'text') return;


            const input = document.createElement('input');
            input.style.position = 'absolute';
            input.style.top = '50%';
            input.style.left = '50%';
            input.style.transform = 'translate(-50%, -50%)';

            document.body.appendChild(input);
            input.focus();

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    const text = new Konva.Text({
                        x: 80,
                        y: 160,
                        text: input.value,
                        fontFamily: 'Calibri',
                        fontSize: 80,
                        draggable: true,
                        fill: currentColor.value,
                        fontStyle: currentTextTool.value === 'bold' ? 'bold' : 'normal',
                        textDecoration: currentTextTool.value === 'underline' ? 'underline' : 'none',
                    });
                    drawingLayer.add(text);
                    layer.draw();

                    addHistory();

                    document.body.removeChild(input);
                }
            });
        };

        onMounted(() => {
            imgData.value = router.currentRoute.value.query.imgData;

            const imageObj = new Image();
            imageObj.src = imgData.value;
            imageObj.onload = () => {

                const imageWidth = imageObj.width;

                stage = new Konva.Stage({
                    container: konvaContainer.value,
                    width: imageWidth,
                    height: window.innerHeight * 0.8
                });

                layer = new Konva.Layer();
                drawingLayer = new Konva.Layer();

                stage.add(layer);
                stage.add(drawingLayer);

                const konvaImage = new Konva.Image({
                    x: 0,
                    y: 0,
                    image: imageObj,
                    width: imageWidth,
                    height: window.innerHeight * 0.8
                });

                layer.add(konvaImage);
                layer.draw();

                addHistory();

                stage.on('mousedown touchstart', (e) => {
                    if (currentTool.value === 'draw' || currentTool.value === '지우개') {
                        startDrawing(e);
                    }
                });

                stage.on('mouseup touchend', () => {
                    endDrawing();
                });

                stage.on('mousemove touchmove', (e) => {
                    draw(e);
                });

            };
        });

        return {
            index,
            imgData,
            saveImage,
            back,
            showFooter2,
            toggleFooter2,
            share,
            showModal,
            confirmBack,
            closeModal,
            konvaContainer,
            currentTool,
            colors,
            activateTool,
            setColor,
            showToolbox,
            setDrawingTool,
            drawComplete,
            addText,
            setTextTool,
            undo,
            redo,
        }
    }
}
</script>

<style scoped>
.konva-container {
    touch-action: pan-x pan-y;
}

.footer {
    height: 10vh;
    width: 100%;
    background-color: #333;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    align-items: center;
    justify-content: center;
}

.footer button {
    margin: 0;
    padding: 10px;
    background-color: #555;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.footer button:hover {
    background-color: #777;
}


.hidden-content {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    height: 10vh;
    overflow: hidden;
}

.top-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10vh;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
}


.side-image-container {
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container button {
    height: 100%;
    width: 100%;
    display: block;
}

.text-container1 {
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 80%;
}

.text-container1 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 1.5rem;
}

.footer2 {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #666;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.footer2 p {
    padding: 10px;
    font-size: 1rem;
}

.footer2 button {
    padding: 10px;
    margin-top: 5px;
    background-color: #777;
    border: none;
    color: #fff;
    cursor: pointer;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80vw;
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #000;
    flex-direction: column;
    z-index: 3;
    transform: translate(-50%, -50%);
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    width: 20%
}

.modal button {
    margin-top: 15px;
}


.toolbox {
    background-color: #fff;
    border: 1px solid #000;
    position: relative;
    top: -16vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.toolbox-center {
    display: flex;
    flex-direction: column
}

.toolbox-left button,
.toolbox-center button {
    margin: 0 10px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.toolbox-button {
    display: flex;
    flex-direction: row;
}

.active {
    background-color: #aaa;
}

.color-palette {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.color-row {
    display: flex;
    margin-bottom: 5px;
}

.color-row div {
    width: 20px;
    height: 20px;
    margin: 0 5px;
    border: 1px solid #000;
    cursor: pointer;
}


.button-container {
    position: absolute;
    right: 1vw;
    bottom: 16vh;
    z-index: 10;
}

.button-container button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-container button:first-child {
    order: -1;
}
</style>