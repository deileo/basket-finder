<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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
     * @var string|null
     *
     * @ORM\Column(name="file", type="string", nullable=true)
     */
    private $filePath;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     * @Assert\Length(max=255)
     */
    private $message;

    /**
     * @var UploadedFile|null
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
     * @param $file|null
     */
    public function setFile(?UploadedFile $file): void
    {
        $this->file = $file;
    }

    /**
     * @return UploadedFile|null
     */
    public function getFile(): ?UploadedFile
    {
        return $this->file;
    }

    /**
     * @return string|null
     */
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    /**
     * @param string|null $filePath
     */
    public function setFilePath(?string $filePath): void
    {
        $this->filePath = $filePath;
    }

    /**
     * @return null|string
     */
    public function getMessage(): ?string
    {
        return $this->message;
    }

    /**
     * @param null|string $message
     */
    public function setMessage(?string $message): void
    {
        $this->message = $message;
    }
}
