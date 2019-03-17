<?php

namespace App\Controller;

use App\Entity\CourtInterface;
use App\Entity\Event;
use App\Entity\EventInterface;
use App\Entity\GymEvent;
use App\Form\Event\EventType;
use App\Form\Event\GymEventType;
use App\Service\EventService;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
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
     * @Route("/court/new", name="api:event:new")
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
     * @Route("/gym-court/new", name="api:gym-event:new")
     * @Security("is_granted('API_ACCESS')")
     * @param Request $request
     * @return Response
     */
    public function newGymEvent(Request $request): Response
    {
        $gymEvent = new GymEvent($this->getUser());
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
     * @Route("/{type}/all", name="api:event:all")
     * @param string $type
     * @return Response
     */
    public function getEvents(string $type): Response
    {
        return new Response($this->serializer->serialize($this->eventService->getTodayEvents($type)));
    }

    /**
     * @Route("/{type}/{id}", name="api:event:court")
     * @ParamConverter("CourtInterface", class="App\Entity\CourtInterface")
     * @param CourtInterface $court
     * @return Response
     */
    public function getCourtEvents(CourtInterface $court): Response
    {
        return new Response($this->serializer->serialize($this->eventService->getActiveCourtEvents($court)));
    }

    /**
     * @Route("/{type}/{id}/join", name="api:event:join")
     * @ParamConverter("EventInterface", class="App\Entity\EventInterface")
     * @Security("is_granted('API_ACCESS')")
     * @param EventInterface $event
     * @return Response
     */
    public function joinEvent(EventInterface $event): Response
    {
        if (!$this->getUser()) {
            return new JsonResponse();
        }

        $event->addParticipant($this->getUser());
        $this->flush();

        return new JsonResponse('success', Response::HTTP_CREATED);
    }

    /**
     * @Route("/{type}/{id}/leave", name="api:event:leave")
     * @ParamConverter("EventInterface", class="App\Entity\EventInterface")
     * @Security("is_granted('API_ACCESS')")
     * @param EventInterface $event
     * @return Response
     */
    public function leaveEvent(EventInterface $event): Response
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

    /**
     * @Route("/user/joined/events", name="api:event:user-joined")
     * @Security("is_granted('API_ACCESS')")
     */
    public function getUserJoinedEvents(): Response
    {
        if (!$this->getUser()) {
            return new JsonResponse();
        }

        return new Response($this->serializer->serialize($this->eventService->getUserJoinedEvents()));
    }
}
