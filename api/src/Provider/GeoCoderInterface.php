<?php

namespace App\Provider;

use Geocoder\StatefulGeocoder;

interface GeoCoderInterface
{
    public function getGeoCoder(): StatefulGeocoder;
}