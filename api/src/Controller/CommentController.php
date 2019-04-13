<?php

namespace App\Controller;

use App\Entity\Court;
use App\Entity\CourtComment;
use App\Entity\CourtInterface;
use App\Entity\Event;
use App\Entity\EventComment;
use App\Entity\EventInterface;
use App\Entity\GymCourtComment;
use App\Entity\GymEventComment;
use App\Form\CommentType;
use App\Service\CommentService;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/comment")
 */
class CommentController extends BaseController
{
    /**
     * @var JsonSerializeService
     */
    private $serializer;

    /**
     * @var CommentService
     */
    private $commentService;

    /**
     * @param CommentService $commentService
     * @param JsonSerializeService $serializer
     */
    public function __construct(CommentService $commentService, JsonSerializeService $serializer)
    {
        $this->commentService = $commentService;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/court/{type}/{id}/new", name="api:comment:court:new")
     * @ParamConverter("CourtInterface", class="App\Entity\CourtInterface")
     * @Security("is_granted('API_ACCESS')")
     *
     * @param Request $request
     * @param CourtInterface $court
     * @return JsonResponse
     */
    public function newCourtComment(Request $request, CourtInterface $court): Response
    {
        $comment = $court instanceof Court ? new CourtComment() : new GymCourtComment();

        $form = $this->createForm(CommentType::class, $comment);
        $form->submit($request->request->all());

        if ($form->isSubmitted() && $form->isValid()) {
            $court->addComment($comment);

            $this->persist($comment);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form));
    }

    /**
     * @Route("/event/{type}/{id}/new", name="api:comment:event:new")
     * @ParamConverter("EventInterface", class="App\Entity\EventInterface")
     * @Security("is_granted('API_ACCESS')")
     *
     * @param Request $request
     * @param EventInterface $event
     * @return JsonResponse
     */
    public function newEventComment(Request $request, EventInterface $event): Response
    {
        $comment = $event instanceof Event ? new EventComment() : new GymEventComment();

        $form = $this->createForm(CommentType::class, $comment);
        $form->submit($request->request->all());

        if ($form->isSubmitted() && $form->isValid()) {
            $event->addComment($comment);

            $this->persist($comment);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form));
    }

    /**
     * @Route("/court/{type}/{id}/get", name="api:comment:court:get")
     * @ParamConverter("CorurtInterface", class="App\Entity\CourtInterface")
     *
     * @param CourtInterface $court
     * @return JsonResponse
     */
    public function getCourtComments(CourtInterface $court): Response
    {
        return new Response($this->serializer->serialize($court->getComments()->toArray(), ['comment']));
    }

    /**
     * @Route("/event/{type}/{id}/get", name="api:comment:event:get")
     * @ParamConverter("EventInterface", class="App\Entity\EventInterface")
     *
     * @param EventInterface $event
     * @return JsonResponse
     */
    public function getEventComments(EventInterface $event): Response
    {
        return new Response($this->serializer->serialize($event->getComments()->toArray(), ['comment']));
    }
}
