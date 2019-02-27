<?php

namespace App\Controller;

use App\Entity\GymCourt;
use App\Service\GymCourtService;
use App\Service\JsonSerializeService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/gym-courts")
 */
class GymCourtController extends BaseController
{
    /**
     * @var GymCourtService
     */
    private $gymCourtService;

    /**
     * @param GymCourtService $gymCourtService
     */
    public function __construct(GymCourtService $gymCourtService)
    {
        $this->gymCourtService = $gymCourtService;
    }

    /**
     * @Route("/all", name="api:gym-courts:all")
     * @param JsonSerializeService $serializer
     * @return Response
     */
    public function getAllGymCourts(JsonSerializeService $serializer): Response
    {
        return new Response($serializer->serialize($this->gymCourtService->getAllGymCourts(), ['default']));
    }

    /**
     * @Route("/{id}", name="api:gym-courts:get")
     * @param GymCourt $gymCourt
     * @param JsonSerializeService $serializer
     * @return Response
     */
    public function getGymCourt(GymCourt $gymCourt, JsonSerializeService $serializer): Response
    {
        return new Response($serializer->serialize($gymCourt, ['default']));
    }
}
