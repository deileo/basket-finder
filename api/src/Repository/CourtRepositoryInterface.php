<?php

namespace App\Repository;

use App\Entity\CourtInterface;

interface CourtRepositoryInterface
{
    /**
     * @param int $id
     * @return CourtInterface|null
     */
    public function find($id);

    /**
     * @return CourtInterface[]
     */
    public function findAll();
}