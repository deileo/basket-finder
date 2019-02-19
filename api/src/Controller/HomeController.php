<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends Controller
{
    /**
     * @Route(name="php:home")
     *
     * @return JsonResponse
     */
    public function indexAction(Request $request): JsonResponse
    {
        dump($this->getUser());die();
        return new JsonResponse('Hello world');
    }
}