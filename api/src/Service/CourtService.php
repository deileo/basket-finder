<?php

namespace App\Service;

use App\Entity\BaseCourt;
use App\Entity\CourtInterface;
use App\Repository\CourtRepository;
use App\Repository\CourtRepositoryInterface;
use App\Repository\GymCourtRepository;
use function Clue\StreamFilter\fun;
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
     * @param string $type
     * @return CourtInterface[]
     */
    public function getCourtsByType(string $type): array
    {
        if (!in_array($type, BaseCourt::$supportedTypes)) {
            throw new ORMInvalidArgumentException();
        }

        return $this->getCourtRepository($type)->getActiveCourts(true);
    }

    /**
     * @return array
     */
    public function getAllCourts(): array
    {
        $repo = $this->getCourtRepository(BaseCourt::PUBLIC_COURT);

        return [
            'active' => $repo->getActiveCourts(),
            'disabled' => $repo->getDisabledCourts(),
        ];
    }

    /**
     * @return array
     */
    public function getAllGymCourts(): array
    {
        $repo = $this->getCourtRepository(BaseCourt::GYM_COURT);

        return [
            'active' => $repo->getActiveCourts(),
            'disabled' => $repo->getDisabledCourts(),
        ];
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
     * @return CourtInterface[]
     */
    public function getNewCourts(): array
    {
        $courts = array_merge(
            $this->getCourtRepository(BaseCourt::PUBLIC_COURT)->getNewCourts(),
            $this->getCourtRepository(BaseCourt::GYM_COURT)->getNewCourts()
        );

        usort($courts, function (CourtInterface $a, CourtInterface $b) {
           return $a->getCreatedAt() < $b->getCreatedAt();
        });

        return $courts;
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
