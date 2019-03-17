<?php

namespace App\Service;

use App\Entity\BaseCourt;
use App\Entity\CourtInterface;
use App\Entity\Event;
use App\Entity\EventInterface;
use App\Entity\GymCourt;
use App\Repository\EventRepository;
use App\Repository\EventRepositoryInterface;
use App\Repository\GymEventRepository;
use Doctrine\ORM\ORMInvalidArgumentException;
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
     * @param string $type
     * @return Event[]|array
     * @internal param bool $isGym
     */
    public function getTodayEvents(string $type): array
    {
        return $this->getEventRepository($type)->getTodayEvents();
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
        return [
            'court' => $this->eventRepository->getUserEvents($this->security->getUser()),
            'gymCourt' => $this->gymEventRepository->getUserEvents($this->security->getUser()),
        ];
    }

    /**
     * @return Event[]
     */
    public function getUserJoinedEvents(): array
    {
        return [
            'court' => $this->eventRepository->getUserJoinedEvents($this->security->getUser()),
            'gymCourt' => $this->gymEventRepository->getUserJoinedEvents($this->security->getUser()),
        ];
    }

    /**
     * @param string $type
     * @param int $id
     * @return EventInterface|null
     */
    public function getEvent(string $type, int $id): EventInterface
    {
        if (!in_array($type, BaseCourt::$supportedTypes)) {
            throw new ORMInvalidArgumentException();
        }

        return $this->getEventRepository($type)->find($id);
    }

    /**
     * @param string $type
     * @return EventRepositoryInterface
     */
    private function getEventRepository(string $type): EventRepositoryInterface
    {
        if ($type === BaseCourt::PUBLIC_COURT) {
            return $this->eventRepository;
        }

        if ($type === BaseCourt::GYM_COURT) {
            return $this->gymEventRepository;
        }

        throw new ORMInvalidArgumentException();
    }
}
