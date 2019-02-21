<?php

namespace App\Controller;

use App\Service\JsonSerializeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user", name="connect:google:check")
 */
class UserController extends AbstractController
{
    /**
     * @Route(name="api:user:get")
     * @param JsonSerializeService $serializer
     * @return JsonResponse
     */
    public function user(JsonSerializeService $serializer): Response
    {
        if (!$this->getUser()) {
            return new JsonResponse([
                'status' => false,
                'message' => "User not found!"
            ]);
        }

        return new Response($serializer->serialize($this->getUser()));
    }
}