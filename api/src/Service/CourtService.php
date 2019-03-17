<?php

namespace App\Service;

use App\Entity\BaseCourt;
use App\Entity\Court;
use App\Entity\CourtInterface;
use App\Repository\CourtRepository;
use App\Repository\CourtRepositoryInterface;
use App\Repository\GymCourtRepository;
use Doctrine\ORM\ORMInvalidArgumentException;

class CourtService
{
    /**
     * @var CourtRepository
     */
    private $courtRepository;

    /**
     * @var GymCourtRepository
     */
    private $gymCourtRepository;

    /**
     * @param CourtRepository $courtRepository
     * @param GymCourtRepository $gymCourtRepository
     */
    public function __construct(CourtRepository $courtRepository, GymCourtRepository $gymCourtRepository)
    {
        $this->courtRepository = $courtRepository;
        $this->gymCourtRepository = $gymCourtRepository;
    }

    /**
     * @return Court[]
     */
    public function getAllCourts(): array
    {
        return [
            'court' => $this->courtRepository->findAll(),
            'gymCourt' => $this->gymCourtRepository->findAll()
        ];
    }

    /**
     * @param string $type
     * @return CourtInterface[]
     */
    public function getCourtsByType(string $type): array
    {
        if (!in_array($type, BaseCourt::$supportedTypes)) {
            throw new ORMInvalidArgumentException();
        }

        return $this->getCourtRepository($type)->findAll();
    }

    /**
     * @param string $type
     * @param int $id
     * @return CourtInterface|null
     */
    public function getCourt(string $type, int $id): ?CourtInterface
    {
        if (!in_array($type, BaseCourt::$supportedTypes)) {
            throw new ORMInvalidArgumentException();
        }

        return $this->getCourtRepository($type)->find($id);
    }

    /**
     * @param string $type
     * @return CourtRepositoryInterface|null
     */
    private function getCourtRepository(string $type): ?CourtRepositoryInterface
    {
        if ($type === BaseCourt::PUBLIC_COURT) {
            return $this->courtRepository;
        }

        if ($type === BaseCourt::GYM_COURT) {
            return $this->gymCourtRepository;
        }

        throw new ORMInvalidArgumentException();
    }
}
