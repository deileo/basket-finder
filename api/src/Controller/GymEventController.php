<?php

namespace App\Controller;

use App\Entity\GymCourt;
use App\Entity\GymEvent;
use App\Form\Event\GymEventType;
use App\Service\EventService;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/events/gym")
 */
class GymEventController extends BaseController
{
    /**
     * @var JsonSerializeService
     */
    private $serializer;

    /**
     * @var EventService
     */
    private $eventService;

    /**
     * @param JsonSerializeService $serializer
     * @param EventService $eventService
     */
    public function __construct(JsonSerializeService $serializer, EventService $eventService)
    {
        $this->serializer = $serializer;
        $this->eventService = $eventService;
    }

    /**
     * @Route("/new", name="api:gym-event:new")
     * @Security("is_granted('API_ACCESS')")
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

    /**
     * @Route("/all", name="api:gym-event:all")
     * @return Response
     */
    public function getEvents(): Response
    {
        return new Response($this->serializer->serialize($this->eventService->getTodayEvents(true)));
    }

    /**
     * @Route("/court/{id}", name="api:gym-event:court")
     * @param GymCourt $court
     * @return Response
     */
    public function getCourtEvents(GymCourt $court): Response
    {
        return new Response($this->serializer->serialize($this->eventService->getActiveCourtEvents($court)));
    }
}
