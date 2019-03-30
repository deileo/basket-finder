<?php

namespace App\Repository;

use App\Entity\GymCourt;
use App\Entity\Permission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class PermissionRepository extends ServiceEntityRepository
{
    /**
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Permission::class);
    }

    /**
     * @param UserInterface $user
     * @param GymCourt $gymCourt
     * @return Permission|null
     */
    public function getPermissionForGymCourt(UserInterface $user, GymCourt $gymCourt): ?Permission
    {
        $qb = $this->createQueryBuilder('p');

        return $qb->andWhere($qb->expr()->eq('p.user', ':user'))
            ->andWhere($qb->expr()->eq('p.gymCourt', ':gymCourt'))
            ->setParameters([
                'user' => $user,
                'gymCourt' => $gymCourt,
            ])->getQuery()->setMaxResults(1)->getOneOrNullResult();
    }

    /**
     * @return Permission[]
     */
    public function getPendingPermissions(): array
    {
        $qb = $this->createQueryBuilder('p');

        return $qb->andWhere($qb->expr()->isNull('p.validUntil'))->getQuery()->getResult();
    }

    /**
     * @return Permission[]
     */
    public function getActivePermissions(): array
    {
        $qb = $this->createQueryBuilder('p');

        return $qb->andWhere($qb->expr()->gte('p.validUntil', ':date'))
            ->setParameter('date', (new \DateTime())->format('Y-m-d'))
            ->getQuery()->getResult();
    }
}
