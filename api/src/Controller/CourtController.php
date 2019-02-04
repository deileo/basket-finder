<?php

namespace App\Controller;

use App\Entity\Court;
use App\Service\JsonSerializeService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/courts")
 */
class CourtController extends Controller
{
    /**
     * @Route("/all", name="api:courts:all")
     * @param JsonSerializeService $serializer
     * @return JsonResponse
     */
    public function getCourtsAction(JsonSerializeService $serializer): Response
    {
        $courts = $this->getDoctrine()->getRepository(Court::class)->findAll();

        return new Response($serializer->serialize($courts));
    }

    /**
     * @Route("/{id}", name="api:courts:get")
     * @param Court $court
     * @param JsonSerializeService $serializer
     * @return Response
     */
    public function getCourt(Court $court, JsonSerializeService $serializer)
    {
        return new Response($serializer->serialize($court));
    }
}