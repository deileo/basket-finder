<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GymCourtRepository")
 */
class GymCourt extends BaseCourt implements CourtInterface
{
    /**
     * @var string
     *
     * @ORM\Column(type="string", name="gym_name")
     * @Groups({"default"})
     */
    private $name;

    /**
     * @var int|null
     *
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"default"})
     */
    private $renovationYear;

    /**
     * @var string
     *
     * @ORM\Column(type="string", name="gym_condition")
     * @Groups({"default"})
     */
    private $condition;

    /**
     * @var Collection|Event[]
     *
     * @ORM\OneToMany(targetEntity="GymEvent", mappedBy="gymCourt")
     */
    protected $events;

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return int|null
     */
    public function getRenovationYear(): ?int
    {
        return $this->renovationYear;
    }

    /**
     * @param int|null $renovationYear
     */
    public function setRenovationYear(?int $renovationYear): void
    {
        $this->renovationYear = $renovationYear;
    }

    /**
     * @return string
     */
    public function getCondition(): string
    {
        return $this->condition;
    }

    /**
     * @param string $condition
     */
    public function setCondition(string $condition): void
    {
        $this->condition = $condition;
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
            $event->setGymCourt($this);
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
