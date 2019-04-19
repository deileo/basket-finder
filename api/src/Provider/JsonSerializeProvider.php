<?php

namespace App\Provider;

use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class JsonSerializeProvider
{
    /**
     * @return Serializer
     */
    public function getSerializer(): Serializer
    {
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $normalizer = new ObjectNormalizer($classMetadataFactory);

        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getId();
        });

        $dateTimeCallback = function ($innerObject, $outerObject, string $attributeName, string $format = null, array $context = []) {
            return $innerObject instanceof \DateTime ? $innerObject->format('Y-m-d H:i') : '';
        };

        $dateCallback = function ($innerObject, $outerObject, string $attributeName, string $format = null, array $context = []) {
            return $innerObject instanceof \DateTime ? $innerObject->format('Y-m-d') : '';
        };

        $timeCallback = function ($innerObject, $outerObject, string $attributeName, string $format = null, array $context = []) {
            return $innerObject instanceof \DateTime ? $innerObject->format('H:i') : '';
        };

        $normalizer->setCallbacks([
            'createdAt' => $dateTimeCallback,
            'startTime' => $timeCallback,
            'endTime' => $timeCallback,
            'date' => $dateCallback,
        ]);

        return new Serializer([$normalizer], [new JsonEncoder()]);
    }
}
