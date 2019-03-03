<?php

namespace App\Service;

use App\Entity\CourtInterface;
use App\Entity\Event;
use App\Entity\GymCourt;
use App\Repository\EventRepository;
use App\Repository\GymEventRepository;

class EventService
{
    /**
     * @var EventRepository
     */
    private $eventRepository;

    /**
     * @var GymEventRepository
     */
    private $gymEventRepository;

    /**
     * @param EventRepository $eventRepository
     * @param GymEventRepository $gymEventRepository
     */
    public function __construct(EventRepository $eventRepository, GymEventRepository $gymEventRepository)
    {
        $this->eventRepository = $eventRepository;
        $this->gymEventRepository = $gymEventRepository;
    }

    /**
     * @param bool $isGym
     * @return Event[]
     */
    public function getTodayEvents(bool $isGym = false): array
    {
        if ($isGym) {
            return $this->gymEventRepository->getTodayEvents();
        }

        return $this->eventRepository->getTodayEvents();
    }

    /**
     * @param CourtInterface $court
     * @return Event[]
     */
    public function getActiveCourtEvents(CourtInterface $court): array
    {
        if ($court instanceof GymCourt) {
            return $this->gymEventRepository->getActiveCourtEvents($court);
        }

        return $this->eventRepository->getActiveCourtEvents($court);
    }
}
