<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

abstract class BaseCourt
{
    use TimestampableEntity, SoftDeleteableEntity;

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
     * @Assert\NotBlank
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
     * @Assert\NotBlank
     */
    protected $lat;

    /**
     * @var float
     *
     * @ORM\Column(name="lng", type="float")
     * @Groups({"default"})
     * @Assert\NotBlank
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
     * @var bool
     *
     * @ORM\Column(type="boolean", options={"default": true})
     * @Groups({"default"})
     */
    protected $new = true;

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
     * @return string|null
     */
    public function getLocation(): ?string
    {
        return $this->location;
    }

    /**
     * @param string|null $location
     */
    public function setLocation(?string $location): void
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
     * @return float|null
     */
    public function getLat(): ?float
    {
        return $this->lat;
    }

    /**
     * @param float|null $lat
     */
    public function setLat(?float $lat): void
    {
        $this->lat = $lat;
    }

    /**
     * @return float|null
     */
    public function getLong(): ?float
    {
        return $this->long;
    }

    /**
     * @param float|null $long
     */
    public function setLong(?float $long): void
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

    /**
     * @return bool
     */
    public function isNew(): bool
    {
        return $this->new;
    }

    /**
     * @param bool $new
     */
    public function setNew(bool $new): void
    {
        $this->new = $new;
    }
}
