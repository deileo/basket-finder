<?php

namespace App\Service;

use App\Entity\Event;
use App\Repository\EventRepository;

class EventService
{
    /**
     * @var EventRepository
     */
    private $eventRepository;

    /**
     * @param EventRepository $eventRepository
     */
    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    /**
     * @return Event[]
     */
    public function getTodayEvents(): array
    {
        return $this->eventRepository->getTodayEvents();
    }
}
