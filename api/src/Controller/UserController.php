<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\JsonSerializeService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user", name="connect:google:check")
 */
class UserController extends BaseController
{
    /**
     * @Route(name="api:user:get")
     * @param JsonSerializeService $serializer
     * @return Response
     */
    public function user(JsonSerializeService $serializer): Response
    {
        if (!$this->getUser()) {
            return new JsonResponse([
                'status' => false,
                'message' => "User not found!"
            ]);
        }

        return new Response($serializer->serialize($this->getUser(), ['user']));
    }

    /**
     * @Route("/all", name="api:user:all")
     * @param JsonSerializeService $serializer
     * @param UserRepository $repository
     * @return Response
     */
    public function getUsers(JsonSerializeService $serializer, UserRepository $repository): Response
    {
        return new Response($serializer->serialize($repository->findBy(['roles' => 0]), ['user']));
    }

    /**
     * @Route("/{id}/disable", name="api:user:disable")
     * @param User $user
     * @return Response
     */
    public function disableUser(User $user): Response
    {
        $user->setDisabled(true);
        $this->flush();

        return new Response();
    }

    /**
     * @Route("/{id}/enable", name="api:user:enable")
     * @param User $user
     * @return Response
     */
    public function enableUser(User $user): Response
    {
        $user->setDisabled(false);
        $this->flush();

        return new Response();
    }
}
