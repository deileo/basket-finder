<?php

namespace App\Controller;

use App\Entity\GymEventParticipant;
use App\Service\JsonSerializeService;
use App\Service\ParticipantsService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/participants")
 */
class ParticipantController extends BaseController
{
    /**
     * @var ParticipantsService
     */
    private $participantService;

    /**
     * @var JsonSerializeService
     */
    private $serializer;

    /**
     * @param ParticipantsService $participantsService
     * @param JsonSerializeService $serializer
     */
    public function __construct(ParticipantsService $participantsService, JsonSerializeService $serializer)
    {
        $this->participantService = $participantsService;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/unconfirmed", name="api:participant:unconfirmed")
     * @Security("is_granted('API_ACCESS')")
     * @return Response
     */
    public function getUnconfirmedParticipants(): Response
    {
        return new Response($this->serializer->serialize($this->participantService->getUnconfirmedParticipants()));
    }

    /**
     * @Route("/{id}/accept", name="api:participant:accept")
     * @Security("is_granted('API_ACCESS')")
     * @param GymEventParticipant $participant
     * @return JsonResponse
     */
    public function acceptParticipant(GymEventParticipant $participant): JsonResponse
    {
        if ($this->getUser() !== $participant->getEvent()->getCreatedBy()) {
            return new JsonResponse();
        }

        $participant->setIsConfirmed(true);
        $this->flush();

        return new JsonResponse();
    }

    /**
     * @Route("/{id}/cancel", name="api:participant:cancel")
     * @Security("is_granted('API_ACCESS')")
     * @param GymEventParticipant $participant
     * @return JsonResponse
     */
    public function cancelParticipant(GymEventParticipant $participant): JsonResponse
    {
        if ($this->getUser() !== $participant->getEvent()->getCreatedBy()) {
            return new JsonResponse();
        }

        $this->remove($participant);
        $this->flush();

        return new JsonResponse();
    }
}