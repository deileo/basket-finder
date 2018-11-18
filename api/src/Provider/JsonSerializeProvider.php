<?php

namespace App\Provider;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class JsonSerializeProvider
{
    /**
     * @return Serializer
     */
    public function getSerializer(): Serializer
    {
        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getAddress();
        });

        return new Serializer([$normalizer], [new JsonEncoder()]);
    }
}