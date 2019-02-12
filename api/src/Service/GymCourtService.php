<?php

namespace App\Service;

use App\Entity\GymCourt;
use App\Repository\GymCourtRepository;

class GymCourtService
{
    /**
     * @var GymCourtRepository
     */
    private $gymCourtRepo;

    /**
     * @param GymCourtRepository $gymCourtRepo
     */
    public function __construct(GymCourtRepository $gymCourtRepo)
    {
        $this->gymCourtRepo = $gymCourtRepo;
    }

    /**
     * @return GymCourt[]
     */
    public function getAllGymCourts(): array
    {
        return $this->gymCourtRepo->findAll();
    }
}
