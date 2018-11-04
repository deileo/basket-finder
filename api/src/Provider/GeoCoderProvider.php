<?php

namespace App\Provider;

use Geocoder\StatefulGeocoder;

class GeoCoderProvider implements GeoCoderInterface
{
    /**
     * @var MapProvider
     */
    private $mapService;

    /**
     * @param MapProvider $mapService
     */
    public function __construct(MapProvider $mapService)
    {
        $this->mapService = $mapService;
    }

    /**
     * @return StatefulGeocoder
     */
    public function getGeoCoder(): StatefulGeocoder
    {
        return new StatefulGeocoder($this->mapService->getMapProvider());
    }
}