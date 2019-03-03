<?php

namespace App\Entity;

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
     * @return string
     */
    public function getLocation(): string;

    /**
     * @param string $location
     */
    public function setLocation(string $location): void;

    /**
     * @return null|string
     */
    public function getDescription(): ?string;

    /**
     * @param null|string $description
     */
    public function setDescription(?string $description): void;

    /**
     * @return float
     */
    public function getLat(): float;

    /**
     * @param float $lat
     */
    public function setLat(float $lat): void;

    /**
     * @return float
     */
    public function getLong(): float;

    /**
     * @param float $long
     */
    public function setLong(float $long): void;
}