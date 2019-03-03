<?php

namespace App\Repository;

use App\Entity\GymCourt;
use App\Entity\GymEvent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class GymEventRepository extends ServiceEntityRepository
{
    /**
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, GymEvent::class);
    }

    /**
     * @return GymEvent[]
     */
    public function getTodayEvents(): array
    {
        $date = new \DateTime();
        $qb = $this->createQueryBuilder('e');

        return $qb->andWhere($qb->expr()->eq('e.date', ':date'))
            ->andWhere($qb->expr()->gt('e.startTime', ':time'))
            ->addOrderBy('e.startTime')
            ->setParameters([
                'date' => $date->format('Y-m-d'),
                'time' => $date->format('H:i:s'),
            ])
            ->getQuery()->getResult();
    }

    /**
     * @param GymCourt $court
     * @return GymEvent[]
     */
    public function getActiveCourtEvents(GymCourt $court): array
    {
        $date = new \DateTime();
        $qb = $this->createQueryBuilder('e');

        return
            $qb->andWhere(
                $qb->expr()->orX(
                    $qb->expr()->gte('e.date', ':date'),
                    $qb->expr()->andX(
                        $qb->expr()->eq('e.date', ':date'),
                        $qb->expr()->gt('e.startTime', ':time')
                    )
                )
            )
                ->andWhere($qb->expr()->eq('e.gymCourt', ':court'))
                ->addOrderBy('e.date')
                ->addOrderBy('e.startTime')
                ->setParameters([
                    'court' => $court,
                    'time' => $date->format('H:i:s'),
                    'date' => $date->format('Y-m-d'),
                ])
                ->getQuery()->getResult();
    }
}