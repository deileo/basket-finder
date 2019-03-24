<?php

namespace App\Controller;

use App\Entity\CourtInterface;
use App\Service\CourtService;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/courts")
 */
class CourtController extends BaseController
{
    private $courtService;

    /**
     * @param CourtService $courtService
     */
    public function __construct(CourtService $courtService)
    {
        $this->courtService = $courtService;
    }

    /**
     * @Route("/{type}/all", name="api:courts:all")
     * @param string $type
     * @param JsonSerializeService $serializer
     * @return JsonResponse|Response
     */
    public function getCourtsAction(string $type, JsonSerializeService $serializer): Response
    {
        return new Response($serializer->serialize($this->courtService->getCourtsByType($type), ['default']));
    }

    /**
     * @Route("/{type}/{id}", name="api:courts:get")
     * @ParamConverter("CorurtInterface", class="App\Entity\CourtInterface")
     * @param CourtInterface $court
     * @param JsonSerializeService $serializer
     * @return Response
     */
    public function getCourt(CourtInterface $court, JsonSerializeService $serializer): Response
    {
        return new Response($serializer->serialize($court, ['default']));
    }
}
