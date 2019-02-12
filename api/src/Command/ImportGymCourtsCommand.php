<?php

namespace App\Command;

use App\Entity\Court;
use App\Entity\GymCourt;
use App\Service\GeoCoderService;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class ImportGymCourtsCommand extends ContainerAwareCommand
{
    use ContainerAwareTrait;

    private const KEY_LOCATION = 0;
    private const KEY_TYPE = 1;
    private const KEY_GYM_NAME = 3;
    private const KEY_ADDRESS = 4;
    private const KEY_PURPOSE = 5;
    private const KEY_CONDITION = 7;
    private const KEY_RENOVATION_YEAR = 8;

    /**
     * @inheritdoc
     */
    protected function configure():void
    {
        $this
            ->setName('import:courts:gym')
            ->addArgument('file', InputArgument::REQUIRED, 'CSV file with courts.')
            ->setDescription('Imports courts from an csv file.');
    }

    /**
     * @inheritdoc
     */
    protected function execute(InputInterface $input, OutputInterface $output): void
    {
        $io = new SymfonyStyle($input, $output);
        $io->title('Gym courts import started!');

        $em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $geoCoder = $this->getContainer()->get(GeoCoderService::class);
        $fileName = $input->getArgument('file');
        $file = fopen($fileName, 'r');

        // csv file header
        fgetcsv($file);

        while (($row = fgetcsv($file)) !== false) {
            if (!$this->isRowValid($row)) {
                continue;
            }

            $court = $this->createCourt($row, $geoCoder, $io);
            if ($court) {
                $io->text(sprintf('Gym court with address: %s is importing!', $court->getAddress()));
                $em->persist($court);
            }
        }

        $io->section('Saving to database');

        $em->flush();
    }

    /**
     * @param array $row
     * @param GeoCoderService $geoCoder
     * @param SymfonyStyle $io
     * @return Court|null
     */
    private function createCourt(array $row, GeoCoderService $geoCoder, SymfonyStyle $io): ?Court
    {
        $court = new GymCourt();
        $court->setName($row[self::KEY_GYM_NAME]);
        $court->setLocation($row[self::KEY_LOCATION]);
        $court->setAddress($row[self::KEY_ADDRESS]);
        $court->setCondition($row[self::KEY_CONDITION]);

        $renovationYear = substr($row[self::KEY_RENOVATION_YEAR], 0, 4);
        if (is_numeric($renovationYear)) {
            $court->setRenovationYear((int)$renovationYear);
        }

        try {
            $coordinates = $geoCoder->getLocationCoordinatesByAddress($court->getAddress());
        } catch (\Exception $e) {
            $io->error(sprintf('Failed to import court with address: %s!', $court->getAddress()));

            return null;
        }

        if ($coordinates) {
            $court->setLat($coordinates['lat']);
            $court->setLong($coordinates['long']);
        }

        return $court;
    }

    /**
     * @param array $row
     * @return bool
     */
    private function isRowValid(array $row): bool
    {
        return strtolower($row[self::KEY_TYPE]) === 'vidaus' &&
               strpos(strtolower($row[self::KEY_PURPOSE]), 'krepšinis') !== false;
    }
}
