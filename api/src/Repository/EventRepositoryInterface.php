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
     * @return EventInterface[]
     */
    public function getTodayEvents(): array;
}
