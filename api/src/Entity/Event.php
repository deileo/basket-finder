<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event extends BaseEvent
{
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
     * @ORM\Column(nullable=true)
     * @Assert\Email
     */
    private $creatorEmail;

    /**
     * @var Court
     *
     * @ORM\ManyToOne(targetEntity="Court", inversedBy="events")
     * @ORM\JoinColumn(name="court_id", referencedColumnName="id")
     */
    private $court;

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
