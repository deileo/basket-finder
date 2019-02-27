<?php

namespace App\Controller;

use App\Service\JsonSerializeService;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/connect/google")
 */
class GoogleController extends AbstractController
{
    /**
     * @Route(name="connect:google")
     * @param ClientRegistry $clientRegistry
     * @return RedirectResponse
     */
    public function connectAction(ClientRegistry $clientRegistry): RedirectResponse
    {
        return $clientRegistry->getClient('google')->redirect();
    }

    /**
     * @Route("/check", name="connect:google:check")
     * @param JsonSerializeService $serializer
     * @return JsonResponse
     */
    public function connectCheckAction(JsonSerializeService $serializer): Response
    {
        if (!$this->getUser()) {
            return new JsonResponse([
                'status' => false,
                'message' => "User not found!"
            ]);
        }

        return new Response($serializer->serialize($this->getUser(), ['default']));
    }
}
