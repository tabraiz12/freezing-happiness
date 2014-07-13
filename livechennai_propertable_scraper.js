var utils = require('utils');
var staticdatas = require('./selectorsurl');
var casper = require('casper').create({
  clientScripts:  [
  	// 'jquery.js'
  ],
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
	}
});
//urls
var liveChennai_chennai_url = staticdatas.urls.livechennai;

//selectors
var livechennai_property_table = staticdatas.selector.livechennai_table;

var liveChennai_chennai_area_name_selector = livechennai_property_table + ' tr > td:nth-child(1) > p'

//parser
casper.start(liveChennai_chennai_url, function() {
	var chennai_data = {};
    var liveChennai_chennai_area_names = this.getElementsInfo(liveChennai_chennai_area_name_selector);

    casper.each(liveChennai_chennai_area_names, function(casper, element, j) {
    	var liveChennai_chennai_area_name = element.text;
    	j = j + 3;
    	chennai_data[liveChennai_chennai_area_name] = {};
    	var liveChennai_chennai_area_min_selector = livechennai_property_table+ ' tr:nth-child('+j+') > td:nth-child(2) > p';
		var liveChennai_chennai_area_max_selector = livechennai_property_table+ ' tr:nth-child('+j+') > td:nth-child(3) > p';
		var liveChennai_chennai_area_average_selector = livechennai_property_table+ ' tr:nth-child('+j+') > td:nth-child(4) > p';
		
		var liveChennai_chennai_area_min_value = this.getElementInfo(liveChennai_chennai_area_min_selector);
		var liveChennai_chennai_area_max_value = this.getElementInfo(liveChennai_chennai_area_max_selector);
		var liveChennai_chennai_area_average_value = this.getElementInfo(liveChennai_chennai_area_average_selector);
		
		chennai_data[liveChennai_chennai_area_name]['min'] = liveChennai_chennai_area_min_value.text;
		chennai_data[liveChennai_chennai_area_name]['max'] = liveChennai_chennai_area_max_value.text;
		chennai_data[liveChennai_chennai_area_name]['average'] = liveChennai_chennai_area_average_value.text;
	});
	utils.dump(chennai_data);
});
	
casper.run();