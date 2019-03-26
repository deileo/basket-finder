<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table()
 */
class Permission
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var UserInterface
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="permissions")
     */
    private $user;

    /**
     * @var GymCourt
     *
     * @ORM\ManyToOne(targetEntity="GymCourt", inversedBy="permissions")
     */
    private $gymCourt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="date", nullable=true)
     * @Assert\GreaterThanOrEqual("today")
     */
    private $validUntil;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $file;

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return UserInterface
     */
    public function getUser(): UserInterface
    {
        return $this->user;
    }

    /**
     * @param UserInterface $user
     */
    public function setUser(UserInterface $user): void
    {
        $this->user = $user;
    }

    /**
     * @return GymCourt
     */
    public function getGymCourt(): ?GymCourt
    {
        return $this->gymCourt;
    }

    /**
     * @param GymCourt $gymCourt
     */
    public function setGymCourt(?GymCourt $gymCourt): void
    {
        $this->gymCourt = $gymCourt;
    }

    /**
     * @return \DateTime
     */
    public function getValidUntil(): ?\DateTime
    {
        return $this->validUntil;
    }

    /**
     * @param \DateTime $validUntil
     */
    public function setValidUntil(?\DateTime $validUntil): void
    {
        $this->validUntil = $validUntil;
    }

    /**
     * @param $file
     */
    public function setFile($file): void
    {
        $this->file = $file;
    }

    /**
     * @return mixed
     */
    public function getFile()
    {
        return $this->file;
    }
}
