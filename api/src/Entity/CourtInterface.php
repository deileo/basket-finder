<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;

interface CourtInterface
{
    /**
     * @return int
     */
    public function getId(): int;

    /**
     * @return string
     */
    public function getAddress(): string;

    /**
     * @param string $address
     */
    public function setAddress(string $address): void;

    /**
     * @return string|null
     */
    public function getLocation(): ?string;

    /**
     * @param string|null $location
     */
    public function setLocation(?string $location): void;

    /**
     * @return null|string
     */
    public function getDescription(): ?string;

    /**
     * @param null|string $description
     */
    public function setDescription(?string $description): void;

    /**
     * @return float|null
     */
    public function getLat(): ?float;

    /**
     * @param float|null $lat
     */
    public function setLat(?float $lat): void;

    /**
     * @return float|null
     */
    public function getLong(): ?float;

    /**
     * @param float|null $long
     */
    public function setLong(?float $long): void;

    /**
     * @return bool
     */
    public function isEnabled(): bool;

    /**
     * @param bool $enabled
     */
    public function setEnabled(bool $enabled): void;

    /**
     * @return bool
     */
    public function isNew(): bool;

    /**
     * @param bool $new
     */
    public function setNew(bool $new): void;

    /**
     * @return \DateTime
     */
    public function getCreatedAt();

    /**
     * @return GymCourtComment[]|Collection
     */
    public function getComments(): Collection;
}
