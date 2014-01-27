Baidu WGS84
===========

On the Internet there are lots of publications concerning Baidu wrong coordinates. 
That misunderstanding happens because a lot of different exsisting positioning systems may have different coordinates.
Here is the script, which transforms Google coordinates to Baidu coordinates.

### Example, how to use it:
````html
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
````

### Here you can check, that the result is correct:
https://maps.google.ru/maps?q=22.234327+113.58507&t=h&z=16

### Or try any other map, that uses WGS84:
http://toolserver.org/~geohack/geohack.php?language=ru&params=22.234327_N_113.58507_E_

### Important notes:
If you want to match a certain point on Google satelite view to a map view, use convertWGS84toGCJ02 function.

Different versions of Baidu maps API have small differences in algorithms. Those script is for v1.3.

### License:

MIT (free for all, no warranty or guarantee)
