<?php

namespace App\Controller;

use App\Entity\Event;
use App\Form\Event\EventType;
use App\Service\JsonSerializeService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/events")
 */
class EventController extends Controller
{
    /**
     * @Route("/new", name="api:event:new", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function newEvent(Request $request): Response
    {
        $event = new Event();
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        if (!$form->isValid()) {

            return new JsonResponse($this->getErrorsArray($form), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();

        return new JsonResponse('success', Response::HTTP_CREATED);
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