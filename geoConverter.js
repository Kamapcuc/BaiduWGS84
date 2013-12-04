// free for use, NO WARRANTY OR GUARANTEE

var pi = 3.14159265358979324;
var x_pi = pi * 3000.0 / 180.0;
// f = 1/298.3
// b = a * (1 - f)
// ee = (a^2 - b^2) / a^2;
var a = 6378245.0;
var ee = 0.00669342162296594323;

var convertWGS84toGCJ02 = function(lat, lon) {
    var dLat = transformLat(lon - 105.0, lat - 35.0);
    var dLon = transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * pi;
    var x = Math.sin(radLat);
    var geoh = 1 - ee * x * x;
    var h = Math.sqrt(geoh);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (geoh * h) * pi);
    dLon = (dLon * 180.0) / (a / h * Math.cos(radLat) * pi);
    return {
        lat : lat + dLat,
        lon : lon + dLon
    }
}

var transformLat = function(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

var transformLon = function(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}

var convertGCJ02toBD09 = function(lat, lon) {
    var R = Math.sqrt(lon * lon + lat * lat) + 0.00002 * Math.sin(lat * x_pi);
    var theta = Math.atan(lat / lon) + 0.000003 * Math.cos(lon * x_pi);
    return result = {
        lat : R * Math.sin(theta) + 0.006,
        lon : R * Math.cos(theta) + 0.0065
    }
}

var convertWGS84toBD09 = function(lat, lon) {
    var pointGCJ02 = convertWGS84toGCJ02(lat, lon);
    return convertGCJ02toBD09(pointGCJ02.lat, pointGCJ02.lon);
}
