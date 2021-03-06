<?php

namespace App\Repository;

use App\Entity\GymCourt;
use App\Entity\GymEvent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class GymEventRepository extends ServiceEntityRepository implements EventRepositoryInterface
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
    public function getAllEvents(): array
    {
        $date = new \DateTime();
        $qb = $this->createQueryBuilder('e');

        return $qb->andWhere($qb->expr()->gte('e.date', ':date'))
            ->addOrderBy('e.startTime')
            ->setParameters([
                'date' => $date->format('Y-m-d'),
            ])
            ->getQuery()->getResult();
    }

    /**
     * @param bool $comments
     * @return GymEvent[]
     */
    public function getTodayEvents(bool $comments = true): array
    {
        $date = new \DateTime();
        $qb = $this->createQueryBuilder('e');

        if ($comments) {
            $qb->select('e as event, COUNT(cm) as commentsCount')
                ->leftJoin('e.comments', 'cm')
                ->groupBy('e.id');
        }

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
     * @param bool $comments
     * @return GymEvent[]
     */
    public function getActiveCourtEvents(GymCourt $court, bool $comments = true): array
    {
        $date = new \DateTime();
        $qb = $this->createQueryBuilder('e');

        if ($comments) {
            $qb->select('e as event, COUNT(cm) as commentsCount')
                ->leftJoin('e.comments', 'cm')
                ->groupBy('e.id');
        }

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

    /**
     * @param UserInterface $user
     * @return GymEvent[]
     */
    public function getUserEvents(UserInterface $user): array
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
                ->andWhere($qb->expr()->eq('e.createdBy', ':user'))
                ->addOrderBy('e.date')
                ->addOrderBy('e.startTime')
                ->setParameters([
                    'user' => $user,
                    'time' => $date->format('H:i:s'),
                    'date' => $date->format('Y-m-d'),
                ])
                ->getQuery()->getResult();
    }

    /**
     * @param UserInterface $user
     * @return GymEventRepository[]
     */
    public function getUserJoinedEvents(UserInterface $user): array
    {
        $date = new \DateTime();
        $qb = $this->createQueryBuilder('e')->leftJoin('e.participants', 'p');

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
                ->andWhere($qb->expr()->eq('p.user', ':user'))
                ->andWhere($qb->expr()->eq('p.isConfirmed', $qb->expr()->literal(true)))
                ->addOrderBy('e.date')
                ->addOrderBy('e.startTime')
                ->setParameters([
                    'user' => $user,
                    'time' => $date->format('H:i:s'),
                    'date' => $date->format('Y-m-d'),
                ])
                ->getQuery()->getResult();
    }
}
