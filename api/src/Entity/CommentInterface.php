<?php

namespace App\Entity;

use Symfony\Component\Security\Core\User\UserInterface;

interface CommentInterface
{
    /**
     * @return int
     */
    public function getId(): int;

    /**
     * @return string
     */
    public function getComment(): ?string;

    /**
     * @param string $comment
     */
    public function setComment(?string $comment): void;

    /**
     * @return UserInterface
     */
    public function getCreatedBy(): UserInterface;

    /**
     * @param UserInterface $createdBy
     */
    public function setCreatedBy(UserInterface $createdBy): void;
}
