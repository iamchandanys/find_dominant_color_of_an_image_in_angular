import { CanvasCore } from "./canvas-core";
import { CanvasImage } from "./canvas-image";
declare var require: any;

export class FindDominantColor {

    getDominantColor(sourceImage: any, quality = 10) {
        const palette = this.getPalette(sourceImage, 5, quality);
        const dominantColor = palette[0];
        return '#' + dominantColor.map((v: { toString: (arg0: number) => string; }) => ('0' + v.toString(16)).slice(-2)).join('');
    }

    getPalette(sourceImage: any, colorCount: any, quality: any) {
        const options = CanvasCore.validateOptions({
            colorCount,
            quality
        });

        // Create custom CanvasImage object
        const image = new CanvasImage(sourceImage);
        const imageData = image.context?.getImageData(0, 0, image.width, image.height); // ToDo
        const pixelCount = image.width * image.height;
        const pixelArray = CanvasCore.createPixelArray(imageData?.data, pixelCount, options.quality);

        // Send array to quantize function which clusters values
        // using median cut algorithm
        var quantize = require('quantize');
        const cmap = quantize(pixelArray, options.colorCount);
        const palette = cmap ? cmap.palette() : null;

        return palette;
    }

    getColorFromUrl(imageUrl: string, callback: (arg0: any, arg1: any) => void, quality: any) {
        const sourceImage = document.createElement("img");
        sourceImage.addEventListener('load', () => {
            const palette = this.getPalette(sourceImage, 5, quality);
            const dominantColor = palette[0];
            callback(dominantColor, imageUrl);
        });
        sourceImage.src = imageUrl
    }

    getImageData(imageUrl: string, callback: (arg0: string) => void) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            if (this.status == 200) {
                let uInt8Array = new Uint8Array(this.response);
                let i = uInt8Array.length;
                let binaryString = new Array(i);
                for (let i = 0; i < uInt8Array.length; i++) {
                    binaryString[i] = String.fromCharCode(uInt8Array[i]);
                }
                let data = binaryString.join('');
                let base64 = window.btoa(data);
                callback('data:image/png;base64,' + base64);
            }
        }
        xhr.send();
    }
}