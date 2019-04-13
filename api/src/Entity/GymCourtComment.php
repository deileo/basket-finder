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
class GymCourtComment extends Comment implements CommentInterface
{
    /**
     * @var GymCourt
     *
     * @ORM\ManyToOne(targetEntity="GymCourt", inversedBy="comments")
     */
    private $gymCourt;

    /**
     * @var UserInterface
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="eventComments")
     * @Groups({"comment"})
     */
    private $createdBy;

    /**
     * @return GymCourt
     */
    public function getGymCourt(): GymCourt
    {
        return $this->gymCourt;
    }

    /**
     * @param GymCourt $gymCourt
     */
    public function setGymCourt(GymCourt $gymCourt): void
    {
        $this->gymCourt = $gymCourt;
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
