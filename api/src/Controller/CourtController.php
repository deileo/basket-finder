<?php

namespace App\Controller;

use App\Entity\Court;
use App\Service\CourtService;
use App\Service\JsonSerializeService;
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
     * @Route("/all", name="api:courts:all")
     * @param JsonSerializeService $serializer
     * @return JsonResponse
     */
    public function getCourtsAction(JsonSerializeService $serializer): Response
    {
        return new Response($serializer->serialize($this->courtService->getAllCourts()));
    }

    /**
     * @Route("/{id}", name="api:courts:get")
     * @param Court $court
     * @param JsonSerializeService $serializer
     * @return Response
     */
    public function getCourt(Court $court, JsonSerializeService $serializer): Response
    {
        return new Response($serializer->serialize($court));
    }
}
