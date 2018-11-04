<?php

namespace App\Service;

use App\Provider\JsonSerializeProvider;

class JsonSerializeService
{
    private $serializer;

    /**
     * @param JsonSerializeProvider $serializer
     */
    public function __construct(JsonSerializeProvider $serializer)
    {
        $this->serializer = $serializer->getSerializer();
    }

    /**
     * @param array $data
     * @return string
     */
    public function serialize(array $data): string
    {
        return $this->serializer->serialize($data, 'json');
    }
}