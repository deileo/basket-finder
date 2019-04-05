<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

abstract class BaseCourt
{
    public const PUBLIC_COURT = 'court';
    public const GYM_COURT = 'gym-court';

    /**
     * @var array
     */
    public static $supportedTypes = [
        self::PUBLIC_COURT,
        self::GYM_COURT,
    ];

    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"default"})
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     * @Groups({"default"})
     */
    protected $address;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     * @Groups({"default"})
     */
    protected $location;

    /**
     * @var string|null
     *
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"default"})
     */
    protected $description;

    /**
     * @var float
     *
     * @ORM\Column(type="float")
     * @Groups({"default"})
     */
    protected $lat;

    /**
     * @var float
     *
     * @ORM\Column(name="lng", type="float")
     * @Groups({"default"})
     */
    protected $long;

    /**
     * @var bool
     *
     * @ORM\Column(type="boolean", options={"default": false})
     * @Groups({"default"})
     */
    protected $enabled = false;

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

    /**
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    /**
     * @param bool $enabled
     */
    public function setEnabled(bool $enabled): void
    {
        $this->enabled = $enabled;
    }
}
