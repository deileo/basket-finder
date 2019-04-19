<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 * @ORM\Table()
 * @Gedmo\SoftDeleteable()
 */
class GymEventParticipant
{
    use TimestampableEntity, SoftDeleteableEntity;

    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="joinedGymEvents")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *  @Groups({"event"})
     */
    private $user;

    /**
     * @var GymEvent
     *
     * @ORM\ManyToOne(targetEntity="GymEvent", inversedBy="participants")
     * @ORM\JoinColumn(name="gym_event_id", referencedColumnName="id")
     */
    private $event;

    /**
     * @var bool
     *
     * @ORM\Column(type="boolean", options={"default": false})
     * @Groups({"event"})
     */
    private $isConfirmed = false;

    /**
     * @param GymEvent $event
     * @param UserInterface $user
     */
    public function __construct(GymEvent $event, UserInterface $user)
    {
        $this->event = $event;
        $this->user = $user;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    /**
     * @return GymEvent
     */
    public function getEvent(): GymEvent
    {
        return $this->event;
    }

    /**
     * @param GymEvent $event
     */
    public function setEvent(GymEvent $event): void
    {
        $this->event = $event;
    }

    /**
     * @return bool
     */
    public function isConfirmed(): bool
    {
        return $this->isConfirmed;
    }

    /**
     * @param bool $isConfirmed
     */
    public function setIsConfirmed(bool $isConfirmed): void
    {
        $this->isConfirmed = $isConfirmed;
    }
}
