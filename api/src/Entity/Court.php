<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CourtRepository")
 */
class Court extends BaseCourt implements CourtInterface
{
    /**
     * @var Collection|Event[]
     *
     * @ORM\OneToMany(targetEntity="Event", mappedBy="court")
     */
    protected $events;

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
}
