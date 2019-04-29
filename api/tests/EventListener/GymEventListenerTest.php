<?php

namespace App\EventListener;

use App\Entity\GymEvent;
use App\Entity\User;
use Doctrine\ORM\Event\LifecycleEventArgs;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class GymEventListenerTest extends TestCase
{
    /**
     * @var Security|\PHPUnit_Framework_MockObject_MockObject
     */
    private $security;

    /**
     * @var LifecycleEventArgs|\PHPUnit_Framework_MockObject_MockObject
     */
    private $args;

    /**
     * @var GymEventListener
     */
    private $gymEventListener;

    public function setUp()
    {
        $this->security = $this->getMockBuilder(Security::class)->disableOriginalConstructor()->getMock();
        $this->args = $this->getMockBuilder(LifecycleEventArgs::class)->disableOriginalConstructor()->getMock();

        $this->gymEventListener = new GymEventListener($this->security);
    }

    public function testShouldSetCreatedByUser()
    {
        $event = new GymEvent(null);
        $user = new User();

        $this->args->expects($this->once())->method('getEntity')->willReturn($event);

        $this->security->expects($this->once())->method('getUser')->willReturn($user);

        $this->gymEventListener->prePersist($this->args);

        $this->assertInstanceOf(User::class, $event->getCreatedBy());
    }

    public function testShouldReturnIfEntityIsNotEvent()
    {
        $user = new User();

        $this->args->expects($this->once())->method('getEntity')->willReturn(null);

        $this->security->expects($this->once())->method('getUser')->willReturn($user);

        $this->gymEventListener->prePersist($this->args);
    }
}
