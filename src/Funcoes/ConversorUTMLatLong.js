export default function UTMLatLng(datumNameIn) {
    if (datumNameIn !== undefined) {
        datumName = datumNameIn;
    }
    this.setEllipsoid(datumName);
}

var datumName = "WGS 84";

UTMLatLng.prototype.convertUtmToLatLng = function (
    UTMEasting,
    UTMNorthing,
    UTMZoneNumber,
    UTMZoneLetter
) {
    var e1 =
        (1 - Math.sqrt(1 - this.eccSquared)) / (1 + Math.sqrt(1 - this.eccSquared));
    var x = UTMEasting - 500000.0; //remove 500,000 meter offset for longitude
    var y = UTMNorthing;
    var ZoneNumber = UTMZoneNumber;
    var ZoneLetter = UTMZoneLetter;
    var NorthernHemisphere;
    if (UTMEasting === undefined) {
        return "Please pass the UTMEasting!";
    }
    if (UTMNorthing === undefined) {
        return "Please pass the UTMNorthing!";
    }
    if (UTMZoneNumber === undefined) {
        return "Please pass the UTMZoneNumber!";
    }
    if (UTMZoneLetter === undefined) {
        return "Please pass the UTMZoneLetter!";
    }

    if ("N" === ZoneLetter) {
        NorthernHemisphere = 1;
    } else {
        NorthernHemisphere = 0;
        y -= 10000000.0;
    }

    var LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;

    var eccPrimeSquared = this.eccSquared / (1 - this.eccSquared);

    var M = y / 0.9996;
    var mu =
        M /
        (this.a *
            (1 -
                this.eccSquared / 4 -
                (3 * this.eccSquared * this.eccSquared) / 64 -
                (5 * this.eccSquared * this.eccSquared * this.eccSquared) / 256));

    var phi1Rad =
        mu +
        ((3 * e1) / 2 - (27 * e1 * e1 * e1) / 32) * Math.sin(2 * mu) +
        ((21 * e1 * e1) / 16 - (55 * e1 * e1 * e1 * e1) / 32) * Math.sin(4 * mu) +
        ((151 * e1 * e1 * e1) / 96) * Math.sin(6 * mu);
    var phi1 = this.toDegrees(phi1Rad);

    var N1 =
        this.a /
        Math.sqrt(1 - this.eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
    var T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
    var C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
    var R1 =
        (this.a * (1 - this.eccSquared)) /
        Math.pow(1 - this.eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
    var D = x / (N1 * 0.9996);

    var Lat =
        phi1Rad -
        ((N1 * Math.tan(phi1Rad)) / R1) *
        ((D * D) / 2 -
            ((5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) *
                D *
                D *
                D *
                D) /
            24 +
            ((61 +
                90 * T1 +
                298 * C1 +
                45 * T1 * T1 -
                252 * eccPrimeSquared -
                3 * C1 * C1) *
                D *
                D *
                D *
                D *
                D *
                D) /
            720);
    Lat = this.toDegrees(Lat);

    var Long =
        (D -
            ((1 + 2 * T1 + C1) * D * D * D) / 6 +
            ((5 -
                2 * C1 +
                28 * T1 -
                3 * C1 * C1 +
                8 * eccPrimeSquared +
                24 * T1 * T1) *
                D *
                D *
                D *
                D *
                D) /
            120) /
        Math.cos(phi1Rad);
    Long = LongOrigin + this.toDegrees(Long);
    return { lat: Lat, lng: Long };
};

UTMLatLng.prototype.setEllipsoid = function (name) {
    switch (name) {
        case "Airy":
            this.a = 6377563;
            this.eccSquared = 0.00667054;
            break;
        case "Australian National":
            this.a = 6378160;
            this.eccSquared = 0.006694542;
            break;
        case "Bessel 1841":
            this.a = 6377397;
            this.eccSquared = 0.006674372;
            break;
        case "Bessel 1841 Nambia":
            this.a = 6377484;
            this.eccSquared = 0.006674372;
            break;
        case "Clarke 1866":
            this.a = 6378206;
            this.eccSquared = 0.006768658;
            break;
        case "Clarke 1880":
            this.a = 6378249;
            this.eccSquared = 0.006803511;
            break;
        case "Everest":
            this.a = 6377276;
            this.eccSquared = 0.006637847;
            break;
        case "Fischer 1960 Mercury":
            this.a = 6378166;
            this.eccSquared = 0.006693422;
            break;
        case "Fischer 1968":
            this.a = 6378150;
            this.eccSquared = 0.006693422;
            break;
        case "GRS 1967":
            this.a = 6378160;
            this.eccSquared = 0.006694605;
            break;
        case "GRS 1980":
            this.a = 6378137;
            this.eccSquared = 0.00669438;
            break;
        case "Helmert 1906":
            this.a = 6378200;
            this.eccSquared = 0.006693422;
            break;
        case "Hough":
            this.a = 6378270;
            this.eccSquared = 0.00672267;
            break;
        case "International":
            this.a = 6378388;
            this.eccSquared = 0.00672267;
            break;
        case "Krassovsky":
            this.a = 6378245;
            this.eccSquared = 0.006693422;
            break;
        case "Modified Airy":
            this.a = 6377340;
            this.eccSquared = 0.00667054;
            break;
        case "Modified Everest":
            this.a = 6377304;
            this.eccSquared = 0.006637847;
            break;
        case "Modified Fischer 1960":
            this.a = 6378155;
            this.eccSquared = 0.006693422;
            break;
        case "South American 1969":
            this.a = 6378160;
            this.eccSquared = 0.006694542;
            break;
        case "WGS 60":
            this.a = 6378165;
            this.eccSquared = 0.006693422;
            break;
        case "WGS 66":
            this.a = 6378145;
            this.eccSquared = 0.006694542;
            break;
        case "WGS 72":
            this.a = 6378135;
            this.eccSquared = 0.006694318;
            break;
        case "ED50":
            this.a = 6378388;
            this.eccSquared = 0.00672267;
            break; // International Ellipsoid
        case "WGS 84":
        case "EUREF89": // Max deviation from WGS 84 is 40 cm/km see http://ocq.dk/euref89 (in danish)
        case "ETRS89": // Same as EUREF89
            this.a = 6378137;
            this.eccSquared = 0.00669438;
            break;
        default:
            this.status = true;
        //   new Error('No ecclipsoid data associated with unknown datum: '.name);
    }
};

UTMLatLng.prototype.toDegrees = function (rad) {
    return (rad / Math.PI) * 180;
};