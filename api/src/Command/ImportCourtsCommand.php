<?php

namespace App\Command;

use App\Entity\Court;
use App\Service\GeoCoderService;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class ImportCourtsCommand extends ContainerAwareCommand
{
    use ContainerAwareTrait;

    private const KEY_LOCATION = 1;
    private const KEY_ADDRESS = 2;
    private const KEY_DESCRIPTION = 3;

    /**
     * {@inheritdoc}
     */
    protected function configure():void
    {
        $this
            ->setName('import:courts')
            ->addArgument('file', InputArgument::REQUIRED, 'CSV file with courts.')
            ->setDescription('Imports courts from an csv file.');
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output): void
    {
        $io = new SymfonyStyle($input, $output);
        $io->title('Court import started!');

        $em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $geoCoder = $this->getContainer()->get(GeoCoderService::class);
        $fileName = $input->getArgument('file');
        $file = fopen($fileName, 'r');

        // csv file header
        fgetcsv($file);

        while (($row = fgetcsv($file)) !== false) {
            $court = $this->createCourt($row, $geoCoder, $io);
            if ($court) {
                $io->text(sprintf('Court with address: %s is importing!', $court->getAddress()));
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
        $court = new Court();
        $court->setLocation($row[self::KEY_LOCATION]);
        $court->setAddress($row[self::KEY_ADDRESS]);
        $court->setDescription($row[self::KEY_DESCRIPTION]);

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
}