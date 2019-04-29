<?php

namespace App\Service;

use App\Entity\BaseCourt;
use App\Entity\Court;
use App\Entity\Event;
use App\Entity\GymCourt;
use App\Entity\GymEvent;
use App\Entity\GymEventParticipant;
use App\Entity\User;
use App\Repository\EventRepository;
use App\Repository\GymEventRepository;
use App\Repository\ParticipantRepository;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class EventServiceTest extends TestCase
{
    /**
     * @var EventRepository|\PHPUnit_Framework_MockObject_MockObject
     */
    private $eventRepo;

    /**
     * @var GymEventRepository|\PHPUnit_Framework_MockObject_MockObject
     */
    private $gymEventRepo;

    /**
     * @var ParticipantRepository|\PHPUnit_Framework_MockObject_MockObject
     */
    private $participantRepo;

    /**
     * @var Security|\PHPUnit_Framework_MockObject_MockObject
     */
    private $security;

    /**
     * @var EventService
     */
    private $eventService;

    public function setUp()
    {
        $this->eventRepo = $this->getMockBuilder(EventRepository::class)->disableOriginalConstructor()->getMock();
        $this->gymEventRepo = $this->getMockBuilder(GymEventRepository::class)->disableOriginalConstructor()->getMock();
        $this->participantRepo = $this->getMockBuilder(ParticipantRepository::class)->disableOriginalConstructor()->getMock();
        $this->security = $this->getMockBuilder(Security::class)->disableOriginalConstructor()->getMock();

        $this->eventService = new EventService($this->eventRepo, $this->gymEventRepo, $this->participantRepo, $this->security);
    }

    public function testShouldGetAllEvents()
    {
        $event = new Event(null);
        $gymEvent = new GymEvent(null);

        $this->eventRepo->expects($this->once())->method('getAllEvents')->willReturn([$event]);
        $this->gymEventRepo->expects($this->once())->method('getAllEvents')->willReturn([$gymEvent]);

        $this->assertArraySubset(['court' => [$event], 'gymCourt' => [$gymEvent]], $this->eventService->getAllEvents());
    }

    public function testShouldGetTodayEvents()
    {
        $this->eventRepo->expects($this->once())->method('getTodayEvents')->willReturn([new Event(null)]);

        $this->assertNotEmpty($this->eventService->getTodayEvents(BaseCourt::PUBLIC_COURT));
    }

    public function testShouldGetTodayGymEvents()
    {
        $this->gymEventRepo->expects($this->once())->method('getTodayEvents')->willReturn([new GymEvent(null)]);

        $this->assertNotEmpty($this->eventService->getTodayEvents(BaseCourt::GYM_COURT));
    }

    public function testShouldReturnActiveCourtEvents()
    {
        $court = new Court();

        $this->eventRepo->expects($this->once())->method('getActiveCourtEvents')
            ->with($court)->willReturn([new Event(null)]);

        $this->assertNotEmpty($this->eventService->getActiveCourtEvents($court));
    }

    public function testShouldReturnActiveGymCourtEvents()
    {
        $court = new GymCourt();

        $this->gymEventRepo->expects($this->once())->method('getActiveCourtEvents')
            ->with($court)->willReturn([new GymEvent(null)]);

        $this->assertNotEmpty($this->eventService->getActiveCourtEvents($court));
    }

    public function testShouldReturnUserEvents()
    {
        $user = new User();

        $this->security->expects($this->exactly(2))->method('getUser')->willReturn($user);

        $this->eventRepo->expects($this->once())->method('getUserEvents')->with($user)->willReturn([new Event($user)]);
        $this->gymEventRepo->expects($this->once())->method('getUserEvents')->with($user)->willReturn([new GymEvent($user)]);

        $this->assertNotEmpty($this->eventService->getUserEvents());
    }

    public function testShouldReturnUserJoinedEvents()
    {
        $user = new User();

        $this->security->expects($this->exactly(2))->method('getUser')->willReturn($user);

        $this->eventRepo->expects($this->once())->method('getUserJoinedEvents')->with($user)->willReturn([new Event($user)]);
        $this->gymEventRepo->expects($this->once())->method('getUserJoinedEvents')->with($user)->willReturn([new GymEvent($user)]);

        $this->assertNotEmpty($this->eventService->getUserJoinedEvents());
    }

    public function testShouldReturnEventById()
    {
        $this->eventRepo->expects($this->once())->method('find')->with(1)->willReturn(new Event(null));

        $this->assertInstanceOf(Event::class, $this->eventService->getEvent(BaseCourt::PUBLIC_COURT, 1));
    }

    public function testShouldReturnGymEventById()
    {
        $this->gymEventRepo->expects($this->once())->method('find')->with(1)->willReturn(new GymEvent(null));

        $this->assertInstanceOf(GymEvent::class, $this->eventService->getEvent(BaseCourt::GYM_COURT, 1));
    }

    public function testShouldAddParticipantToEventAndReturnIt()
    {
        $event = new GymEvent(null);
        $user = new User();

        $this->security->expects($this->once())->method('getUser')->willReturn($user);

        $participant = $this->eventService->addGymEventParticipant($event);

        $this->assertInstanceOf(GymEventParticipant::class, $participant);
        $this->assertEquals($event, $participant->getEvent());
        $this->assertEquals($user, $participant->getUser());
    }

    public function testShouldRemoveParticipantFromEventAndReturnIt()
    {
        $event = new GymEvent(null);
        $user = new User();
        $participant = new GymEventParticipant($event, $user);

        $this->security->expects($this->once())->method('getUser')->willReturn($user);
        $this->participantRepo->expects($this->once())->method('findOneBy')
            ->with(compact('event', 'user'))->willReturn($participant);

        $participant = $this->eventService->removeGymEventParticipant($event);

        $this->assertInstanceOf(GymEventParticipant::class, $participant);
    }

    public function testShouldReturnNullIfNoParticipantFound()
    {
        $event = new GymEvent(null);
        $user = new User();

        $this->security->expects($this->once())->method('getUser')->willReturn($user);
        $this->participantRepo->expects($this->once())->method('findOneBy')
            ->with(compact('event', 'user'))->willReturn(null);

        $this->assertNull($this->eventService->removeGymEventParticipant($event));
    }

    /**
     * @expectedException \Exception
     */
    public function testShouldThrowExceptionIfBadTypeIsPassed()
    {
        $this->eventService->getEvent('random type', 1);
    }
}
