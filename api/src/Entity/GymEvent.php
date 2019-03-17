<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table()
 */
class GymEvent extends BaseEvent implements EventInterface
{
    /**
     * @var float|null
     *
     * @ORM\Column(type="float", nullable=true)
     */
    private $price;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="time")
     * @Assert\NotBlank
     * @Assert\Expression(
     *     "this.getEndTime() > this.getStartTime()",
     *     message="Pabaigos laikas turi buti velesnis negu pradzios laikas"
     * )
     */
    protected $endTime;

    /**
     * @var UserInterface
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
     * @var Collection|User[]
     *
     * @ORM\ManyToMany(targetEntity="User", inversedBy="joinedGymEvents")
     * @ORM\JoinTable(name="gym_event_participants")
     */
    private $participants;

    public function __construct(?UserInterface $user)
    {
        $this->createdBy = $user;
        $this->participants = new ArrayCollection();
    }

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
     * @return \DateTime
     */
    public function getEndTime()
    {
        return $this->endTime;
    }

    /**
     * @param \DateTime $endTime
     */
    public function setEndTime($endTime): void
    {
        $this->endTime = $endTime;
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
    public function addParticipant(User $participant): void
    {
        if (!$this->getParticipants()->contains($participant)) {
            $this->getParticipants()->add($participant);
        }
    }

    /**
     * @param User $participant
     */
    public function removeParticipant(User $participant): void
    {
        if ($this->getParticipants()->contains($participant)) {
            $this->getParticipants()->removeElement($participant);
        }
    }
}
