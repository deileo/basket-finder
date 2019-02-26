<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

abstract class BaseEvent
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    protected $creatorPhoneNumber;

    /**
     * @var string
     *
     * @ORM\Column()
     * @Assert\NotBlank
     */
    protected $name;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="date")
     * @Assert\NotBlank
     */
    protected $date;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="time")
     * @Assert\NotBlank
     */
    protected $startTime;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="time")
     * @Assert\NotBlank
     */
    protected $endTime;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\NotBlank
     * @Assert\Range(min="1", max="10")
     */
    protected $neededPlayers;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     */
    protected $comment;

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
     * @return \DateTimeInterface|null
     */
    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    /**
     * @param \DateTimeInterface|null $date
     */
    public function setDate(?\DateTimeInterface $date): void
    {
        $this->date = $date;
    }

    /**
     * @return \DateTime
     */
    public function getStartTime()
    {
        return $this->startTime;
    }

    /**
     * @param \DateTime $startTime
     */
    public function setStartTime($startTime): void
    {
        $this->startTime = $startTime;
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
}
