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
     * @Route("/all", name="php:courts:all")
     *
     * @param JsonSerializeService $serializer
     * @return JsonResponse
     */
    public function getCourtsAction(JsonSerializeService $serializer): Response
    {
        sleep(1);
        $courts = $this->getDoctrine()->getRepository(Court::class)->findAll();

        return new Response($serializer->serialize($courts));
    }
}