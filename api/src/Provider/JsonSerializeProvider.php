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
        return new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);
    }
}