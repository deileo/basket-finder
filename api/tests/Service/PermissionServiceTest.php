<?php

namespace App\Service;


use App\Entity\GymCourt;
use App\Entity\Permission;
use App\Entity\User;
use App\Repository\PermissionRepository;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class PermissionServiceTest extends TestCase
{
    /**
     * @var PermissionRepository|\PHPUnit_Framework_MockObject_MockObject
     */
    private $permissionRepo;

    /**
     * @var Security|\PHPUnit_Framework_MockObject_MockObject
     */
    private $security;

    /**
     * @var PermissionService
     */
    private $permissionService;

    public function setUp()
    {
        $this->permissionRepo = $this->getMockBuilder(PermissionRepository::class)->disableOriginalConstructor()->getMock();
        $this->security = $this->getMockBuilder(Security::class)->disableOriginalConstructor()->getMock();

        $this->permissionService = new PermissionService($this->permissionRepo, $this->security);
    }

    public function testShouldReturnUserPermissionsForGymCourt()
    {
        $user = new User();
        $court = new GymCourt();

        $this->security->expects($this->once())->method('getUser')->willReturn($user);

        $this->permissionRepo->expects($this->once())->method('getPermissionForGymCourt')
            ->with($user, $court)->willReturn(new Permission());

        $this->assertInstanceOf(Permission::class, $this->permissionService->getUserPermissionForGymCourt($court));
    }

    public function testShouldReturnAllPermissions()
    {
        $pendingPermission = new Permission();
        $activePermission = new Permission();

        $this->permissionRepo->expects($this->once())->method('getPendingPermissions')->willReturn([$pendingPermission]);
        $this->permissionRepo->expects($this->once())->method('getActivePermissions')->willReturn([$activePermission]);

        $this->assertEquals(
            ['pending' => [$pendingPermission], 'active' => [$activePermission]],
            $this->permissionService->getPermissions()
        );
    }
}
