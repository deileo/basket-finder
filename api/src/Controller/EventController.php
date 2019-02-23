<?php

namespace App\Controller;

use App\Entity\Court;
use App\Entity\Event;
use App\Form\Event\EventType;
use App\Service\EventService;
use App\Service\JsonSerializeService;
use Symfony\Component\Form\FormInterface;
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
     * @param Request $request
     * @return Response
     */
    public function newEvent(Request $request): Response
    {
        $event = new Event();
        $form = $this->createForm(EventType::class, $event);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $this->persist($event);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getErrorsArray($form), Response::HTTP_OK);
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
     * @param FormInterface $form
     * @return array
     */
    private function getErrorsArray(FormInterface $form): array
    {
        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[$error->getOrigin()->getName()][] = $error->getMessage();
        }

        return $errors;
    }
}
