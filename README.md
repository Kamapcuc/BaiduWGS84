BaiduWGS84
==========

There are a lot of publications in internet that Baidu coordinates are wring. 
People just dont realize, that thre are different positioning sytems.
Here is the script, that transforms Google coordinates to Baidu coordinates.

Example, how to use it:
==========
<html>
	<head>
		<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.3"></script>
		<script type="text/javascript" src="geoConverter.js"></script>
	</head>
	<body>
		<div style="width:100%;height:100%;" id="container"></div>
	</body>
</html>

<script type="text/javascript">
	var map = new BMap.Map("container");
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.MapTypeControl({mapTypes : [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]}));
	map.enableScrollWheelZoom();

    var tmp = convertWGS84toBD09(22.234327, 113.58507);
    var point = new BMap.Point(tmp.lon, tmp.lat);
	var marker = new BMap.Marker(point, {});
	map.addOverlay(marker);
	map.centerAndZoom(point, 16);
</script>

Here you can check, that result is correct:
Google:
https://maps.google.ru/maps?q=22.234327+113.58507
Or any other map, that uses WGS84:
http://toolserver.org/~geohack/geohack.php?language=ru&params=22.234327_N_113.58507_E_
