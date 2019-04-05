<?php

namespace App\Repository;

use App\Entity\Court;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class CourtRepository extends ServiceEntityRepository implements CourtRepositoryInterface
{
    /**
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Court::class);
    }

    /**
     * @return Court[]
     */
    public function getActiveCourts(): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.enabled = true')
            ->getQuery()->getResult();
    }

    /**
     * @return Court[]
     */
    public function getDisabledCourts(): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.enabled = false')
            ->getQuery()->getResult();
    }
}
