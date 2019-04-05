<?php

namespace App\Repository;

use App\Entity\GymCourt;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class GymCourtRepository extends ServiceEntityRepository implements CourtRepositoryInterface
{
    /**
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, GymCourt::class);
    }

    /**
     * @return GymCourt[]
     */
    public function getActiveCourts(): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.enabled = true')
            ->getQuery()->getResult();
    }

    /**
     * @return GymCourt[]
     */
    public function getDisabledCourts(): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.enabled = false')
            ->getQuery()->getResult();
    }
}
