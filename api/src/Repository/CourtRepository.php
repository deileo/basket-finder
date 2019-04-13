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
     * @param bool $comments
     * @return Court[]
     */
    public function getActiveCourts(bool $comments = false): array
    {
        $qb = $this->createQueryBuilder('c');

        if ($comments) {
            $qb->select('c as court, COUNT(cm) as commentsCount')
                ->leftJoin('c.comments', 'cm')
                ->groupBy('c.id');
        }

        return $qb->andWhere('c.enabled = true')->getQuery()->getResult();
    }

    /**
     * @param bool $comments
     * @return Court[]
     */
    public function getDisabledCourts(bool $comments = false): array
    {
        $qb = $this->createQueryBuilder('c');

        if ($comments) {
            $qb->select('c as court, COUNT(cm) as commentsCount')
                ->leftJoin('c.comments', 'cm')
                ->groupBy('c.id');
        }

        return $qb->andWhere($qb->expr()->eq('c.enabled', $qb->expr()->literal(false)))
            ->getQuery()->getResult();
    }

    /**
     * @return Court[]
     */
    public function getNewCourts(): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.enabled = false')
            ->andWhere('c.new = true')
            ->getQuery()->getResult();
    }
}
