<?php

namespace App\Service;

use App\Entity\Event;
use App\Entity\GymEvent;
use App\Entity\GymEventParticipant;
use App\Entity\User;
use App\Repository\ParticipantRepository;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class ParticipantsServiceTest extends TestCase
{
    /**
     * @var ParticipantRepository|\PHPUnit_Framework_MockObject_MockObject
     */
    private $participantRepo;

    /**
     * @var Security|\PHPUnit_Framework_MockObject_MockObject
     */
    private $security;

    /**
     * @var ParticipantsService
     */
    private $participantService;

    public function setUp()
    {
        $this->participantRepo = $this->getMockBuilder(ParticipantRepository::class)->disableOriginalConstructor()->getMock();
        $this->security = $this->getMockBuilder(Security::class)->disableOriginalConstructor()->getMock();

        $this->participantService = new ParticipantsService($this->participantRepo, $this->security);
    }

    public function testShouldReturnUnconfirmedParticipants()
    {
        $user = new User();

        $this->security->expects($this->once())->method('getUser')->willReturn($user);

        $this->participantRepo->expects($this->once())->method('getUnconfirmedParticipants')
            ->with($user)->willReturn([New GymEventParticipant(new GymEvent($user), $user)]);

        $this->assertNotEmpty($this->participantService->getUnconfirmedParticipants());
    }

    public function testShouldReturnEventParticipants()
    {
        $event = new Event(null);
        $event->addParticipant(new User());

        $this->assertNotEmpty($this->participantService->getEventParticipants($event));
    }

    public function testShouldReturnGymEventParticipants()
    {
        $event = new GymEvent(null);
        $this->participantRepo->expects($this->once())->method('getConfirmedEventParticipants')
            ->with($event)->willReturn([New GymEventParticipant($event, new User())]);

        $this->assertNotEmpty($this->participantService->getEventParticipants($event));

    }
}
