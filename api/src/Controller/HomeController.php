<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends Controller
{
    /**
     * @Route(name="api:home")
     *
     * @return JsonResponse
     */
    public function indexAction(): JsonResponse
    {
        return new JsonResponse('Hello world');
    }
}