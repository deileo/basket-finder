<?php

namespace App\Controller;

use App\Entity\GymEvent;
use App\Form\Event\GymEventType;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/events/gym")
 * @Security("is_granted('API_ACCESS')")
 */
class GymEventController extends BaseController
{
    /**
     * @var JsonSerializeService
     */
    private $serializer;

    /**
     * @param JsonSerializeService $serializer
     */
    public function __construct(JsonSerializeService $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @Route("/new", name="api:gym-event:new")
     * @param Request $request
     * @return Response
     */
    public function newEvent(Request $request): Response
    {
        $gymEvent = new GymEvent();
        $form = $this->createForm(GymEventType::class, $gymEvent);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $this->persist($gymEvent);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form), Response::HTTP_OK);
    }
}
