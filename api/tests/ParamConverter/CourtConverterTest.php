<?php

namespace App\ParamConverter;

use App\Entity\BaseCourt;
use App\Entity\Court;
use App\Entity\CourtInterface;
use App\Entity\User;
use App\Service\CourtService;
use PHPUnit\Framework\TestCase;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;

class CourtConverterTest extends TestCase
{
    /**
     * @var CourtService|\PHPUnit_Framework_MockObject_MockObject
     */
    private $courtService;

    /**
     * @var ParamConverter|\PHPUnit_Framework_MockObject_MockObject
     */
    private $paramConverter;

    /**
     * @var CourtConverter
     */
    private $courtConverter;

    public function setUp()
    {
        $this->courtService = $this->getMockBuilder(CourtService::class)->disableOriginalConstructor()->getMock();
        $this->paramConverter = $this->getMockBuilder(ParamConverter::class)->disableOriginalConstructor()->getMock();

        $this->courtConverter = new CourtConverter($this->courtService);
    }

    public function testShouldConvertParamsToObject()
    {
        $court = new Court();
        $request = new Request();
        $request->attributes->set('_route_params', ['type' => BaseCourt::PUBLIC_COURT, 'id' => 1]);

        $this->courtService->expects($this->once())->method('getCourt')
            ->with(BaseCourt::PUBLIC_COURT, 1)->willReturn($court);

        $this->assertTrue($this->courtConverter->apply($request, $this->paramConverter));
    }

    /**
     * @expectedException \Exception
     */
    public function testShouldThrowExceptionIfNoObjectIsFound()
    {
        $request = new Request();
        $request->attributes->set('_route_params', ['type' => BaseCourt::PUBLIC_COURT, 'id' => 1]);

        $this->courtService->expects($this->once())->method('getCourt')
            ->with(BaseCourt::PUBLIC_COURT, 1)->willReturn(null);

        $this->courtConverter->apply($request, $this->paramConverter);
    }

    public function testShouldReturnTrueIfObjectIsCourtInterface()
    {
        $this->paramConverter->expects($this->once())->method('getClass')->willReturn(CourtInterface::class);

        $this->assertTrue($this->courtConverter->supports($this->paramConverter));
    }

    public function testShouldReturnFalseIfObjectIsNotCourtInterface()
    {
        $this->paramConverter->expects($this->once())->method('getClass')->willReturn(User::class);

        $this->assertFalse($this->courtConverter->supports($this->paramConverter));
    }
}
