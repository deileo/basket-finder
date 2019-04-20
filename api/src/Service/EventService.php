<?php

namespace App\Service;

use App\Entity\BaseCourt;
use App\Entity\CourtInterface;
use App\Entity\Event;
use App\Entity\EventInterface;
use App\Entity\GymCourt;
use App\Entity\GymEvent;
use App\Entity\GymEventParticipant;
use App\Repository\EventRepository;
use App\Repository\EventRepositoryInterface;
use App\Repository\GymEventRepository;
use App\Repository\ParticipantRepository;
use Doctrine\ORM\ORMInvalidArgumentException;
use Symfony\Component\Security\Core\Security;

class EventService
{
    /**
     * @var EventRepository
     */
    private $eventRepo;

    /**
     * @var GymEventRepository
     */
    private $gymEventRepo;

    /**
     * @var ParticipantRepository
     */
    private $participantRepo;

    /**
     * @var Security
     */
    private $security;

    /**
     * @param EventRepository $eventRepo
     * @param GymEventRepository $gymEventRepo
     * @param ParticipantRepository $participantRepo
     * @param Security $security
     */
    public function __construct(EventRepository $eventRepo, GymEventRepository $gymEventRepo, ParticipantRepository $participantRepo,Security $security)
    {
        $this->eventRepo = $eventRepo;
        $this->gymEventRepo = $gymEventRepo;
        $this->participantRepo = $participantRepo;
        $this->security = $security;
    }

    /**
     * @return array
     */
    public function getAllEvents(): array
    {
        return [
            'court' => $this->eventRepo->getAllEvents(),
            'gymCourt' => $this->gymEventRepo->getAllEvents(),
        ];
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
            return $this->gymEventRepo->getActiveCourtEvents($court);
        }

        return $this->eventRepo->getActiveCourtEvents($court);
    }

    /**
     * @return EventInterface[]
     */
    public function getUserEvents(): array
    {
        return array_merge(
            $this->eventRepo->getUserEvents($this->security->getUser()),
            $this->gymEventRepo->getUserEvents($this->security->getUser())
        );
    }

    /**
     * @return EventInterface[]
     */
    public function getUserJoinedEvents(): array
    {
        return array_merge(
            $this->eventRepo->getUserJoinedEvents($this->security->getUser()),
            $this->gymEventRepo->getUserJoinedEvents($this->security->getUser())
        );
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
     * @param GymEvent $event
     * @return GymEventParticipant
     */
    public function addGymEventParticipant(GymEvent $event): GymEventParticipant
    {
        $participant = new GymEventParticipant($event, $this->security->getUser());
        $event->addParticipant($participant);

        return $participant;
    }

    /**
     * @param GymEvent $event
     * @return GymEventParticipant|null
     */
    public function removeGymEventParticipant(GymEvent $event): ?GymEventParticipant
    {
        $participant = $this->participantRepo->findOneBy([
            'event' => $event,
            'user' => $this->security->getUser(),
        ]);

        if (!$participant) {
            return null;
        }

        $event->removeParticipant($participant);

        return $participant;
    }

    /**
     * @param string $type
     * @return EventRepositoryInterface
     */
    private function getEventRepository(string $type): EventRepositoryInterface
    {
        if ($type === BaseCourt::PUBLIC_COURT) {
            return $this->eventRepo;
        }

        if ($type === BaseCourt::GYM_COURT) {
            return $this->gymEventRepo;
        }

        throw new ORMInvalidArgumentException();
    }
}
