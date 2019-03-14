<?php

namespace App\Controller;

use App\Entity\Court;
use App\Entity\Event;
use App\Form\Event\EventType;
use App\Service\EventService;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/events")
 */
class EventController extends BaseController
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
     * @param EventService $eventService
     * @param JsonSerializeService $serializer
     */
    public function __construct(EventService $eventService, JsonSerializeService $serializer)
    {
        $this->eventService = $eventService;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/new", name="api:event:new")
     * @Security("is_granted('API_ACCESS')")
     * @param Request $request
     * @return Response
     */
    public function newEvent(Request $request): Response
    {
        $event = new Event($this->getUser());
        $form = $this->createForm(EventType::class, $event);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $this->persist($event);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form), Response::HTTP_OK);
    }

    /**
     * @Route("/all", name="api:event:all")
     * @return Response
     */
    public function getEvents(): Response
    {
        return new Response($this->serializer->serialize($this->eventService->getTodayEvents()));
    }

    /**
     * @Route("/court/{id}", name="api:event:court")
     * @param Court $court
     * @return Response
     */
    public function getCourtEvents(Court $court): Response
    {
        return new Response($this->serializer->serialize($this->eventService->getActiveCourtEvents($court)));
    }

    /**
     * @Route("/{id}/join", name="api:event:join")
     * @Security("is_granted('API_ACCESS')")
     * @param Event $event
     * @return Response
     */
    public function joinEvent(Event $event): Response
    {
        if (!$this->getUser()) {
            return new JsonResponse();
        }

        $event->addParticipant($this->getUser());
        $this->flush();

        return new JsonResponse('success', Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}/leave", name="api:event:leave")
     * @Security("is_granted('API_ACCESS')")
     * @param Event $event
     * @return Response
     */
    public function leaveEvent(Event $event): Response
    {
        if (!$this->getUser()) {
            return new JsonResponse();
        }

        $event->removeParticipant($this->getUser());
        $this->flush();

        return new JsonResponse('success');
    }

    /**
     * @Route("/user", name="api:event:user")
     * @Security("is_granted('API_ACCESS')")
     */
    public function getUserEvents(): Response
    {
        if (!$this->getUser()) {
            return new JsonResponse();
        }

        return new Response($this->serializer->serialize($this->eventService->getUserEvents()));
    }
}
