<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 * @Gedmo\SoftDeleteable()
 */
class Event extends BaseEvent implements EventInterface
{
    /**
     * @var UserInterface
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="createdEvents")
     */
    private $createdBy;

    /**
     * @var Court
     *
     * @ORM\ManyToOne(targetEntity="Court", inversedBy="events")
     * @ORM\JoinColumn(name="court_id", referencedColumnName="id")
     */
    private $court;

    /**
     * @var Collection|User[]
     *
     * @ORM\ManyToMany(targetEntity="User", inversedBy="joinedEvents")
     * @ORM\JoinTable(name="event_participants")
     */
    private $participants;

    /**
     * @param User $user
     */
    public function __construct(?User $user)
    {
        $this->createdBy = $user;
        $this->participants = new ArrayCollection();
    }

    /**
     * @return Court
     */
    public function getCourt(): ?Court
    {
        return $this->court;
    }

    /**
     * @param Court $court
     */
    public function setCourt(?Court $court): void
    {
        $this->court = $court;
    }

    /**
     * @return UserInterface|null
     */
    public function getCreatedBy(): ?UserInterface
    {
        return $this->createdBy;
    }

    /**
     * @param UserInterface|null $createdBy
     */
    public function setCreatedBy(?UserInterface $createdBy): void
    {
        $this->createdBy = $createdBy;
    }

    /**
     * @return User[]|Collection
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    /**
     * @param User $participant
     */
    public function addParticipant($participant): void
    {
        if (!$this->getParticipants()->contains($participant)) {
            $this->getParticipants()->add($participant);
        }
    }

    /**
     * @param User $participant
     */
    public function removeParticipant($participant): void
    {
        if ($this->getParticipants()->contains($participant)) {
            $this->getParticipants()->removeElement($participant);
        }
    }
}
