<?php

namespace App\Controller;

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
     * @var EventService
     */
    private $eventService;

    /**
     * @param EventService $eventService
     */
    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
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
     * @param JsonSerializeService $serializer
     * @return Response
     */
    public function getEvents(JsonSerializeService $serializer): Response
    {
        return new Response($serializer->serialize($this->eventService->getTodayEvents()));
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
