(function($) {

  $.OpenSeadragon = function(options) {

    var osd = OpenSeadragon(

      jQuery.extend({
        preserveViewport: true,
        visibilityRatio:  1,
        minZoomLevel:     0,
        defaultZoomLevel: 0,
        minZoomImageRatio: 0,
        maxZoomPixelRatio : 500,		
        blendTime:        0.1,
        alwaysBlend:      false,
        showNavigationControl: false
      }, options)

    );
    
    return osd;

  };

}(Mirador));
