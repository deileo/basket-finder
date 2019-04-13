<?php

namespace App\Repository;

use App\Entity\GymEvent;
use App\Entity\GymEventParticipant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class ParticipantRepository extends ServiceEntityRepository
{
    /**
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, GymEventParticipant::class);
    }

    /**
     * @param UserInterface $user
     * @return GymEventParticipant[]
     */
    public function getUnconfirmedParticipants(UserInterface $user): array
    {
        $qb = $this->createQueryBuilder('p')->leftJoin('p.event', 'e');

        return $qb->andWhere($qb->expr()->eq('e.createdBy', $user->getId()))
            ->andWhere($qb->expr()->eq('p.isConfirmed', $qb->expr()->literal(false)))
            ->getQuery()->getResult();
    }

    /**
     * @param GymEvent $event
     * @return array
     */
    public function getConfirmedEventParticipants(GymEvent $event): array
    {
        $qb = $this->createQueryBuilder('p');

        return $qb->andWhere($qb->expr()->eq('p.event', $event->getId()))
            ->andWhere($qb->expr()->eq('p.isConfirmed', $qb->expr()->literal(true)))
            ->getQuery()->getResult();
    }
}
