<?php

namespace App\Service;

use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploadServiceTest extends TestCase
{
    private $directory = 'directory';

    /**
     * @var UploadedFile|\PHPUnit_Framework_MockObject_MockObject
     */
    private $uploadedFile;

    /**
     * @var FileUploadService
     */
    private $fileUploadService;

    public function setUp()
    {
        $this->uploadedFile = $this->getMockBuilder(UploadedFile::class)->disableOriginalConstructor()->getMock();

        $this->fileUploadService = new FileUploadService($this->directory);
    }

    public function testShouldUploadFile()
    {
        $this->uploadedFile->expects($this->once())->method('guessExtension')->willReturn('pdf');
        $this->uploadedFile->expects($this->once())->method('move');

        $this->fileUploadService->uploadFile($this->uploadedFile);
    }

    public function testShouldGetFile()
    {
        $this->assertEquals(
            $this->directory . '/' . 'fileName.pdf',
            $this->fileUploadService->getFile('fileName.pdf')
        );
    }
}
