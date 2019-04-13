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
     * @param bool $comments
     * @return CourtInterface[]
     */
    public function getActiveCourts(bool $comments = false): array;

    /**
     * @param bool $comments
     * @return CourtInterface[]
     */
    public function getDisabledCourts(bool $comments = false): array;

    /**
     * @return CourtInterface[]
     */
    public function getNewCourts(): array;
}
