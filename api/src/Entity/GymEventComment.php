<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 * @Gedmo\SoftDeleteable()
 */
class GymEventComment extends Comment implements CommentInterface
{
    /**
     * @var GymEvent
     *
     * @ORM\ManyToOne(targetEntity="GymEvent", inversedBy="comments")
     */
    private $gymEvent;

    /**
     * @var UserInterface
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="eventComments")
     * @Groups({"comment"})
     */
    private $createdBy;

    /**
     * @return GymEvent
     */
    public function getGymEvent(): GymEvent
    {
        return $this->gymEvent;
    }

    /**
     * @param GymEvent $gymEvent
     */
    public function setGymEvent(GymEvent $gymEvent): void
    {
        $this->gymEvent = $gymEvent;
    }

    /**
     * @return UserInterface
     */
    public function getCreatedBy(): UserInterface
    {
        return $this->createdBy;
    }

    /**
     * @param UserInterface $createdBy
     */
    public function setCreatedBy(UserInterface $createdBy): void
    {
        $this->createdBy = $createdBy;
    }
}
