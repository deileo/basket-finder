<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

abstract class BaseCourt
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $address;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $location;

    /**
     * @var string|null
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $description;

    /**
     * @var float
     *
     * @ORM\Column(type="float")
     */
    protected $lat;

    /**
     * @var float
     *
     * @ORM\Column(name="lng", type="float")
     */
    protected $long;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @param string $address
     */
    public function setAddress(string $address): void
    {
        $this->address = $address;
    }

    /**
     * @return string
     */
    public function getLocation(): string
    {
        return $this->location;
    }

    /**
     * @param string $location
     */
    public function setLocation(string $location): void
    {
        $this->location = $location;
    }

    /**
     * @return null|string
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param null|string $description
     */
    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return float
     */
    public function getLat(): float
    {
        return $this->lat;
    }

    /**
     * @param float $lat
     */
    public function setLat(float $lat): void
    {
        $this->lat = $lat;
    }

    /**
     * @return float
     */
    public function getLong(): float
    {
        return $this->long;
    }

    /**
     * @param float $long
     */
    public function setLong(float $long): void
    {
        $this->long = $long;
    }
}
