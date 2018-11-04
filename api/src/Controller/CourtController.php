<?php

namespace App\Controller;

use App\Entity\Court;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("/courts")
 */
class CourtController extends Controller
{
    /**
     * @Route("/all", name="api:courts:all")
     *
     * @param JsonSerializeService $serializer
     * @return JsonResponse
     */
    public function getCourtsAction(JsonSerializeService $serializer): Response
    {
        $courts = $this->getDoctrine()->getRepository(Court::class)->findAll();

        return new Response($serializer->serialize($courts));
    }
}