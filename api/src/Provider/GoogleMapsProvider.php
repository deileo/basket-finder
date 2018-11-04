<?php

namespace App\Provider;

use Geocoder\Provider\GoogleMaps\GoogleMaps;
use Geocoder\Provider\Provider;
use Http\Adapter\Guzzle6\Client;

class GoogleMapsProvider implements MapProvider
{
    /**
     * @var string|null
     */
    private $region;

    /**
     * @var string|null
     */
    private $apiKey;

    /**
     * @param string|null $region
     * @param string|null $apiKey
     */
    public function __construct(?string $region, ?string $apiKey)
    {
        $this->region = $region;
        $this->apiKey = $apiKey;
    }

    /**
     * @return Provider
     */
    public function getMapProvider(): Provider
    {
        return new GoogleMaps(new Client(), $this->region, $this->apiKey);
    }
}