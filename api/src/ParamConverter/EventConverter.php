<?php

namespace App\ParamConverter;

use App\Entity\EventInterface;
use App\Service\EventService;
use Doctrine\ORM\EntityNotFoundException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;
use Symfony\Component\HttpFoundation\Request;

class EventConverter implements ParamConverterInterface
{
    /**
     * @var EventService
     */
    private $eventService;

    /**
     * @param EventService $eventService
     */
    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * @param Request $request
     * @param ParamConverter $configuration
     * @return bool
     */
    public function apply(Request $request, ParamConverter $configuration): bool
    {
        $params = $request->get('_route_params');
        $event = $this->eventService->getEvent($params['type'], $params['id']);

        if (!$event) {
            throw new EntityNotFoundException();
        }

        $request->attributes->set($configuration->getName(), $event);

        return true;
    }

    /**
     * @param ParamConverter $configuration
     * @return bool
     */
    public function supports(ParamConverter $configuration): bool
    {
        return $configuration->getClass() === EventInterface::class;
    }
}