<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table()
 */
class GymEvent extends BaseEvent
{
    /**
     * @var float|null
     *
     * @ORM\Column(type="float", nullable=true)
     */
    private $price;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="events")
     */
    private $createdBy;

    /**
     * @var GymCourt
     *
     * @ORM\ManyToOne(targetEntity="GymCourt", inversedBy="events")
     * @ORM\JoinColumn(name="gym_court_id", referencedColumnName="id")
     */
    private $gymCourt;

    /**
     * @return float|null
     */
    public function getPrice(): ?float
    {
        return $this->price;
    }

    /**
     * @param float|null $price
     */
    public function setPrice(?float $price): void
    {
        $this->price = $price;
    }

    /**
     * @return User|null
     */
    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    /**
     * @param User|null $createdBy
     */
    public function setCreatedBy(?User $createdBy): void
    {
        $this->createdBy = $createdBy;
    }

    /**
     * @return GymCourt|null
     */
    public function getGymCourt(): ?GymCourt
    {
        return $this->gymCourt;
    }

    /**
     * @param GymCourt|null $gymCourt
     */
    public function setGymCourt(?GymCourt $gymCourt): void
    {
        $this->gymCourt = $gymCourt;
    }
}
