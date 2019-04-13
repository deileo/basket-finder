<?php

namespace App\Service;

use App\Entity\Event;
use App\Entity\EventInterface;
use App\Entity\GymEventParticipant;
use App\Repository\ParticipantRepository;
use Symfony\Component\Security\Core\Security;

class ParticipantsService
{
    /**
     * @var ParticipantRepository
     */
    private $participantsRepo;

    /**
     * @var Security
     */
    private $security;

    /**
     * @param ParticipantRepository $participantRepository
     * @param Security $security
     */
    public function __construct(ParticipantRepository $participantRepository, Security $security)
    {
        $this->participantsRepo = $participantRepository;
        $this->security = $security;
    }

    /**
     * @return GymEventParticipant[]
     */
    public function getUnconfirmedParticipants(): array
    {
        return $this->participantsRepo->getUnconfirmedParticipants($this->security->getUser());
    }

    /**
     * @param EventInterface $event
     * @return array
     */
    public function getEventParticipants(EventInterface $event): array
    {
        if ($event instanceof Event) {
            return $event->getParticipants()->toArray();
        }

        $participants = $this->participantsRepo->getConfirmedEventParticipants($event);

        $users = [];
        foreach ($participants as $participant) {
            $users[] = $participant->getUser();
        }

        return $users;
    }
}
