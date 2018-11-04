<?php

namespace App\Provider;

use Geocoder\Provider\Provider;

interface MapProvider
{
    public function getMapProvider(): Provider;
}