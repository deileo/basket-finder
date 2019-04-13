<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

abstract class Comment
{
    use TimestampableEntity, SoftDeleteableEntity;

    public const COMMENT_EVENT = 'event';
    public const COMMENT_COURT = 'court';
    public const COMMENT_GYM_COURT = 'gym-court';

    /**
     * @var array
     */
    public static $supportedTypes = [
        self::COMMENT_COURT,
        self::COMMENT_GYM_COURT,
        self::COMMENT_EVENT,
    ];

    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"comment"})
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     * @Groups({"comment"})
     */
    protected $comment;

    /**
     * @var \DateTime
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     * @Groups({"comment"})
     */
    protected $createdAt;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getComment(): ?string
    {
        return $this->comment;
    }

    /**
     * @param string $comment
     */
    public function setComment(?string $comment): void
    {
        $this->comment = $comment;
    }
}
