/*

Sample View List JSON 

var viewDetailsList={
	targetContainer:$('#target_container'),
	template:$("#canvas-template").html(),
	viewList :[
		{
		"canvasWidth":500,"canvasHeight":400,"canvasTop":0,"canvasLeft":105,"imageWidth":800,"imageHeight":800,"viewId":2603,"imageSrc":"800px.jpg"
		}
	]
	
}

*/
var Artifi = Artifi || { version: "1.0.0" };
Artifi.CanvasCreator = fabric.util.createClass({
    objectSelectionColor: '#cdcdcd',
    selectionLineWidth: 2,
	targetContainer:'#target_container',
    initialize: function(options) {
        this.$targetContainer = $(options.targetContainer);
        this.viewList = options.viewList;
        this.canvasHTMLTemplate = options.template;
        this.canvasList = {}; /* We are storing here the list of fabric canvases*/
        this.createHTMLViews();
        this.createViews();
    },
    /* Rendering Canvas HTML using _JS*/
    createHTMLViews: function() {
        this.$targetContainer.html(_.template(this.canvasHTMLTemplate)({
            viewList: this.viewList
        }));
    },

    createViews: function() {
        var _this = this;
        var viewList = this.viewList;
        $.each(viewList, function(key, view) {
            _this.setCanvasCSS(view.viewId);
            _this.createFabricCanvas(view.viewId);
        })

    },

    /* Fit Canvas to particular target or div according to width and height of div 
     Let's say If I want to fix a particular canvas of width 1000px and height 1000px to 500px by 500px then I want to calculate the scaleFactor for fitting 1000px canvas inside the 500px area. 
    */
    setCanvasCSS: function(viewId) {
		if(!viewId){
			return false;
		}
        var scaleFactor = this.calculateScaleFactor(viewId); /* Calculate scale factor according to the available space and image width and height*/
        var $viewContainer = $('[data-editor-view-id="' + viewId + '"]');
        var scaling = 'scale(' + scaleFactor + ',' + scaleFactor + ')';
        $viewContainer.css({
            'transform': scaling,
            '-webkit-transform': scaling,
            '-moz-transform': scaling,
            '-o-transform': scaling
        });
        var leftPos = (this.$targetContainer.width() - $viewContainer.width() * scaleFactor) / 2;
        var topPos = (this.$targetContainer.height() - $viewContainer.height() * scaleFactor) / 2;
        $viewContainer.css({
            'left': leftPos,
            'top': topPos
        });
    },

    createFabricCanvas: function(viewId) {
        if (!fabric && !viewId) {
            return false;
        }
        var fabCanvas = new fabric.Canvas('canvas_' + viewId, {
            selectionColor: this.objectSelectionColor,
            selectionLineWidth: this.selectionLineWidth
        });
        this.canvasList[viewId] = fabCanvas;



    },
    /* Calculating scale factor, according to the available area on page and the product image width and height. By using this scale factor we automatically adjust the area of product, image and canvas within available space. */
    calculateScaleFactor: function(viewId) {
		if(!viewId){
			return 1;
		}
        var $viewContainer = $('[data-editor-view-id="' + viewId + '"]');
        var cssWidthScale = this.$targetContainer.width() / $viewContainer.width();
        var cssHeightScale = this.$targetContainer.height() / $viewContainer.height();
        var scaleFactor = Math.min(cssWidthScale, cssHeightScale);
        return scaleFactor;
    },
	getListOfCanvas:function(){
		return this.canvasList;
		
	}




})