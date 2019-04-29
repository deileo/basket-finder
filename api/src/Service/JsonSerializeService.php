<?php

namespace App\Service;

use App\Provider\JsonSerializeProvider;
use Symfony\Component\Serializer\Serializer;

class JsonSerializeService
{
    /**
     * @var Serializer
     */
    private $serializer;

    /**
     * @param JsonSerializeProvider $serializer
     */
    public function __construct(JsonSerializeProvider $serializer)
    {
        $this->serializer = $serializer->getSerializer();
    }

    /**
     * @param array|object $data
     * @param array $groups
     * @return string
     */
    public function serialize($data, array $groups = []): string
    {
        return $this->serializer->serialize($data, 'json', empty($groups) ? [] : ['groups' => $groups]);
    }
}
