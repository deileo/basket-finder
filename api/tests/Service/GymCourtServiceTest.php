<?php

namespace App\Service;

use App\Entity\GymCourt;
use App\Repository\GymCourtRepository;
use PHPUnit\Framework\TestCase;

class GymCourtServiceTest extends TestCase
{
    /**
     * @var GymCourtRepository|\PHPUnit_Framework_MockObject_MockObject
     */
    private $gymCourtRepo;

    /**
     * @var GymCourtService
     */
    private $gymCourtService;

    public function setUp()
    {
        $this->gymCourtRepo = $this->getMockBuilder(GymCourtRepository::class)->disableOriginalConstructor()->getMock();

        $this->gymCourtService = new GymCourtService($this->gymCourtRepo);
    }

    public function testShouldReturnAllGymCourts()
    {
        $this->gymCourtRepo->expects($this->once())->method('findAll')->willReturn([new GymCourt()]);

        $this->assertNotEmpty($this->gymCourtService->getAllGymCourts());
    }
}
