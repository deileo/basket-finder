<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;
use Symfony\Component\Security\Core\User\UserInterface;

interface EventInterface
{
    /**
     * @return int
     */
    public function getId(): ?int;

    /**
     * @return string
     */
    public function getName(): ?string;

    /**
     * @param string $name
     */
    public function setName(?string $name): void;

    /**
     * @return \DateTimeInterface|null
     */
    public function getDate(): ?\DateTimeInterface;

    /**
     * @param \DateTimeInterface|null $date
     */
    public function setDate(?\DateTimeInterface $date): void;

    /**
     * @return \DateTime
     */
    public function getStartTime();

    /**
     * @param \DateTime $startTime
     */
    public function setStartTime($startTime): void;

    /**
     * @return int
     */
    public function getNeededPlayers(): ?int;

    /**
     * @param int $neededPlayers
     */
    public function setNeededPlayers(?int $neededPlayers): void;

    /**
     * @return null|string
     */
    public function getComment(): ?string;

    /**
     * @param null|string $comment
     */
    public function setComment(?string $comment): void;

    /**
     * @return User[]|Collection||GymEventParticipant[]
     */
    public function getParticipants(): Collection;

    /**
     * @param User|GymEventParticipant $participant
     */
    public function addParticipant($participant): void;

    /**
     * @param User|GymEventParticipant $participant
     */
    public function removeParticipant($participant): void;

    /**
     * @return UserInterface|null
     */
    public function getCreatedBy(): ?UserInterface;

    /**
     * @param UserInterface|null $user
     */
    public function setCreatedBy(?UserInterface $user): void;
}