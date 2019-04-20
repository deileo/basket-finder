<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

abstract class BaseEvent
{
    use TimestampableEntity, SoftDeleteableEntity;

    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"event"})
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column()
     * @Assert\NotBlank
     * @Groups({"event", "participant"})
     */
    protected $name;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="date")
     * @Assert\NotBlank
     * @Groups({"event"})
     */
    protected $date;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="time")
     * @Assert\NotBlank
     * @Groups({"event"})
     */
    protected $startTime;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\NotBlank
     * @Assert\Range(min="1", max="10")
     * @Groups({"event"})
     */
    protected $neededPlayers;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     * @Groups({"event"})
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
