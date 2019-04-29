<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploadService
{
    /**
     * @var string
     */
    private $directory;

    /**
     * @param string $directory
     */
    public function __construct(string $directory)
    {
        $this->directory = $directory;
    }

    /**
     * @param UploadedFile $file
     * @return string
     * @throws FileException
     */
    public function uploadFile(UploadedFile $file): string
    {
        $fileName = md5(uniqid()) . '.' . $file->guessExtension();
        $file->move($this->directory, $fileName);

        return $fileName;
    }

    /**
     * @param string $fileName
     * @return string
     */
    public function getFile(string $fileName): string
    {
        return $this->directory . '/' . $fileName;
    }
}
