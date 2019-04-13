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
 * @ORM\Entity(repositoryClass="App\Repository\GymCourtRepository")
 * @Gedmo\SoftDeleteable()
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
     * @ORM\OneToMany(targetEntity="GymEvent", mappedBy="gymCourt", cascade={"remove"})
     */
    protected $events;

    /**
     * @var Permission[]|ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Permission", mappedBy="gymCourt", cascade={"remove"})
     */
    private $permissions;

    /**
     * @var UserInterface|null
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="createdGymCourts")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     */
    protected $createdBy;

    /**
     * @var Collection|GymCourtComment[]
     *
     * @ORM\OneToMany(targetEntity="GymCourtComment", mappedBy="gymCourt")
     */
    private $comments;

    public function __construct()
    {
        $this->events = new ArrayCollection();
        $this->permissions = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(?string $name): void
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
    public function getCondition(): ?string
    {
        return $this->condition;
    }

    /**
     * @param string $condition
     */
    public function setCondition(?string $condition): void
    {
        $this->condition = $condition;
    }

    /**
     * @return GymEvent[]|Collection
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    /**
     * @param GymEvent $event
     */
    public function addEvent(GymEvent $event): void
    {
        if (!$this->getEvents()->contains($event)) {
            $this->getEvents()->add($event);
            $event->setGymCourt($this);
        }
    }

    /**
     * @param GymEvent $event
     */
    public function removeEvent(GymEvent $event): void
    {
        if ($this->getEvents()->contains($event)) {
            $this->getEvents()->removeElement($event);
        }
    }


    /**
     * @return Permission[]|Collection
     */
    public function getPermissions(): Collection
    {
        return $this->permissions;
    }

    /**
     * @param Permission $permission
     */
    public function addPermissions(Permission $permission): void
    {
        if (!$this->getPermissions()->contains($permission)) {
            $this->getPermissions()->add($permission);
            $permission->setGymCourt($this);
        }
    }

    /**
     * @param Permission $permission
     */
    public function removePermission(Permission $permission): void
    {
        if ($this->getPermissions()->contains($permission)) {
            $this->getPermissions()->removeElement($permission);
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
     * @return GymCourtComment[]|Collection
     */
    public function getComments(): Collection
    {
        $criteria = Criteria::create()
            ->orderBy(["createdAt" => Criteria::DESC]);

        return $this->comments->matching($criteria);
    }

    /**
     * @param GymCourtComment $comment
     */
    public function addComment(GymCourtComment $comment): void
    {
        if (!$this->getComments()->contains($comment)) {
            $this->getComments()->add($comment);
            $comment->setGymCourt($this);
        }
    }

    /**
     * @param GymCourtComment $comment
     */
    public function removeComment(GymCourtComment $comment): void
    {
        if ($this->getComments()->contains($comment)) {
            $this->getComments()->removeElement($comment);
        }
    }
}
