var urls = {
	  livechennai: 'http://www.livechennai.com/propertyratesinchennai.asp',
	  magicbrick_links: 'http://www.magicbricks.com/Property-Rates-Trends/ALL-RESIDENTIAL-rates-in-New-Delhi'
}
var selector = {
	livechennai_table: '#subcell > div > table:nth-child(4) > tbody > tr > td > div > table > tbody >',
	magicbrick_cities: '.lhsRateTrends li a',
	magicbrick_pagination: '#pagination a',
	magicbricks_cityname:'.property-trends-heading h1',
	magicbrick_locality_name: '#localitySec > tr > td:not(#localityName)',
	magicbrick_pricerange_sale : '#saleTable > table > tbody > tr > td > a',
	magicbrick_pricerange_rent : '#rentTable > table > tbody > tr > td > a',
	magicbrick_alllocalities_urls: '#linkSec > tr > td > a:not(#trendLink)',
}
exports.urls = urls;
exports.selector = selector;
