<?php

namespace App\Service;

use App\Entity\CourtInterface;
use App\Entity\Event;
use App\Entity\GymCourt;
use App\Repository\EventRepository;
use App\Repository\GymEventRepository;
use Symfony\Component\Security\Core\Security;

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
     * @var Security
     */
    private $security;

    /**
     * @param EventRepository $eventRepository
     * @param GymEventRepository $gymEventRepository
     * @param Security $security
     */
    public function __construct(EventRepository $eventRepository, GymEventRepository $gymEventRepository, Security $security)
    {
        $this->eventRepository = $eventRepository;
        $this->gymEventRepository = $gymEventRepository;
        $this->security = $security;
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

    /**
     * @return Event[]
     */
    public function getUserEvents(): array
    {
        return $this->eventRepository->getUserEvents($this->security->getUser());
    }
}
