<?php

namespace App\Repository;

use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class EventRepository extends ServiceEntityRepository
{
    /**
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Event::class);
    }

    /**
     * @return Event[]
     */
    public function getTodayEvents(): array
    {
        $date = new \DateTime();
        $qb = $this->createQueryBuilder('e');

        return $qb->andWhere($qb->expr()->eq('e.date', ':date'))
            ->andWhere($qb->expr()->lt('e.startTime', ':time'))
            ->addOrderBy('e.startTime')
            ->setParameters([
                'date' => $date->format('Y-m-d'),
                'time' => $date->format('H:i:s'),
            ])
            ->getQuery()->getResult();
    }
}
