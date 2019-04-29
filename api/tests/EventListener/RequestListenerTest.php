<?php

namespace App\EventListener;

use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class RequestListenerTest extends TestCase
{
    /**
     * @var GetResponseEvent|\PHPUnit_Framework_MockObject_MockObject
     */
    private $event;

    /**
     * @var RequestListener
     */
    private $requestListener;

    public function setUp()
    {
        $this->event = $this->getMockBuilder(GetResponseEvent::class)->disableOriginalConstructor()->getMock();

        $this->requestListener = new RequestListener();
    }

    public function testShouldSetPostDataToRequest()
    {
        $request = new Request([], [], [], [], [], [], '{"json": "data"}');
        $request->setMethod(Request::METHOD_POST);

        $this->event->expects($this->once())->method('isMasterRequest')->willReturn(true);
        $this->event->expects($this->exactly(2))->method('getRequest')->willReturn($request);

        $this->requestListener->onKernelRequest($this->event);
    }

    public function testShouldNotDoAnythingIfEventIsNotMasterRequest()
    {
        $this->event->expects($this->once())->method('isMasterRequest')->willReturn(false);
        $this->event->expects($this->never())->method('getRequest');

        $this->requestListener->onKernelRequest($this->event);
    }

    public function testShouldSetNoDataIfRequestIsOptions()
    {
        $request = new Request();
        $request->setMethod(Request::METHOD_OPTIONS);

        $this->event->expects($this->once())->method('isMasterRequest')->willReturn(true);
        $this->event->expects($this->once())->method('getRequest')->willReturn($request);
        $this->event->expects($this->once())->method('setResponse');

        $this->requestListener->onKernelRequest($this->event);
    }
}
