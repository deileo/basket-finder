<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;

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
     * @return User[]|Collection
     */
    public function getParticipants(): Collection;

    /**
     * @param User $participant
     */
    public function addParticipant(User $participant): void;

    /**
     * @param User $participant
     */
    public function removeParticipant(User $participant): void;
}