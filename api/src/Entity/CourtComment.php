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
class CourtComment extends Comment implements CommentInterface
{
    /**
     * @var Court
     *
     * @ORM\ManyToOne(targetEntity="Court", inversedBy="comments")
     */
    private $court;

    /**
     * @var UserInterface
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="eventComments")
     * @Groups({"comment"})
     */
    private $createdBy;

    /**
     * @return Court
     */
    public function getCourt(): Court
    {
        return $this->court;
    }

    /**
     * @param Court $court
     */
    public function setCourt(Court $court): void
    {
        $this->court = $court;
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
