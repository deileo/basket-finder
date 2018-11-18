<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CourtRepository")
 */
class Event
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
     * @var string
     *
     * @ORM\Column()
     * @Assert\NotBlank
     */
    private $creatorFirstName;

    /**
     * @var string
     *
     * @ORM\Column()
     * @Assert\NotBlank
     */
    private $creatorLastName;

    /**
     * @var string
     *
     * @ORM\Column()
     * @Assert\Email
     */
    private $creatorEmail;

    /**
     * @var string
     *
     * @ORM\Column()
     */
    private $creatorPhoneNumber;

    /**
     * @var string
     *
     * @ORM\Column()
     * @Assert\NotBlank
     */
    private $name;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank
     */
    private $startTime;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank
     */
    private $endTime;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\NotBlank
     * @Assert\Range(min="1", max="10")
     */
    private $neededPlayers;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     */
    private $comment;

    /**
     * @var Court
     *
     * @ORM\ManyToOne(targetEntity="Court", inversedBy="events")
     * @ORM\JoinColumn(name="court_id", referencedColumnName="id")
     */
    private $court;

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getCreatorFirstName(): ?string
    {
        return $this->creatorFirstName;
    }

    /**
     * @param string $creatorFirstName
     */
    public function setCreatorFirstName(?string $creatorFirstName): void
    {
        $this->creatorFirstName = $creatorFirstName;
    }

    /**
     * @return string
     */
    public function getCreatorLastName(): ?string
    {
        return $this->creatorLastName;
    }

    /**
     * @param string $creatorLastName
     */
    public function setCreatorLastName(?string $creatorLastName): void
    {
        $this->creatorLastName = $creatorLastName;
    }

    /**
     * @return string
     */
    public function getCreatorEmail(): ?string
    {
        return $this->creatorEmail;
    }

    /**
     * @param string $creatorEmail
     */
    public function setCreatorEmail(?string $creatorEmail): void
    {
        $this->creatorEmail = $creatorEmail;
    }

    /**
     * @return string
     */
    public function getCreatorPhoneNumber(): ?string
    {
        return $this->creatorPhoneNumber;
    }

    /**
     * @param string $creatorPhoneNumber
     */
    public function setCreatorPhoneNumber(?string $creatorPhoneNumber): void
    {
        $this->creatorPhoneNumber = $creatorPhoneNumber;
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
     * @return \DateTime
     */
    public function getStartTime(): ?\DateTime
    {
        return $this->startTime;
    }

    /**
     * @param \DateTime $startTime
     */
    public function setStartTime(?\DateTime $startTime): void
    {
        $this->startTime = $startTime;
    }

    /**
     * @return \DateTime
     */
    public function getEndTime(): ?\DateTime
    {
        return $this->endTime;
    }

    /**
     * @param \DateTime $endTime
     */
    public function setEndTime(?\DateTime $endTime): void
    {
        $this->endTime = $endTime;
    }

    /**
     * @return int
     */
    public function getNeededPlayers(): ?int
    {
        return $this->neededPlayers;
    }

    /**
     * @param int $neededPlayers
     */
    public function setNeededPlayers(?int $neededPlayers): void
    {
        $this->neededPlayers = $neededPlayers;
    }

    /**
     * @return null|string
     */
    public function getComment(): ?string
    {
        return $this->comment;
    }

    /**
     * @param null|string $comment
     */
    public function setComment(?string $comment): void
    {
        $this->comment = $comment;
    }

    /**
     * @return Court
     */
    public function getCourt(): ?Court
    {
        return $this->court;
    }

    /**
     * @param Court $court
     */
    public function setCourt(?Court $court): void
    {
        $this->court = $court;
    }
}