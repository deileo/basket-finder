<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @Gedmo\SoftDeleteable()
 */
class User implements UserInterface
{
    use SoftDeleteableEntity;

    /**
     * @var array
     */
    static public $roleMap = [
        'ROLE_USER' => 0,
        'ROLE_ADMIN' => 1,
    ];

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"default", "event", "participant", "adminPermission", "user"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @Groups({"default", "event", "participant", "adminPermission", "adminCourt", "user"})
     */
    private $email;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @Groups({"default", "comment", "event", "participant", "adminPermission", "adminCourt", "user"})
     */
    private $firstName;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @Groups({"default", "comment", "event", "participant", "adminPermission", "adminCourt", "user"})
     */
    private $lastName;

    /**
     * @var \DateTimeInterface
     * @ORM\Column(type="datetime")
     * @Groups({"default"})
     */
    private $created_at;

    /**
     * @var string|null
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"default", "user"})
     */
    private $googleAccessToken;

    /**
     * @var string|null
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"default", "comment", "event", "participant", "adminCourt", "user"})
     */
    private $googleImage;

    /**
     * @var bool
     * @ORM\Column(type="boolean", options={"defaults": 0})
     * @Groups({"default", "user"})
     */
    private $disabled = false;

    /**
     * @var GymEvent[]|ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="GymEvent", mappedBy="createdBy")
     */
    private $createdGymEvents;

    /**
     * @var GymEventParticipant[]|Collection
     *
     * @ORM\OneToMany(targetEntity="GymEventParticipant", mappedBy="user")
     */
    private $joinedGymEvents;

    /**
     * @var Event[]|ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Event", mappedBy="createdBy")
     */
    private $createdEvents;

    /**
     * @var Event[]|Collection
     *
     * @ORM\ManyToMany(targetEntity="Event", mappedBy="participants")
     */
    private $joinedEvents;

    /**
     * @var Permission[]|ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Permission", mappedBy="user")
     */
    private $permissions;

    /**
     * @var GymCourt[]|ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Court", mappedBy="createdBy")
     */
    private $createdGymCourts;

    /**
     * @var Court[]|ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Court", mappedBy="createdBy")
     */
    private $createdCourts;

    /**
     * @var int
     *
     * @ORM\Column(type="integer", nullable=false, options={"default: 0"})
     * @Groups({"default", "user"})
     */
    private $roles = 0;

    public function __construct()
    {
        $this->createdEvents = new ArrayCollection();
        $this->createdGymEvents = new ArrayCollection();
        $this->joinedEvents = new ArrayCollection();
        $this->joinedGymEvents = new ArrayCollection();
        $this->permissions = new ArrayCollection();
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    /**
     * @param string $firstName
     */
    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @return \DateTimeInterface
     */
    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->created_at;
    }

    /**
     * @param \DateTimeInterface $created_at
     */
    public function setCreatedAt(\DateTimeInterface $created_at): void
    {
        $this->created_at = $created_at;
    }

    /**
     * @return null|string
     */
    public function getGoogleAccessToken(): ?string
    {
        return $this->googleAccessToken;
    }

    /**
     * @param null|string $googleAccessToken
     */
    public function setGoogleAccessToken(?string $googleAccessToken): void
    {
        $this->googleAccessToken = $googleAccessToken;
    }

    /**
     * @return null|string
     */
    public function getGoogleImage(): ?string
    {
        return $this->googleImage;
    }

    /**
     * @param null|string $googleImage
     */
    public function setGoogleImage(?string $googleImage): void
    {
        $this->googleImage = $googleImage;
    }

    /**
     * @return GymEvent[]|Collection
     */
    public function getCreatedGymEvents(): Collection
    {
        return $this->createdEvents;
    }

    /**
     * @param GymEvent $gymEvent
     */
    public function addCreatedGymEvent(GymEvent $gymEvent): void
    {
        if (!$this->getCreatedGymEvents()->contains($gymEvent)) {
            $this->getCreatedGymEvents()->add($gymEvent);
            $gymEvent->setCreatedBy($this);
        }
    }

    /**
     * @param GymEvent $gymEvent
     */
    public function removeCreatedGymEvent(GymEvent $gymEvent): void
    {
        if ($this->getCreatedGymEvents()->contains($gymEvent)) {
            $this->getCreatedGymEvents()->removeElement($gymEvent);
        }
    }

    /**
     * @return Collection|Court[]
     */
    public function getCreatedCourts(): Collection
    {
        return $this->createdCourts;
    }

    /**
     * @param Court $court
     */
    public function addCreatedCourt(Court $court): void
    {
        if (!$this->getCreatedCourts()->contains($court)) {
            $this->getCreatedCourts()->add($court);
            $court->setCreatedBy($this);
        }
    }

    /**
     * @param Court $court
     */
    public function removeCreatedCourt(Court $court): void
    {
        if ($this->getCreatedCourts()->contains($court)) {
            $this->getCreatedCourts()->removeElement($court);
        }
    }

    /**
     * @return Collection|GymCourt[]
     */
    public function getCreatedGymCourts(): Collection
    {
        return $this->createdGymCourts;
    }

    /**
     * @param GymCourt $gymCourt
     */
    public function addCreatedGymCourt(GymCourt $gymCourt): void
    {
        if (!$this->getCreatedGymCourts()->contains($gymCourt)) {
            $this->getCreatedGymCourts()->add($gymCourt);
            $gymCourt->setCreatedBy($this);
        }
    }

    /**
     * @param GymCourt $gymCourt
     */
    public function removeCreatedGymCourt(GymCourt $gymCourt): void
    {
        if ($this->getCreatedGymCourts()->contains($gymCourt)) {
            $this->getCreatedGymCourts()->removeElement($gymCourt);
        }
    }

    /**
     * @return Event[]|Collection
     */
    public function getCreatedEvents(): Collection
    {
        return $this->createdEvents;
    }

    /**
     * @param Event $event
     */
    public function addCreatedEvent(Event $event): void
    {
        if (!$this->getCreatedEvents()->contains($event)) {
            $this->getCreatedEvents()->add($event);
            $event->setCreatedBy($this);
        }
    }

    /**
     * @param Event $event
     */
    public function removeCreatedEvent(Event $event): void
    {
        if ($this->getCreatedEvents()->contains($event)) {
            $this->getCreatedEvents()->removeElement($event);
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
            $permission->setUser($this);
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
     * @return array
     */
    public function getRoles(): array
    {
        $roles = [];

        foreach (self::$roleMap as $role => $flag) {
            if ($flag === ($this->roles & $flag)) {
                $roles[] = $role;
            }
        }

        return $roles;
    }

    /**
     * @return string
     */
    public function getPassword(): ?string
    {
        return null;
    }

    /**
     * @return string|null The salt
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @return string The username
     */
    public function getUsername(): ?string
    {
        return $this->email;
    }

    public function eraseCredentials()
    {
        return null;
    }

    /**
     * @return int
     */
    public function getRole(): int
    {
        return $this->roles;
    }

    /**
     * @param $role
     */
    public function setRole(int $role): void
    {
        $this->roles = $role;
    }

    /**
     * @return bool
     */
    public function isDisabled(): bool
    {
        return $this->disabled;
    }

    /**
     * @param bool $disabled
     */
    public function setDisabled(bool $disabled): void
    {
        $this->disabled = $disabled;
    }
}
