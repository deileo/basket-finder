<?php

namespace App\Repository;

use App\Entity\EventInterface;

interface EventRepositoryInterface
{
    /**
     * @param int $id
     * @return EventInterface|null
     */
    public function find($id);

    /**
     * @return EventInterface[]
     */
    public function findAll();

    /**
     * @param bool $comments
     * @return EventInterface[]
     */
    public function getTodayEvents(bool $comments = true): array;
}
