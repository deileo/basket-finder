<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Security\Core\User\UserInterface;

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
     */
    protected $createdBy;

    public function __construct()
    {
        $this->events = new ArrayCollection();
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
}
