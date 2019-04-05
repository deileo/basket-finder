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

    /**
     * @return CourtInterface[]
     */
    public function getActiveCourts(): array;

    /**
     * @return CourtInterface[]
     */
    public function getDisabledCourts(): array;
}
