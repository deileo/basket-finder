<?php

namespace App\Service;

use App\Provider\GeoCoderInterface;
use Geocoder\Location;
use Geocoder\Query\GeocodeQuery;

class GeoCoderService
{
    /**
     * @var GeoCoderInterface
     */
    private $geoCoder;

    /**
     * @param GeoCoderInterface $geoCoder
     */
    public function __construct(GeoCoderInterface $geoCoder)
    {
        $this->geoCoder = $geoCoder;
    }

    /**
     * @param string $address
     * @return array|null
     */
    public function getLocationCoordinatesByAddress(string $address): ?array
    {
        $coordinates = ['lat' => null, 'long' => null];

        $location = $this->getMapLocationByAddress($address);

        if ($location && $location->getCoordinates()) {
            $coordinates['lat'] = $location->getCoordinates()->getLatitude();
            $coordinates['long'] = $location->getCoordinates()->getLongitude();
        }

        return in_array(null, $coordinates) ? null : $coordinates;
    }

    /**
     * @param float $lat
     * @param float $lng
     * @return string|null
     */
    public function getAddressFromCoordinates(float $lat, float $lng): ?string
    {
        foreach ($this->geoCoder->getGeoCoder()->reverse($lat, $lng) as $location) {
            if ($location->getStreetName() && $location->getStreetNumber()) {
                return $location->getStreetName() . ' ' . $location->getStreetNumber();
            }
        }

        return null;
    }

    /**
     * @param string $address
     * @return Location|null
     */
    private function getMapLocationByAddress(string $address): Location
    {
        $locations = $this->geoCoder->getGeoCoder()->geocodeQuery(GeocodeQuery::create($address));

        return $locations ? $locations->first() : null;
    }
}
