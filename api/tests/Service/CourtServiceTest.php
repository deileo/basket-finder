<?php

namespace App\Service;

use App\Entity\BaseCourt;
use App\Entity\Court;
use App\Entity\GymCourt;
use App\Repository\CourtRepository;
use App\Repository\GymCourtRepository;
use Doctrine\ORM\ORMInvalidArgumentException;
use PHPUnit\Framework\TestCase;

class CourtServiceTest extends TestCase
{
    /**
     * @var CourtService
     */
    private $courtService;

    /**
     * @var CourtRepository|\PHPUnit_Framework_MockObject_MockObject
     */
    private $courtRepo;

    /**
     * @var GymCourtRepository|\PHPUnit_Framework_MockObject_MockObject
     */
    private $gymCourtRepo;

    public function setUp()
    {
        $this->courtRepo = $this->getMockBuilder(CourtRepository::class)->disableOriginalConstructor()->getMock();
        $this->gymCourtRepo = $this->getMockBuilder(GymCourtRepository::class)->disableOriginalConstructor()->getMock();

        $this->courtService = new CourtService($this->courtRepo, $this->gymCourtRepo);
    }

    public function testShouldGetCourtsPublicCourts()
    {
        $this->courtRepo->expects($this->once())->method('getActiveCourts')
            ->with(true)->willReturn([new Court()]);

        $this->assertNotEmpty($this->courtService->getCourtsByType(BaseCourt::PUBLIC_COURT));
    }

    public function testShouldGetCourtsGymCourts()
    {
        $this->gymCourtRepo->expects($this->once())->method('getActiveCourts')
            ->with(true)->willReturn([new GymCourt()]);

        $this->assertNotEmpty($this->courtService->getCourtsByType(BaseCourt::GYM_COURT));
    }

    public function testShouldReturnAllPublicCourts()
    {
        $activeCourt = new Court();
        $disabledCourt = new Court();

        $this->courtRepo->expects($this->once())->method('getActiveCourts')->willReturn([$activeCourt]);
        $this->courtRepo->expects($this->once())->method('getDisabledCourts')->willReturn([$disabledCourt]);

        $this->assertArraySubset(
            ['active' => [$activeCourt], 'disabled' => [$disabledCourt]],
            $this->courtService->getAllCourts()
        );
    }

    public function testShouldReturnAllGymCourts()
    {
        $activeCourt = new GymCourt();
        $disabledCourt = new GymCourt();

        $this->gymCourtRepo->expects($this->once())->method('getActiveCourts')->willReturn([$activeCourt]);
        $this->gymCourtRepo->expects($this->once())->method('getDisabledCourts')->willReturn([$disabledCourt]);

        $this->assertArraySubset(
            ['active' => [$activeCourt], 'disabled' => [$disabledCourt]],
            $this->courtService->getAllGymCourts()
        );
    }

    public function testShouldReturnCourtById()
    {
        $this->courtRepo->expects($this->once())->method('find')->with(1)->willReturn(new Court());

        $this->assertInstanceOf(Court::class, $this->courtService->getCourt(BaseCourt::PUBLIC_COURT, 1));
    }

    public function testShouldReturnGymCourtById()
    {
        $this->gymCourtRepo->expects($this->once())->method('find')->with(1)->willReturn(new GymCourt());

        $this->assertInstanceOf(GymCourt::class, $this->courtService->getCourt(BaseCourt::GYM_COURT, 1));
    }

    public function testShouldGetNewCourts()
    {
        $this->courtRepo->expects($this->once())->method('getNewCourts')->willReturn([new Court()]);
        $this->gymCourtRepo->expects($this->once())->method('getNewCourts')->willReturn([new GymCourt()]);

        $this->assertNotEmpty($this->courtService->getNewCourts());
    }

    /**
     * @expectedException \Exception
     */
    public function testShouldThrowExceptionIfBadTypeIsPassedOnFind()
    {
        $this->courtService->getCourt('random type', 1);
    }

    /**
     * @expectedException \Exception
     */
    public function testShouldThrowExceptionIfBadTypeIsPassed()
    {
        $this->courtService->getCourtsByType('random type');
    }
}
