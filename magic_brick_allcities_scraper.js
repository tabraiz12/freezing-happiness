var utils = require('utils');
var staticdatas = require('./selectorsurl');
var fs = require('fs');
var casper = require('casper').create({
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
	}
});

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');
var magicBrick_url = staticdatas.urls.magicbrick_links;
var magicbrick_allCities_url_selector = staticdatas.selector.magicbrick_cities;
var magicbrickdata = {};
//parser
casper.start(magicBrick_url, function() {
	var magicbrick_allCities_links = [];
	
    var magicbrick_allCities_urls = this.getElementsInfo(magicbrick_allCities_url_selector);

    casper.each(magicbrick_allCities_urls, function(casper, element, j) {
 		magicbrick_allCities_links.push(element.attributes.href)
 	});

	casper.each(magicbrick_allCities_links, function(self, i) {

		casper.thenOpen(i, function() {	
				var tempcity = this.fetchText(staticdatas.selector.magicbricks_cityname);
				
				var magicbricks_cityname = tempcity.split(' ').slice(-1)[0].replace(/(\r\n|\n|\r)/gm,"");
				magicbrickdata[magicbricks_cityname] = {}
				utils.dump(magicbricks_cityname); 
					var pageination_array = [];
					var magicbrick_alllocalities_array = {};
					var isPaginateAvailable = casper.evaluate(function() {
					    return __utils__.visible(staticdatas.selector.magicbrick_pagination);
					});
					var ismagicbrick_pricerange_rent = casper.evaluate(function() {
					    return __utils__.visible(staticdatas.selector.magicbrick_pricerange_rent);
					});
					if(isPaginateAvailable){
						var page_links = this.getElementsInfo(staticdatas.selector.magicbrick_pagination);
						casper.each(page_links,function(casper, element, j) {
							pageination_array.push(element.attributes.href)
						});
					}
					var locality_name = this.getElementsInfo(staticdatas.selector.magicbrick_locality_name);
					var magicbrick_pricerange_sale = this.getElementsInfo(staticdatas.selector.magicbrick_pricerange_sale);
					if(ismagicbrick_pricerange_rent)
						var magicbrick_pricerange_rent = this.getElementsInfo(staticdatas.selector.magicbrick_pricerange_rent);
					var magicbrick_alllocalities_urls = this.getElementsInfo(staticdatas.selector.magicbrick_alllocalities_urls);

					casper.each(locality_name, function(casper, element, j) {
						magicbrickdata[magicbricks_cityname][element.text] = {}
					});

					// casper.each(magicbrick_alllocalities_urls, function(casper, element, j) {
				 // 		magicbrick_alllocalities_array.push(element.attributes.href)
				 // 	});

				 //    casper.each(magicbrick_alllocalities_urls, function(casper, element, j) {
				 // 		magicbrick_alllocalities_array.push(element.attributes.href)
				 // 	});

					
		utils.dump(magicbrickdata)  
			});
	});
 	
});

casper.run();