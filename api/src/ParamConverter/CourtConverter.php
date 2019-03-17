<?php

namespace App\ParamConverter;

use App\Entity\CourtInterface;
use App\Service\CourtService;
use Doctrine\ORM\EntityNotFoundException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;
use Symfony\Component\HttpFoundation\Request;

class CourtConverter implements ParamConverterInterface
{
    /**
     * @var CourtService
     */
    private $courtService;

    /**
     * @param CourtService $courtService
     */
    public function __construct(CourtService $courtService)
    {
        $this->courtService = $courtService;
    }

    /**
     * @param Request $request
     * @param ParamConverter $configuration
     * @return bool
     */
    public function apply(Request $request, ParamConverter $configuration): bool
    {
        $params = $request->get('_route_params');
        $court = $this->courtService->getCourt($params['type'], $params['id']);

        if (!$court) {
            throw new EntityNotFoundException();
        }

        $request->attributes->set($configuration->getName(), $court);

        return true;
    }

    /**
     * @param ParamConverter $configuration
     * @return bool
     */
    public function supports(ParamConverter $configuration): bool
    {
        return $configuration->getClass() === CourtInterface::class;
    }
}