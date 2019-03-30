<?php


namespace App\Service;

use App\Entity\GymCourt;
use App\Entity\Permission;
use App\Repository\PermissionRepository;
use Symfony\Component\Security\Core\Security;

class PermissionService
{
    /**
     * @var PermissionRepository
     */
    private $permissionRepo;

    /**
     * @var Security
     */
    private $security;

    /**
     * @param PermissionRepository $permissionRepo
     * @param Security $security
     */
    public function __construct(PermissionRepository $permissionRepo, Security $security)
    {
        $this->permissionRepo = $permissionRepo;
        $this->security = $security;
    }

    /**
     * @param GymCourt $gymCourt
     * @return Permission|null
     */
    public function getUserPermissionForGymCourt(GymCourt $gymCourt): ?Permission
    {
        return $this->permissionRepo->getPermissionForGymCourt($this->security->getUser(), $gymCourt);
    }

    /**
     * @return array
     */
    public function getPermissions(): array
    {
        return [
            'pending' => $this->permissionRepo->getPendingPermissions(),
            'active' => $this->permissionRepo->getActivePermissions(),
        ];
    }
}
