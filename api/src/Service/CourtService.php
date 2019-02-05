<?php

namespace App\Service;

use App\Entity\Court;
use App\Repository\CourtRepository;

class CourtService
{
    /**
     * @var CourtRepository
     */
    private $courtRepository;

    /**
     * @param CourtRepository $courtRepository
     */
    public function __construct(CourtRepository $courtRepository)
    {
        $this->courtRepository = $courtRepository;
    }

    /**
     * @return Court[]
     */
    public function getAllCourts(): array
    {
        return $this->courtRepository->findAll();
    }
}
