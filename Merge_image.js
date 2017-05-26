/**
 * Created by umashankar.pardhi on 26-05-2017.
 * This utility function is created for merging two images using canvas and left and top position of canvas
 */

/*
* function name mergeImages
* @param {int} {mrg_image_width} Width of final image
* @param {int} {mrg_image_height} Height of final image received after merge
* @param {int} {upper_x} Top left position of image where upper image will placed.
* @param {int} {upper_y} Top position of image where upper image will placed
* @param {function} {callback} callback function called for performing action after merging.
* */

function mergeImages(mrg_image_width,mrg_image_height,upper_x, upper_y,lower_img,upper_img,callback){

    function loadImage(src,onload){
        var img = new Image();
        img.crossorigin="anonymous";
        img.onload = onload;
        img.src = src;

        return img;

    }
    function createCanvas(canvas_width, canvas_height){
        var canvas=document.createElement('canvas');
        canvas.width=canvas_width ? canvas_width : 1000;
        canvas.height=canvas_height ? canvas_height : 1000;
        document.body.appendChild(canvas);
        var ctx = canvas.getContext("2d");
        return {canvas:canvas,ctx:ctx}

    }
    var imagesLoaded = 0;
    function main() {
        imagesLoaded += 1;
        if(imagesLoaded === 2) {
            // composite now
            ctx.drawImage(lower_img, 0, 0);
            ctx.globalAlpha = 0.5;
            ctx.drawImage(upper_img, upper_x, upper_y);
            callback(canvas.toDataURL());
        }
    }
    var canvasData= createCanvas(mrg_image_width,mrg_image_height);
    var canvas= canvasData.canvas;
    var ctx= canvasData.ctx;
    lower_img = loadImage(lower_img, main);
    upper_img = loadImage(upper_img, main);
}
