<?php

namespace App\ParamConverter;

use App\Entity\BaseCourt;
use App\Entity\Event;
use App\Entity\EventInterface;
use App\Entity\User;
use App\Service\EventService;
use PHPUnit\Framework\TestCase;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;

class EventConverterTest extends TestCase
{
    /**
     * @var EventService|\PHPUnit_Framework_MockObject_MockObject
     */
    private $eventService;

    /**
     * @var ParamConverter|\PHPUnit_Framework_MockObject_MockObject
     */
    private $paramConverter;

    /**
     * @var EventConverter
     */
    private $eventConverter;

    public function setUp()
    {
        $this->eventService = $this->getMockBuilder(EventService::class)->disableOriginalConstructor()->getMock();
        $this->paramConverter = $this->getMockBuilder(ParamConverter::class)->disableOriginalConstructor()->getMock();

        $this->eventConverter = new EventConverter($this->eventService);
    }

    public function testShouldConvertParamsToObject()
    {
        $event = new Event(null);
        $request = new Request();
        $request->attributes->set('_route_params', ['type' => BaseCourt::PUBLIC_COURT, 'id' => 1]);

        $this->eventService->expects($this->once())->method('getEvent')
            ->with(BaseCourt::PUBLIC_COURT, 1)->willReturn($event);

        $this->assertTrue($this->eventConverter->apply($request, $this->paramConverter));
    }

    /**
     * @expectedException \Exception
     */
    public function testShouldThrowExceptionIfNoObjectIsFound()
    {
        $request = new Request();
        $request->attributes->set('_route_params', ['type' => BaseCourt::PUBLIC_COURT, 'id' => 1]);

        $this->eventService->expects($this->once())->method('getEvent')
            ->with(BaseCourt::PUBLIC_COURT, 1)->willReturn(null);

        $this->eventConverter->apply($request, $this->paramConverter);
    }

    public function testShouldReturnTrueIfObjectIsCourtInterface()
    {
        $this->paramConverter->expects($this->once())->method('getClass')->willReturn(EventInterface::class);

        $this->assertTrue($this->eventConverter->supports($this->paramConverter));
    }

    public function testShouldReturnFalseIfObjectIsNotCourtInterface()
    {
        $this->paramConverter->expects($this->once())->method('getClass')->willReturn(User::class);

        $this->assertFalse($this->eventConverter->supports($this->paramConverter));
    }
}
