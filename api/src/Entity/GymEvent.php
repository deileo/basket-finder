<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table()
 * @Gedmo\SoftDeleteable()
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
     * @ORM\ManyToOne(targetEntity="User", inversedBy="createdGymEvents")
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
     * @var Collection|GymEventParticipant[]
     *
     * @ORM\OneToMany(targetEntity="GymEventParticipant", mappedBy="event", cascade={"remove"})
     */
    private $participants;

    /**
     * @var Collection|GymEventComment[]
     *
     * @ORM\OneToMany(targetEntity="GymEventComment", mappedBy="gymEvent")
     */
    private $comments;

    public function __construct(?UserInterface $user)
    {
        $this->createdBy = $user;
        $this->participants = new ArrayCollection();
        $this->comments = new ArrayCollection();
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
     * @return GymEventParticipant[]|Collection
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    /**
     * @param GymEventParticipant $participant
     */
    public function addParticipant($participant): void
    {
        if (!$this->getParticipants()->contains($participant)) {
            $this->getParticipants()->add($participant);
            $participant->setEvent($this);
        }
    }

    /**
     * @param GymEventParticipant $participant
     */
    public function removeParticipant($participant): void
    {
        if ($this->getParticipants()->contains($participant)) {
            $this->getParticipants()->removeElement($participant);
        }
    }

    /**
     * @return EventComment[]|Collection
     */
    public function getComments(): Collection
    {
        $criteria = Criteria::create()
            ->orderBy(["createdAt" => Criteria::DESC]);

        return $this->comments->matching($criteria);
    }

    /**
     * @param GymEventComment $comment
     */
    public function addComment(GymEventComment $comment): void
    {
        if (!$this->getComments()->contains($comment)) {
            $this->getComments()->add($comment);
            $comment->setGymEvent($this);
        }
    }

    /**
     * @param GymEventComment $comment
     */
    public function removeComment(GymEventComment $comment): void
    {
        if ($this->getComments()->contains($comment)) {
            $this->getComments()->removeElement($comment);
        }
    }
}
