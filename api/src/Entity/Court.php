<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CourtRepository")
 * @Gedmo\SoftDeleteable()
 */
class Court extends BaseCourt implements CourtInterface
{
    /**
     * @var Collection|Event[]
     *
     * @ORM\OneToMany(targetEntity="Event", mappedBy="court", cascade={"remove"})
     */
    protected $events;

    /**
     * @var UserInterface|null
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="createdCourts")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     * @Groups({"adminCourt"})
     */
    protected $createdBy;

    /**
     * @var Collection|CourtComment[]
     *
     * @ORM\OneToMany(targetEntity="CourtComment", mappedBy="court")
     */
    private $comments;

    public function __construct()
    {
        $this->events = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    /**
     * @return Event[]|Collection
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    /**
     * @param Event $event
     */
    public function addEvent(Event $event): void
    {
        if (!$this->getEvents()->contains($event)) {
            $this->getEvents()->add($event);
            $event->setCourt($this);
        }
    }

    /**
     * @param Event $event
     */
    public function removeEvent(Event $event): void
    {
        if ($this->getEvents()->contains($event)) {
            $this->getEvents()->removeElement($event);
        }
    }

    /**
     * @param Event[]|ArrayCollection $events
     */
    public function setEvents($events): void
    {
        $this->events = $events;
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
     * @return CourtComment[]|Collection
     */
    public function getComments(): Collection
    {
        $criteria = Criteria::create()
            ->orderBy(["createdAt" => Criteria::DESC]);

        return $this->comments->matching($criteria);
    }

    /**
     * @param CourtComment $comment
     */
    public function addComment(CourtComment $comment): void
    {
        if (!$this->getComments()->contains($comment)) {
            $this->getComments()->add($comment);
            $comment->setCourt($this);
        }
    }

    /**
     * @param CourtComment $comment
     */
    public function removeComment(CourtComment $comment): void
    {
        if ($this->getComments()->contains($comment)) {
            $this->getComments()->removeElement($comment);
        }
    }
}
